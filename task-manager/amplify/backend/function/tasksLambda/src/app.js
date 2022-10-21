const AWS = require("aws-sdk");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
// eslint-disable-next-line prettier/prettier

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();
let tableName = "taskBoard";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const getUserId = (request) => {
  try {
    const reqContext = request.apiGateway.event.requestContext;
    const authProvider = reqContext.identity.cognitoAuthenticationProvider;
    return authProvider ? authProvider.split(":CognitoSignIn:").pop() : "UNAUTH";
  } catch (error) {
    return "UNAUTH";
  }
};

app.get("/tasks", function (request, response) {
  let params = {
    TableName: tableName,
    Key: {
      id: getUserId(request),
    },
    limit: 100,
  };
  dynamodb.scan(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, message: getUserId(request) });
      response.json({ statusCode: 500, error: error.message });
    } else {
      console.log();
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Items) });
    }
  });
});

app.get("/tasks/:id", function (request, response) {
  let params = {
    TableName: tableName,
    Key: {
      id: getUserId(request),
    },
  };
  dynamodb.get(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, message: getUserId(request) });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Item) });
    }
  });
});

app.put("/tasks", function (request, response) {
  const timestamp = new Date().toISOString();
  const params = {
    TableName: tableName,
    Key: {
      id: getUserId(request),
    },
    ExpressionAttributeNames: { "#boards": "boards" },
    ExpressionAttributeValues: {},
    ReturnValues: "UPDATED_NEW",
  };
  params.UpdateExpression = "SET ";
  if (request.body.boards) {
    params.ExpressionAttributeValues[":boards"] = request.body.boards;
    params.UpdateExpression += "#boards = :boards, ";
  }
  if (request.body.tasks) {
    params.ExpressionAttributeValues[":tasks"] = request.body.tasks;
    params.UpdateExpression += "tasks = :tasks, ";
  }
  if (request.body.boards || request.body.tasks) {
    params.ExpressionAttributeValues[":updatedAt"] = timestamp;
    params.UpdateExpression += "updatedAt = :updatedAt";
  }
  dynamodb.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) });
    }
  });
});

app.post("/tasks", function (request, response) {
  const timestamp = new Date().toISOString();
  let params = {
    TableName: tableName,
    Item: {
      ...request.body,
      id: getUserId(request), // auto-generate id
      complete: false, // default for new tasks
      createdAt: timestamp,
      updatedAt: timestamp,
      userId: getUserId(request), // userId from request identity context
    },
  };

  dynamodb.put(params, (error) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(params.Item) });
    }
  });
});

app.delete("/tasks/:id", function (request, response) {
  let params = {
    TableName: tableName,
    Key: {
      id: request.params.id,
    },
  };
  dynamodb.delete(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result) });
    }
  });
});

app.listen(3000, function () {
  console.log("App started");
});
module.exports = app;

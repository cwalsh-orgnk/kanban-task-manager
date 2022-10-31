import { Amplify } from "aws-amplify";
import awsconfig from "./../aws-exports";
import { API } from "aws-amplify";
Amplify.configure(awsconfig);
var uuid = require("uuid");

const defaultTasks = {
  complete: false,
  boards: [
    {
      name: "Board with columns",
      columns: [
        { name: "Todo", tasks: [] },
        { name: "Doing", tasks: [] },
      ],
      id: uuid.v4(),
    },
  ],
  id: uuid.v4(),
};

class TaskDataService {
  getAll() {
    const tasks = API.get("tasksApi", `/tasks`, {})
      .then((result) => {
        return JSON.parse(result.body);
      })
      .catch((err) => {
        console.log(err);
        return defaultTasks;
      });
    return tasks;
  }

  create(data) {
    API.put("tasksApi", `/tasks`, {
      body: {
        boards: data,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update(data) {
    API.put("tasksApi", `/tasks`, {
      body: {
        boards: data,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  delete(id) {
    if (!id) return;
    console.log(`deleteTodo-${id}`);
    API.del("tasksApi", `/tasks/${id}`, {})
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new TaskDataService();

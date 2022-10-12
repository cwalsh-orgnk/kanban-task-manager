import { Amplify } from "aws-amplify";
import awsconfig from "./../aws-exports";
import { API } from "aws-amplify";

Amplify.configure(awsconfig);
class TaskDataService {
  getAll() {
    let tasks = null;
    API.get("tasksApi", `/tasks`, {})
      .then((result) => {
        console.log(result);
        tasks = JSON.parse(result.body);
      })
      .catch((err) => {
        console.log(err);
      });
    return tasks;
  }
  get(id) {
    API.get("tasksApi", `/tasks/${id}`, {})
      .then((result) => {
        console.log(JSON.parse(result.body));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  create(data) {
    console.log(`addTodo`);
    API.post("tasksApi", `/tasks`, {
      data,
    })
      .then((result) => {
        console.log(result);
        this.lastTodoId = JSON.parse(result.body).id;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update(id, data) {
    if (!id) return;
    console.log(`updateTodo-${id}`);
    API.put("tasksApi", `/tasks`, {
      body: {
        id: id,
        data,
        complete: true,
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
        this.lastTodoId = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new TaskDataService();

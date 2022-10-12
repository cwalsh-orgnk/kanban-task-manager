import http from "../http-common";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { API } from "aws-amplify";

Amplify.configure(awsconfig);
class BoardDataService {
  getAll() {
    API.get("todosApi", `/todos`, {})
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  get(id) {
    API.get("todosApi", `/todos/${id}`, {})
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  create(data) {
    console.log(`addTodo`);
    API.post("todosApi", `/todos`, {
        data
    })
      .then((result) => {
        console.log(result);
        this.lastTodoId = JSON.parse(result.body).id;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update(id, data, example) {
    if (!id) return;
    console.log(`updateTodo-${id}`);
    API.put('todosApi', `/todos`, {
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
    API.del("todosApi", `/todos/${id}`, {})
      .then((result) => {
        console.log(result);
        this.lastTodoId = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteAll() {
    return http.delete(`/boards`);
  }

  findByTitle(title) {
    return http.get(`/boards?title=${title}`);
  }
}

export default new BoardDataService();

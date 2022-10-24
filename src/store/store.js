import { reactive, toRefs } from "@vue/reactivity";
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { API } from "aws-amplify";
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
Amplify.configure(awsconfig);
const loadTasks = async () => {
  API.get("tasksApi", `/tasks`, {})
    .then((result) => {
      console.log(result);
      state.allTasks = JSON.parse(result.body);
      return state.allTasks;
    })
    .catch((err) => {
      console.log(err);
      state.allTasks = defaultTasks;
      return state.allTasks;
    });
};

/**
 * Define our state
 *
 * This state is mutable in the function below,
 * but if we pass it to the component without `toRefs`
 * it will not mutate.
 */
const state = reactive({
  sidebarOpen: false,
  activeBoard: {},
  lightMode: true,
  currentColumns: [],
  currentBoard: [],
  allTasks: loadTasks(),
  currentTasks: [],
});

export default () => {
  const sidebarInView = () => {
    return !state.sidebarOpen;
  };

  const getActiveBoard = () => {
    console.log("response");
    return state.activeBoard;
  };

  const getColumns = () => {
    return state.columns;
  };

  const getBoards = () => {
    console.log("response");
    return state.boards;
  };

  const currentTasks = () => {
    if (state.allTasks != null && Object.keys(state.allTasks).length) {
      state.currentTasks = state.allTasks.boards.filter((board) =>
        board.name.includes(state.activeBoard)
      );
    }
    return state.currentTasks;
  };

  const setThemeMode = () => {
    console.log("response");
    return !state.lightMode;
  };

  /**
   * Return the state as a `reference` to make it mutable.
   */
  return {
    state: toRefs(state),
    sidebarInView,
    getActiveBoard,
    setThemeMode,
    getColumns,
    getBoards,
    currentTasks,
  };
};
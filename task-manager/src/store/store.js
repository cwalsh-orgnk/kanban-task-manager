import { reactive, toRefs } from "@vue/reactivity";
import tasks from "../data/data.json";
/**
 * Define our state
 *
 * This state is mutable in the function below,
 * but if we pass it to the component without `toRefs`
 * it will not mutate.
 */
const state = reactive({
  tasks: tasks,
  sidebarOpen: false,
  activeBoard: tasks.boards[0].name,
  boards: [],
});

export default () => {
  const tasksList = () => {
    return state.tasks;
  };

  const sidebarInView = () => {
    return !state.sidebarOpen;
  };

  const getActiveBoard = () => {
    console.log("response");
    return !state.activeBoard;
  };

  const allBoards = () => {
    console.log("response");
  };

  /**
   * Return the state as a `reference` to make it mutable.
   */
  return {
    state: toRefs(state),
    tasksList,
    sidebarInView,
    getActiveBoard,
    allBoards,
  };
};

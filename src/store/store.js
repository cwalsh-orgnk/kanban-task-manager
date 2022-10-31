import { reactive, toRefs } from "@vue/reactivity";
import "@aws-amplify/ui-vue/styles.css";
import TaskDataService from "../service/api.js";

async function loadTasks() {
  TaskDataService.getAll().then((res) => {
    state.allTasks = res;
  });
}

/**
 * Define our state
 *
 * This state is mutable in the function below,
 * but if we pass it to the component without `toRefs`
 * it will not mutate.
 */
const state = reactive({
  activeBoard: {},
  allTasks: loadTasks(),
  currentBoard: [],
  currentColumns: [],
  lightMode: true,
  sidebarOpen: false,
});

export default () => {
  const sidebarInView = () => {
    return !state.sidebarOpen;
  };

  const getActiveBoard = () => {
    return state.activeBoard;
  };

  const setThemeMode = () => {
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
  };
};

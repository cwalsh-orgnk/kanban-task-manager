import { reactive, toRefs } from "@vue/reactivity";
/**
 * Define our state
 *
 * This state is mutable in the function below,
 * but if we pass it to the component without `toRefs`
 * it will not mutate.
 */
const state = reactive({
  sidebarOpen: false,
  activeBoard: "Platform Launch",
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

  /**
   * Return the state as a `reference` to make it mutable.
   */
  return {
    state: toRefs(state),
    tasksList,
    sidebarInView,
    getActiveBoard,
  };
};

import { reactive, toRefs } from "@vue/reactivity";
import notes from "../data/data.json";

/**
 * Define our state
 *
 * This state is mutable in the function below,
 * but if we pass it to the component without `toRefs`
 * it will not mutate.
 */
const state = reactive({
  notes: notes,
  sidebarOpen: false,
  activeBoard: null,
});

export default () => {
  const notesList = () => {
    return state.notes;
  };

  const sidebarInView = () => {
    return !state.sidebarOpen;
  };

  const getActiveBoard = () => {
    return !state.activeBoard;
  };

  /**
   * Return the state as a `reference` to make it mutable.
   */
  return {
    state: toRefs(state),
    notesList,
    sidebarInView,
    getActiveBoard,
  };
};

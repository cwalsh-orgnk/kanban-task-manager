export default {
  // eslint-disable-next-line no-unused-vars
  beforeMount: function (el, binding, vnode) {
    binding.event = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        if (binding.value instanceof Function) {
          binding.value(event);
        }
      }
    };
    document.body.addEventListener("click", binding.event);
  },
  // eslint-disable-next-line no-unused-vars
  unmounted: function (el, binding, vnode) {
    document.body.removeEventListener("click", binding.event);
  },
};

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/kanban-task-manager/",
  transpileDependencies: true,
  devServer: {
    port: 8080,
  },
});

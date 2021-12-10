/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "api/build",
  routes(defineRoutes) {
    return defineRoutes(route => {
      route("api/build/posts-data/*", "./posts-data");
    });
  }
};

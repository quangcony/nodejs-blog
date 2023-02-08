const newsRouter = require("./news");
const meRouter = require("./me");
const coursesRouter = require("./courses");

const siteRouter = require("./site");

function route(app) {
  app.use("/courses", coursesRouter);
  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/", siteRouter);
}

module.exports = route;

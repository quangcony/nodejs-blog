const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const { engine } = require("express-handlebars");
var methodOverride = require("method-override");
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.Connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

// Custome middleware
app.use(SortMiddleware)

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {

        const sortType = field === sort.column ? sort.type : 'default'

        const icons = {
          default: 'fa-sort',
          asc: 'fa-arrow-down-short-wide',
          desc: 'fa-arrow-down-wide-short'
        }

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc'
        }

        const icon = icons[sortType]
        const type = types[sort.type]

        return `<a href="?_sort&column=${field}&type=${type}"><i class="fa-solid ${icon}"></i></a>`
      }
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

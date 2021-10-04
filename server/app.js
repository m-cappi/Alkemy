var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const dotenv = require("dotenv");

const { notFound, errorHandler } = require("./middlewares/ErrorMiddleware.js");

const viewRouter = require("./routes/ViewTransactionRoutes");
const transactionRouter = require("./routes/TransactionRoutes");
const categoryRouter = require("./routes/CategoryRoutes");
//const userRouter = require("./routes/UserRoutes");
const authRouter = require("./routes/AuthRoutes");
//const testRouter = require("./test/route");

dotenv.config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

let server = app.listen(3005, function () {
    console.log("Server is listening on port 3005");
});

app.use("/view", viewRouter);
app.use("/transaction", transactionRouter);
app.use("/category", categoryRouter);
//app.use("/user", userRouter);
app.use("/auth", authRouter);
//app.use("/test", testRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

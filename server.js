const express = require("express");
require("express-async-errors");
const dayjs = require("dayjs");
const javbusRouter = require("./routes/javbusRoute");
const sevenmmRouter = require("./routes/7mmRoute");
const redisRouter = require("./routes/redisRoute");
const chromeRoute = require("./routes/chromeRoute");

//定时任务
const runSchedule = require("./scheduleJob/scheduleJob");

const app = express();
const port = 5601;

// 全局返回头
app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  let allUrls = [
    "/api/javbus/getJavBusPage/1",
    "/api/javbus/getJavBusDetail/a-1",
    "/api/javbus/getJavMagnetDetail/111",
    "/api/7mm/get7mmPage/1",
    "/api/redis",
  ];
  res.send(allUrls);
});

//router的总的调用方法
app.use("/api/javbus", javbusRouter);
app.use("/api/7mm", sevenmmRouter);
app.use("/api/redis", redisRouter);
app.use("/api/chrome", chromeRoute);

//全局报错处理
app.use(function (err, req, res, next) {
  return res.json({ code: 500, message: "服务器异常" });
});

//启用方法
app.listen(port, () => {
  console.log(`Now, app listening on port ${port}`);

  const handle = new require("./apiServer/7mmApiServer");
  //当前的时间
  new handle().saveData(dayjs().format("YYYY-MM-DD"));

  //注册定时任务方法
  // runSchedule(() => {
  //   const handle = new require("./apiServer/7mmApiServer");
  //   //当前的时间
  //   new handle().saveData(dayjs().format("YYYY-MM-DD"));
  // });
});

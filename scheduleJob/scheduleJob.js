// schedule/index.js 文件
var schedule = require("node-schedule");

const runSchedule = (cb) => {
  // cron风格的配置：每天上午7点执行一次
  schedule.scheduleJob("0 0 1 * * *", () => {
    console.log("定时任务执行");
    cb && cb();
  });
};

module.exports = runSchedule;

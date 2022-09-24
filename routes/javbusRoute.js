const express = require("express");
const router = express.Router();

/**
 * 获取列表信息
 */
router.get("/getJavBusPage/:pageSize", async (req, res, next) => {
  const handle = new require("../apiServer/javbusApiServer");
  let { pageSize } = req.params;
  let data = await new handle().getJavBusPage(pageSize);
  res.send(showResData("获取成功", data));
});

/**
 * 获取详细信息
 */
router.get("/getJavBusDetail/:number", async (req, res, next) => {
  const handle = new require("../apiServer/javbusApiServer");
  let { number } = req.params;
  let data = await new handle().getJavBusDetail(number);
  res.send(showResData("获取成功", data));
});

/**
 * 获取磁力信息
 */
router.get("/getJavMagnetDetail/:id", async (req, res, next) => {
  const handle = new require("../apiServer/javbusApiServer");
  let { id } = req.params;
  let data = await new handle().getJavMagnetDetail(id);
  res.send(showResData("获取成功", data));
});

const showResData = (msg, data = []) => {
  return {
    code: 200,
    msg,
    data,
  };
};

module.exports = router;

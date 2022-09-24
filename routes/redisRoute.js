const express = require("express");
const router = express.Router();

/**
 * 添加到收藏
 */
router.post("/addMyFav", async (req, res, next) => {
  const handle = new require("../apiServer/redisServer");
  let params = req.body;
  let data = await new handle().saveData(params);
  res.send(showResData("获取成功", data));
});

/**
 * 删除收藏的值
 */
router.post("/removeMyFav", async (req, res, next) => {
  const handle = new require("../apiServer/redisServer");
  let params = req.body;
  let data = await new handle().removeData(params);
  res.send(showResData("获取成功", data));
});

/**
 * 获取列表redis
 */
router.get("/getRedisData/:keyWord", async (req, res, next) => {
  const handle = new require("../apiServer/redisServer");
  let { keyWord } = req.params;
  let data = await new handle().getData(keyWord);
  res.send(showResData("获取成功", data));
});

/**
 * 随机获取一个proxy
 */
router.get("/getProxy", async (req, res, next) => {
  const handle = new require("../apiServer/redisServer");
  let data = await new handle().getProxy();
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

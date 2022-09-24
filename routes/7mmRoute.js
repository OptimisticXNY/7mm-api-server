const express = require("express");
const router = express.Router();

/**
 * 获取7mm的列表信息
 */
router.get("/get7mmPage/:pageSize", async (req, res, next) => {
  const handle = new require("../apiServer/7mmApiServer");
  let { pageSize } = req.params;
  let data = await new handle().getData(pageSize);
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

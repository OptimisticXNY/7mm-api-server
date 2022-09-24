const express = require("express");
const router = express.Router();

router.post("/se7enMm", async (req, res, next) => {
  const handle = new require("../apiServer/chromeServer");
  let params = req.body;
  let url = await new handle().getSe7enData(params);

  if (url != "error") {
    let result = await new handle().sendToAria2(url);
    res.send(showResData("获取成功", result));
  } else {
    res.send(showResData("获取失败", "error"));
  }
});

const showResData = (msg, data = []) => {
  return {
    code: 200,
    msg,
    data,
  };
};

module.exports = router;

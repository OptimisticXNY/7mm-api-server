const Common = new require("./Common");
const redis = require("redis");
const client = redis.createClient({
  url: "redis://www.wander555.ml:6479",
  password: "junjinking",
});

class SavetoRedisApiServer extends Common {
  async saveData(data) {
    !client.isOpen && (await client.connect());
    //需要保存的数据
    let jsonData = JSON.stringify(data);
    await client.lPush("favList", jsonData);
    return "OK";
  }

  async removeData(data) {
    !client.isOpen && (await client.connect());
    //需要保存的数据
    let jsonData = JSON.stringify(data);
    await client.lRem("favList", 0, jsonData);
    return "OK";
  }

  async getData(key) {
    !client.isOpen && (await client.connect());
    const result = await client.lRange(key, 0, -1);
    let resultList = [];
    result.forEach((k, v) => {
      resultList.push(k);
    });
    return resultList;
  }

  async getProxy() {
    !client.isOpen && (await client.connect());
    const result = await client.hKeys("use_proxy");
    let randomIndex = Math.round(Math.random() * result.length);
    return result[randomIndex];
  }
}
module.exports = SavetoRedisApiServer;

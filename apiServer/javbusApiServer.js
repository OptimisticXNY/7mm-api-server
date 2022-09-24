const javbus = require("..")();

class javbusApiServer {
  /**
   * 获取列表信息
   * @param {*} pageSize
   * @returns
   */
  async getJavBusPage(pageSize) {
    const data = await javbus.page(pageSize);
    return data;
  }

  /**
   * 根据番号获取详细信息
   * @param {*} number
   * @returns
   */
  async getJavBusDetail(number) {
    const data = await javbus.show(number);
    return data;
  }

  /**
   * 获取磁力信息
   * @param {*} id
   * @returns
   */
  async getJavMagnetDetail(id) {
    const data = await javbus.magnet(id);
    return data;
  }
}
module.exports = javbusApiServer;

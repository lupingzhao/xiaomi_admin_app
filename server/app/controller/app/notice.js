const BaseController = require('./base')
function genID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

class OrderController extends BaseController {
  async getNotice() {
    let { ctx } = this
    let notices = await ctx.model.Notice.find()
    if (notices.length) {
      let arr = notices.filter(item => item.isShow)
      if (arr.length) {
        this.success(200, '获取成功', arr, arr.length)
      } else {
        this.success(200, '暂无数据', [], 0)
      }
    }
  }

}

module.exports = OrderController
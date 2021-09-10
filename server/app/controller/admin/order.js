const BaseController = require('./base')

class OrderController extends BaseController {
  async getOrder() {
    let {ctx} = this
    let orders = await ctx.model.Order.find()
    if (orders.length) {
      this.success(200, '获取成功', orders, orders.length)
    } else {
      this.success(200, '暂无数据', [], 0)
    }
  }
}

module.exports = OrderController

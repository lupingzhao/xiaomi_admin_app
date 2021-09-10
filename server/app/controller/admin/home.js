'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let { ctx } = this
    let userCount = await ctx.model.User.find().count()
    let orderCount = await ctx.model.Order.find().count()
    let goodsCount = await ctx.model.Goods.find().count()
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: {
        userCount,
        orderCount,
        goodsCount
      }
    }
  }
  async searchWord() {
    let arr = [
      {
        name: '小米11'
      },
      {
        name: '小米手机'
      },
      {
        name: '小米洗衣机'
      },
      {
        name: '空调'
      },
      {
        name: '耳机'
      },
    ]
    this.ctx.body = {
      code: 200,
      msg: '获取成功',
      data: arr
    }
  }
}

module.exports = HomeController

const BaseController = require('./base')

class GoodController extends BaseController {
  async getGoods() {
    let {ctx} = this
    let {id} = ctx.request.body
    let goods = await ctx.model.Goods.findById(id)
    if (goods) {
      this.success(200, '获取成功', goods)
    } else {
      this.fail(500, '暂无商品')
    }
  }
  async getNew() {
    let {ctx} = this
    let goods = await ctx.model.Goods.find()
    if (goods.length) {
      let res = goods.filter(item => item.isNewGood)
      this.success(200, '获取成功', res, res.length)
    } else {
      this.fail(500, '暂无商品')
    }
  }
  async getHot() {
    let {ctx} = this
    let goods = await ctx.model.Goods.find()
    if (goods.length) {
      let res = goods.filter(item => item.isHot)
      this.success(200, '获取成功', res, res.length)
    } else {
      this.fail(500, '暂无商品')
    }
  }
  async getRecommend() {
    let {ctx} = this
    let goods = await ctx.model.Goods.find()
    if (goods.length) {
      let res = goods.filter(item => item.isRecommend)
      this.success(200, '获取成功', res, res.length)
    } else {
      this.fail(500, '暂无商品')
    }
  }
  async geSeckillGoods() {
    let {ctx} = this
    let goods = await ctx.model.Goods.find()
    if (goods.length) {
      let res = goods.filter(item => item.seckill && item.seckill.isSeckill)
      this.success(200, '获取成功', res, res.length)
    } else {
      this.fail(500, '暂无商品')
    }
  }
}

module.exports = GoodController

const BaseController = require('./base')

class GoodController extends BaseController {
  async getNav() {
    let {ctx} = this
    let res = await ctx.model.IndexNav.find()
    if (res.length) {
      let navs = []
      res.map(item => {
        let obj = {}
        obj.name = item.name
        obj.desc = item.desc
        obj._id = item._id
        obj.isShow = item.isShow
        navs.push(obj)
      })
      this.success(200, '获取成功', navs, navs.length)
    } else {
      this.fail(200, '暂无数据', [])
    }
  }
  async getNavGoods() {
    let {ctx} = this
    let {id} = ctx.request.body
    let res = await ctx.model.IndexNav.findById(id)
    if (res) {
      this.success(200, '获取成功', res.goods, res.goods.length)
    } else {
      this.fail(200, '暂无数据', [])
    }
  }
}

module.exports = GoodController
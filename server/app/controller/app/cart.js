const BaseController = require('./base')
function genID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

class CartController extends BaseController {
  async getCart() {
    let {ctx} = this
    let {user_id} = ctx.request.body
    let user = await ctx.model.AppUser.findById(user_id)
    if (user) {
      this.success(200, '获取成功', user.carts, user.carts.length)
    } else {
      this.success(200, '暂无数据', [], 0)
    }
  }
  async addCart() {
    let { ctx } = this
    let {user_id, goods, spec, count} = ctx.request.body
    let user = await ctx.model.AppUser.findById(user_id)
    let cart = user.carts.find(item => JSON.stringify(item.goods) === JSON.stringify(goods) && JSON.stringify(item.spec) === JSON.stringify(spec))
    if (!cart) {
      let r = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
        $set: {
          carts: [...user.carts, {
            _id: genID(20),
            goods,
            spec,
            count
          }]
        }
      })
      if (r) {
        this.success(200, '新增成功')
      } else {
        this.fail(500, '新增失败')
      }
    } else {
      cart.count += count * 1
      let r = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
        $set: {
          carts: [...user.carts]
        }
      })
      if (r) {
        this.success(200, '新增成功')
      } else {
        this.fail(500, '新增失败')
      }
    }
  }
  async delCart() {
    let {ctx} = this
    let {user_id, id} = ctx.request.body
    let user = await ctx.model.AppUser.findById(user_id)
    let carts = user.carts.filter(item => item._id !== id)
    let r = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
      $set: {
        carts
      }
    })
    if (r) {
      this.success(200, '删除成功')
    } else {
      this.fail(500, '删除失败')
    }
  }
  async updateCart() {
    let {ctx} = this
    let {user_id, count, id} = ctx.request.body
    let user = await ctx.model.AppUser.findById(user_id)
    let cart = user.carts.find(item => item._id === id)
    cart.count = count
    let r = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
      $set: {
        carts: [...user.carts]
      }
    })
    if (r) {
      this.success(200, '修改成功')
    } else {
      this.fail(500, '修改失败')
    }
  }
}

module.exports = CartController
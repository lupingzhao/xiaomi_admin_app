const BaseController = require('./base')
function genID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

class OrderController extends BaseController {
  async getAppOrder() {
    let { ctx } = this
    let { user_id } = ctx.request.body
    let user = await ctx.model.AppUser.findById(user_id)
    if (user) {
      this.success(200, '获取成功', user.order, user.order.length)
    } else {
      this.success(200, '用户不存在')
    }
  }
  async addOrder() {
    let { ctx } = this
    let { user_id, goods_list } = ctx.request.body
    let user = await ctx.model.AppUser.findById(user_id)
    if (user) {
      await this.create('Order')
      let arr = []
      let flag = true
      user.carts.map(item => {
        goods_list.map(item1 => {
          item1.isComment = false
          if (item.goods._id === item1.goods._id) {
            flag = false
          }
        })
        if (flag) {
          arr.push(item)
        }
      })
      let r1 = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
        $set: {
          carts: arr
        }
      })
      let r = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
        $set: {
          order: [...user.order, {
            ...ctx.request.body,
            id: genID(20)
          }]
        }
      })
      if (r && r1) {
        this.success(200, '新增成功')
      } else {
        this.fail(200, '新增失败')
      }
    } else {
      this.fail(500, '用户不存在',)
    }
  }
  async delOrder() {
    let { ctx } = this
    let { orderId, isWechat, user_id } = ctx.request.body
    if (!isWechat) {
      let user = await ctx.model.AppUser.findById(user_id)
      if (user) {
        let arr = user.order.filter(item => item.id !== orderId)
        let res = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
          $set: {
            order: arr
          }
        })
        if (res) {
          this.success(200, '设置成功')
        } else {
          this.success(500, '设置失败')
        }
      }
    } else {
      let user = await ctx.model.WechatUser.findOne({
        openid: user_id
      })
      if (user) {
        let arr = user.order.filter(item => item.id !== orderId)
        let res = await ctx.model.WechatUser.findOneAndUpdate({
          openid: user_id
        }, {
          $set: {
            order: arr
          }
        })
        if (res) {
          this.success(200, '设置成功')
        } else {
          this.success(500, '设置失败')
        }
      }
    }
  }
}

module.exports = OrderController
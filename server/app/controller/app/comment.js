const BaseController = require('./base')

class CommentController extends BaseController {
  async createComment() {
    let { ctx } = this
    let { user_id, goods_id, order_id, rate, content, pic, isAnonymous, comment_time } = ctx.request.body
    let user = await ctx.model.AppUser.findById(user_id)
    let order = user.order.find(item => item.id === order_id)

    if (user) {
      if (order) {
        let goods = order.goods_list.find(item => {
          return item._id === goods_id
        })

        goods.isComment = true
        goods.comment = {
          rate,
          content,
          pic,
          isAnonymous,
          comment_time,
          user: {
            avatarUrl: user.avatarUrl,
            username: user.username,
          }
        }
        goods.goods.comment.push({
          rate,
          content,
          pic,
          isAnonymous,
          comment_time,
          user: {
            avatarUrl: user.avatarUrl,
            username: user.username,
          }
        })
        await ctx.model.Goods.findByIdAndUpdate(goods.goods._id, {
          $set: {
            comment: goods.goods.comment
          }
        })
        let r = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
          $set: {
            order: order
          }
        })
        if (r) {
          this.success(200, '评价成功')
        } else {
          this.fail(200, '评价成功')
        }
      }
    }
    else {
      this.fail(500, '用户不存在')
    }
  }
}

module.exports = CommentController

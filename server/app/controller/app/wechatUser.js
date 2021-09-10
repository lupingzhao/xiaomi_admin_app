const BaseController = require('./base')

class WechatUserController extends BaseController {
  async addWechatUser() {
    let {ctx} = this
    let {openid} = ctx.request.body
    let user = await ctx.model.WechatUser.findOne({openid})
    if (user) {
      this.success(200, '登录成功', user)
    } else {
      await this.create('WechatUser')
    }
  }
}



module.exports = WechatUserController
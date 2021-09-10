const BaseController = require('./base')
function genID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

class AddressController extends BaseController {
  async getAppAddress() {
    let { ctx } = this
    let { user_id } = ctx.request.body
    let user = await ctx.model.AppUser.findById(user_id)
    if (user) {
      this.success(200, '获取成功', user.address, user.address.length)
    } else {
      this.success(200, '用户不存在')
    }
  }
  async getWechatAddress() {
    let { ctx } = this
    let { openid } = ctx.request.body
    let user = await ctx.model.WechatUser.findOne({ openid })
    if (user) {
      this.success(200, '获取成功', user.address, user.address.length)
    } else {
      this.success(200, '用户不存在')
    }
  }
  async addAddress() {
    let { ctx } = this
    let { user_id } = ctx.request.body

    let user = await ctx.model.AppUser.findById(user_id)
    if (user) {
      await this.create('Address')
      let r = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
        $set: {
          address: [...user.address, {
            ...ctx.request.body,
            id: genID(20)
          }]
        }
      })
      if (r) {
        this.success(200, '新增成功')
      } else {
        this.fail(200, '新增失败')
      }
    } else {
      this.fail(500, '用户不存在',)
    }
  }
  async delAddress() {
    let { ctx } = this
    let { addressId, user_id } = ctx.request.body
    let user = await ctx.model.AppUser.findById(user_id)
    if (user) {
      let arr = user.address.filter(item => item.id !== addressId)
      let res = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
        $set: {
          address: arr
        }
      })
      if (res) {
        this.success(200, '设置成功')
      } else {
        this.success(500, '设置失败')
      }
    }
  }
  async updateAddress() {
    await this.update('Address')
    await this.updateAttr('AppUser', 'address')
  }
  async setDefault() {
    let { ctx } = this
    let { addressId, user_id } = ctx.request.body
    let user = await ctx.model.AppUser.findById(user_id)
    if (user) {
      user.address.map(item => {
        item.isDefault = false
      })
      let i = user.address.find(item => item.id === addressId)
      i.isDefault = true
      let res = await ctx.model.AppUser.findByIdAndUpdate(user_id, {
        $set: {
          address: user.address
        }
      })
      if (res) {
        this.success(200, '删除成功')
      } else {
        this.success(500, '删除失败')
      }
    }
  }
}

module.exports = AddressController
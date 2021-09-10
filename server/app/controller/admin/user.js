const BaseController = require('./base')
const utils = require('../../utils')



class UserController extends BaseController {
  // 用户名登录
  async login() {
    let {
      ctx
    } = this
    let {
      username,
      password
    } = ctx.request.body
    let user = await ctx.model.User.findOne({
      username,
      password: password
    })
    if (user) {
      let token = ctx.app.jwt.sign({
        username
      }, this.app.config.jwt.secret, {
        expiresIn: '24h',
      })
      let data = {
        _id: user._id,
        username: user.username,
        regiter_time: user.regiter_time,
        avatar: user.avatar,
      }
      ctx.body = {
        code: 200,
        msg: '登录成功',
        token,
        data
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '用户名或密码不正确'
      }
    }
  }
  // 修改密码
  async updatePassword() {
    let {
      ctx
    } = this
    let {
      username,
      password,
      id,
      newPwd
    } = ctx.request.body
    let user = await ctx.model.User.findOne({
      username,
      password: utils.Encrypt(password)
    })
    if (user) {
      if (password === newPwd) {
        ctx.body = {
          code: 500,
          msg: '新密码不能与原密码相同'
        }
      } else {
        let res = await ctx.model.User.findByIdAndUpdate(id, {
          username,
          password: utils.Encrypt(newPwd)
        })
        if (res) {
          ctx.body = {
            code: 200,
            msg: '修改成功'
          }
        } else {
          ctx.body = {
            code: 500,
            msg: '修改失败'
          }
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '原密码不正确,请重新输入'
      }
    }
  }
  // 添加用户
  async addUser() {
    await this.create('User')
  }
  // 获取全部用户
  async allUser() {
    await this.find('User', ['username', 'mobile', 'email'])
  }
  // 删除用户
  async delUser() {
    let {
      ctx
    } = this
    let id = ctx.request.body.id
    let user = await ctx.model.User.findById(id)
    if (user.username === 'admin') {
      return ctx.body = {
        code: 500,
        msg: '不能删除管理员admin'
      }
    } else {
      let res = await ctx.model.User.findByIdAndRemove(id)
      if (res) {
        ctx.body = {
          code: 200,
          msg: '删除成功'
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '删除失败'
        }
      }
    }
  }
  async updateUser() {
    await this.update('User')
  }
  // 禁用用户
  async showUser() {
    await this.show('User')
  }
}


module.exports = UserController
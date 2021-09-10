const SMSClient = require('@alicloud/sms-sdk')
const config = require('../../config')
const BaseController = require('./base')

let sessionCode = ''


class AppUserController extends BaseController {
  // 获取短信验证码
  async getCode() {
    let {
      ctx
    } = this
    let {
      mobile
    } = ctx.request.body
    let smsClient = new SMSClient({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    })
    let str = ""
    for (let i = 0; i < 6; i++) {
      str += parseInt(Math.random() * 10)
    }
    let res = await smsClient.sendSMS({
      PhoneNumbers: mobile,
      SignName: "小爱在线", //签名名称
      TemplateCode: config.templateCode, //模版CODE  
      TemplateParam: `{"code":'${str}'}`, // 短信模板变量对应的实际值，JSON格式
    })
    let {
      Code
    } = res
    if (Code == 'OK') {
      sessionCode = str
      ctx.body = {
        code: 200,
        msg: '短信发送成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: res.Message
      }
    }
  }

  // 注册
  async register() {
    let {
      ctx
    } = this
    let {
      mobile,
      code,
      username,
      password
    } = ctx.request.body
    if (sessionCode === code) {
      let u = await ctx.model.AppUser.findOne({
        mobile,
        username,
        password
      })
      if (u) {
        ctx.body = {
          code: 500,
          msg: '用户名已存在'
        }
      } else {
        let newAppUser = await ctx.model.AppUser({
          mobile,
          username,
          password
        })
        newAppUser.save()
        ctx.body = {
          code: 200,
          msg: '注册成功'
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '验证码不正确'
      }
    }
  }

  // 手机号登录
  async mobileLogin() {
    let {
      ctx
    } = this
    let {
      mobile,
      code
    } = ctx.request.body
    if (code === sessionCode) {
      let user = await ctx.model.AppUser.findOne({
        mobile
      })
      if (user) {
        let token = ctx.app.jwt.sign({
          mobile
        }, this.app.config.jwt.secret, {
          expiresIn: '24h',
        })
        ctx.body = {
          code: 200,
          msg: '登录成功',
          token,
          data: user
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '用户手机号不正确'
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '验证码不正确'
      }
    }
  }

  // 用户名登录
  async userLogin() {
    let {
      ctx
    } = this
    let {
      username,
      password
    } = ctx.request.body
    let user = await ctx.model.AppUser.findOne({
      username,
      password
    })
    if (user) {
      let token = ctx.app.jwt.sign({
        username
      }, this.app.config.jwt.secret, {
        expiresIn: '24h',
      })
      ctx.body = {
        code: 200,
        msg: '登录成功',
        token,
        data: user
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '用户名或密码不正确'
      }
    }
  }

  // 微信一键登录
  async wechatLogin() {
    let { ctx } = this
    let { code } = ctx.request.body
    let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + config.appid + '&secret=' + config.secret + '&js_code=' + code + '&grant_type=authorization_code';
    let res = await ctx.curl(url, {
      dataType: 'json',
    })
    if (res.data.openid) {
      let token = ctx.app.jwt.sign({
        user: res.data
      }, this.app.config.jwt.secret, {
        expiresIn: '24h',
      })
      ctx.body = {
        code: 200,
        msg: '登录成功',
        data: {
          openid: res.data.openid,
          sessionKey: res.data.session_key,
          token
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '登录失败',
        data: res.data.errmsg
      }
    }
  }
  // 获取用户
  async getAppUser() {
    let {ctx} = this
    let {user_id} = ctx
    let user = await ctx.model.AppUser.findById(user_id)
    if (user) {
      this.success(200, '获取成功', user)
    } else {
      this.fail(500, '用户不存在')
    }
  }
}

module.exports = AppUserController

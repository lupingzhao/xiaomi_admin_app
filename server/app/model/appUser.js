module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const AppUserSchema = new Schema({
    // 用户名
    username: {  
      type: String, 
      required: true
    },
    // 密码
    password: {
      type: String,
      select: false
    },
    // 电话
    mobile: {
      type: String,
      default: ''
    },
    // 注册时间
    regiter_time: {
      type: Date,
      default: Date.now
    },
    // 头像
    avatarUrl: {
      type: String,
      default: ''
    },
    // 昵称
    nickName: {
      type: String,
      default: ''
    },
    // 性别
    gender: {
      type: Number,
      default: 0
    },
    // 国家
    country: {
      type: String,
      default: ''
    },
    // 省份
    province: {
      type: String,
      default: ''
    },
    // 城市
    city: {
      type: String,
      default: ''
    },
    // 地址
    address: {
      type: Array,
      default: []
    },
    // 余额
    balance: {
      type: String,
      default: ''
    },
    // 支付密码
    payPassword: {
      type: Number,
      default: 0
    },
    // 订单列表
    order: {
      type: Array,
      default: []
    },
    // 购物车
    carts: {
      type: Array,
      default: []
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('AppUser', AppUserSchema)
}
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const UserSchema = new Schema({
    // 用户名
    username: {  
      type: String, 
    },
    // 密码
    password: {
      type: String,
      select: false
    },
    // 邮箱
    email: {
      type: String,
      default: ''
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
    avatar: {
      type: String,
      default: ''
    },
    // 是否禁用
    status: { 
      type: Boolean,
      default: true
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('User', UserSchema)
}
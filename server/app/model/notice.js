module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const NoticeSchema = new Schema({
    // 通知内容
    content: {
      type: String,
      required: true
    },
    // 是否显示
    isShow: {
      type: Boolean,
      default: true
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('Notice', NoticeSchema)
}
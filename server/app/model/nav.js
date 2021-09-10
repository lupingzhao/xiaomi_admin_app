module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const NavSchema = new Schema({
    // 图片路径
    url: {
      type: String,
      required: true
    },
    // 图片标题
    title: {
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
  return mongoose.model('Nav', NavSchema)
}
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const BannerSchema = new Schema({
    // 图片路径
    url: {
      type: String,
      required: true
    },
    // 图片标题
    title: {
      type: String,
      default: ''
    },
    // 跳转链接
    link: {
      type: String,
      default: ''
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
  return mongoose.model('Banner', BannerSchema)
}
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const IndexNavSchema = new Schema({
    // 导航名称
    name: {
      type: String,
      required: true
    },
    // 导航描述
    desc: {
      type: String,
      required: true
    },
    goods: {
      type: Array,
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
  return mongoose.model('IndexNav', IndexNavSchema)
}
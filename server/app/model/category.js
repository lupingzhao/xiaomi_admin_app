module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const CategorySchema = new Schema({
    // 图片标题
    name: {
      type: String,
      required: true
    },
    // 是否显示
    isShow: {
      type: Boolean,
      default: true
    },
    // 别名
    short_name: {
      type: String,
      default: ''
    },
    // 二级分类
    list: {
      type: Array,
      default: []
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('Category', CategorySchema)
}
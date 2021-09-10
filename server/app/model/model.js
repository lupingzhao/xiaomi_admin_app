// 商品模型
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const ModelSchema = new Schema({
    // 图片路径
    name: {
      type: String,
      required: true
    },
    // 模型规格
    specifications: {
      type: Array,
      default: []
    },
    // 属性列表
    attribute: {
      type: Array,
      default: []
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('Model', ModelSchema)
}
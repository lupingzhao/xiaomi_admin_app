module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const CommentSchema = new Schema({
    // 评价用户
    user_id: {
      type: String,
      required: true
    },
    // 商品id
    goods_id: {
      type: String,
      required: true
    },
    // 评价分数
    rate: {
      type: String,
      required: true
    },
    // 评价内容
    content: {
      type: Array,
      required: true
    },
    // 评价图片
    pic: {
      type: Array,
      default: []
    },
    // 是否匿名
    isAnonymous: {
      type: Boolean,
      default: false
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('Comment', CommentSchema)
}
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const CartSchema = new Schema({
    // 数量
    count: {
      type: String,
      required: true
    },
    goods: {
      type: Object,
      required: true
    },
    // 商品规格
    spec: {
      type: Array,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('Cart', CartSchema)
}
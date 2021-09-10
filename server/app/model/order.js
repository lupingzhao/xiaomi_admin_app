module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const OrderSchema = new Schema({
    // 订单价格
    price: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    // 详细地址
    address: {
      type: Object,
      required: true
    },
    // 商品数量
    count: {
      type: String,
      required: true
    },
    // 支付时间
    pay_time: {
      type: String,
      required: true
    },
    // 用户信息
    user_id: {
      type: String,
      required: true
    },
    // 订单商品
    goods_list: {
      type: Array,
      required: true
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('Order', OrderSchema)
}
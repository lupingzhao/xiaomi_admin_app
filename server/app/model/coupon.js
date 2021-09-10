module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const CouponSchema = new Schema({
    // 优惠券名称
    name: {
      type: String,
      required: true
    },
    // 开始时间
    start_time: {
      type: String,
      required: true
    },
    // 结束时间
    end_time: {
      type: String,
      required: true
    },
    // 发放数量
    number: {
      type: String,
      required: true
    },
    // 优惠金额
    amount: {
      type: String,
      required: true
    },
    // 使用门槛
    threshold: {
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
  return mongoose.model('Coupon', CouponSchema)
}
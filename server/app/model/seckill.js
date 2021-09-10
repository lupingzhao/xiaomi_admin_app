module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const SeckillSchema = new Schema({
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
    // 秒杀数量
    goods_number: {
      type: String,
      required: true
    },
    // 秒杀商品
    goods: {
      type: Object,
      required: true
    },
    // 秒杀价格
    price: {
      type: String,
      required: true
    },
    // 是否开启
    isShow: {
      type: Boolean,
      default: true
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('Seckill', SeckillSchema)
}
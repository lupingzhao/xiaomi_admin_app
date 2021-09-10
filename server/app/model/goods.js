module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const GoodsSchema = new Schema({
    // 商品名称
    name: {
      type: String,
      required: true
    },
    // 商品图片
    pic: {
      type: Array,
      default: []
    },
    // 分类
    category: {
      type: String,
      required: true
    },
    // 商品视频
    video: {
      type: Array,
      default: []
    },
    // 原价
    originalPrice: {
      type: String,
      required: true
    },
    // 现价
    presentPrice: {
      type: String,
      required: true
    },
    // 优惠
    discount: {
      type: Array,
      default: []
    },
    // 详情
    detail: {
      type: String,
      required: true
    },
    // 规格
    spec: {
      type: Array,
      required: true
    },
    // 简介
    introduction: {
      type: String,
      required: true
    },
    // 单位
    company: {
      type: String,
      required: true
    },
    // 库存
    stock: {
      type: String,
      required: true
    },
    // 是否新品
    isNewGood: {
      type: Boolean,
      default: true
    },
    // 是否推荐商品
    isRecommend: {
      type: Boolean,
      default: true
    },
    // 是否热卖商品
    isHot: {
      type: Boolean,
      default: true
    },
    // 评价
    comment: {
      type: Array,
      default: []
    },
    // 是否显示
    isShow: {
      type: Boolean,
      default: true
    },
    // 推荐介绍
    sellDesc: {
      type: Array,
      required: true
    },
    // 产品介绍
    productionDesc: {
      type: Array,
      required: true
    },
    // 创建时间
    create_time: {
      type: Date,
      default: Date.now
    },
    // 商品参数
    params: {
      type: Array,
      default: []
    },
    // 规格参数
    specParams: {
      type: String,
      default: ''
    },
    // 秒杀参数
    seckill: {
      type: Object,
      default:{}
    },
    // 封面图
    cover: {
      type: String,
      required: true
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('Goods', GoodsSchema)
}
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const AddressSchema = new Schema({
    // 用户id
    user_id: {  
      type: String, 
      required: true
    },
    // 姓名
    username: {
      type: String, 
      required: true
    },
    // 手机号
    mobile: {
      type: String, 
      required: true
    },
    // 所在地址 省市区街道
    address: {
      type: String, 
      required: true
    },
    detailAddress: {
      type: String, 
      required: true
    },
    isDefault: {
      type: Boolean, 
      required: true
    },
    __v: {
      type: Number,
      select: false
    }
  })
  return mongoose.model('Address', AddressSchema)
}
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app
  const jwt = app.middleware.jwt(app.config.jwt)

  // admin端
  // 上传
  router.post('/admin/upload', jwt, controller.admin.base.uploadFile)
  router.post('/app/upload', jwt, controller.admin.base.uploadFile)

  // 首页数据
  router.get('/admin/index', jwt, controller.admin.home.index)



  // 用户
  router.get('/', controller.home.index)

  // 用户名登录
  router.post('/admin/login', controller.admin.user.login)
  // 添加用户
  router.post('/admin/addUser', jwt, controller.admin.user.addUser)
  // 获取全部
  router.get('/admin/allUser', jwt, controller.admin.user.allUser)
  // 删除用户
  router.post('/admin/delUser', jwt, controller.admin.user.delUser)
  router.post('/admin/showUser', jwt, controller.admin.user.showUser)
  router.post('/admin/updateUser', jwt, controller.admin.user.updateUser)



  // 轮播图
  // 创建轮播图
  router.post('/admin/addBanner', jwt, controller.admin.banner.createBanner)
  // 获取轮播图
  router.get('/admin/getBanner', jwt, controller.admin.banner.getBanner)
  // 删除轮播图
  router.post('/admin/delBanner', jwt, controller.admin.banner.delBanner)
  // 显示轮播图
  router.post('/admin/showBanner', jwt, controller.admin.banner.showBanner)
  // 修改轮播图
  router.post('/admin/updateBanner', jwt, controller.admin.banner.updateBanner)


  // 创建通知
  router.post('/admin/addNotice', jwt, controller.admin.notice.createNotice)
  // 获取通知
  router.get('/admin/getNotice', jwt, controller.admin.notice.getNotice)
  // 删除通知
  router.post('/admin/delNotice', jwt, controller.admin.notice.delNotice)
  // 显示通知
  router.post('/admin/showNotice', jwt, controller.admin.notice.showNotice)
  // 修改通知
  router.post('/admin/updateNotice', jwt, controller.admin.notice.updateNotice)



  // 秒杀
  router.post('/admin/addSeckill', jwt, controller.admin.seckill.createSeckill)
  router.get('/admin/getSeckill', jwt, controller.admin.seckill.getSeckill)
  router.post('/admin/delSeckill', jwt, controller.admin.seckill.delSeckill)
  router.post('/admin/updateSeckill', jwt, controller.admin.seckill.updateSeckill)
  router.post('/admin/showSeckill', jwt, controller.admin.seckill.showSeckill)

  // 优惠券
  router.post('/admin/addCoupon', jwt, controller.admin.coupon.createCoupon)
  router.get('/admin/getCoupon', jwt, controller.admin.coupon.getCoupon)
  router.post('/admin/delCoupon', jwt, controller.admin.coupon.delCoupon)
  router.post('/admin/updateCoupon', jwt, controller.admin.coupon.updateCoupon)
  router.post('/admin/showCoupon', jwt, controller.admin.coupon.showCoupon)



  // 创建导航
  router.post('/admin/addNav', jwt, controller.admin.nav.createNav)
  // 获取导航
  router.get('/admin/getNav', jwt, controller.admin.nav.getNav)
  // 删除导航
  router.post('/admin/delNav', jwt, controller.admin.nav.delNav)
  // 显示导航
  router.post('/admin/showNav', jwt, controller.admin.nav.showNav)
  // 修改导航
  router.post('/admin/updateNav', jwt, controller.admin.nav.updateNav)

  // 创建推荐导航
  router.post('/admin/addIndexNav', jwt, controller.admin.indexNav.createIndexNav)
  // 获取推荐导航
  router.get('/admin/getIndexNav', jwt, controller.admin.indexNav.getIndexNav)
  // 删除推荐导航
  router.post('/admin/delIndexNav', jwt, controller.admin.indexNav.delIndexNav)
  // 显示推荐导航
  router.post('/admin/showIndexNav', jwt, controller.admin.indexNav.showIndexNav)
  // 修改推荐导航
  router.post('/admin/updateIndexNav', jwt, controller.admin.indexNav.updateIndexNav)


  // 添加商品模型
  router.post('/admin/addModel', jwt, controller.admin.model.createModel)
  router.get('/admin/getModel', jwt, controller.admin.model.getModel)
  router.post('/admin/delModel', jwt, controller.admin.model.delModel)
  router.post('/admin/updateModel', jwt, controller.admin.model.updateModel)

  // 获取商品规格
  router.post('/admin/getSpec', jwt, controller.admin.model.getSpec)
  // 添加商品规格
  router.post('/admin/addSpec', jwt, controller.admin.model.addSpec)
  // 删除商品规格
  router.post('/admin/delSpec', jwt, controller.admin.model.delSpec)

  // 获取商品分类
  router.post('/admin/addCategory', jwt, controller.admin.category.createCategory)
  router.get('/admin/getCategory', jwt, controller.admin.category.getCategory)
  router.post('/admin/delCategory', jwt, controller.admin.category.delCategory)
  router.post('/admin/updateCategory', jwt, controller.admin.category.updateCategory)

  // 二级分类
  router.post('/admin/addSecondCategory', jwt, controller.admin.category.addList)
  router.get('/admin/getSecondCategory', jwt, controller.admin.category.getList)
  router.post('/admin/delSecondCategory', jwt, controller.admin.category.delList)

  // 商品
  router.post('/admin/addGoods', jwt, controller.admin.goods.createGood)
  router.get('/admin/getGoods', jwt, controller.admin.goods.getGood)
  router.post('/admin/delGoods', jwt, controller.admin.goods.delGood)

  // 获取商品参数
  router.post('/admin/getParams', jwt, controller.admin.goods.getParams)
  // 添加商品参数
  router.post('/admin/addParams', jwt, controller.admin.goods.addParams)
  // 删除商品参数
  router.post('/admin/delParams', jwt, controller.admin.goods.delParams)
  router.post('/admin/updateParams', jwt, controller.admin.goods.updateParams)

  // 获取商品规格参数
  router.post('/admin/getSpecParams', jwt, controller.admin.goods.getSpecParams)
  // 添加商品规格参数
  router.post('/admin/addSpecParams', jwt, controller.admin.goods.addSpecParams)
  // 删除商品规格参数
  router.post('/admin/delSpecParams', jwt, controller.admin.goods.delSpecParams)
  router.post('/admin/updateSpecParams', jwt, controller.admin.goods.updateSpecParams)

  // 订单
  router.get('/admin/getOrder', jwt, controller.admin.order.getOrder)



  // app端

  // 用户
  // 获取验证码
  router.post('/app/getCode', controller.app.appUser.getCode)
  // 注册
  router.post('/app/register', controller.app.appUser.register)
  // 用户名登录
  router.post('/app/userLogin', controller.app.appUser.userLogin)
  // 手机登录
  router.post('/app/mobileLogin', controller.app.appUser.mobileLogin)

  // 获取用户
  router.post('/app/getAppUser', controller.app.appUser.getAppUser)





  // 搜索热词
  router.get('/app/searchWord', controller.admin.home.searchWord)
  // 获取轮播图
  router.get('/app/getBanner', controller.admin.banner.getBanner)
  // 获取导航
  router.get('/app/getNav', controller.admin.nav.getNav)
  // 获取全部商品
  router.get('/app/getGoods', controller.admin.goods.getGood)
  // 获取商品分类
  router.get('/app/getCategory', controller.admin.category.getAppCategory)
  // 获取优惠券
  router.get('/app/getCoupon', controller.admin.coupon.getCoupon)
  // 获取秒杀商品
  router.get('/app/getSeckill', controller.admin.seckill.getSeckill)

  // 商品详情
  router.post('/app/goodsDetail', controller.app.goods.getGoods)

  // 获取新品
  router.get('/app/getNew', controller.app.goods.getNew)
  // 获取热销商品
  router.get('/app/getHot', controller.app.goods.getHot)
  // 获取推荐商品
  router.get('/app/getRecommend', controller.app.goods.getRecommend)
  // 获取秒杀商品
  router.get('/app/getSeckillGoods', controller.app.goods.geSeckillGoods)

  // 获取推荐导航
  router.get('/app/getRecommendNav', controller.app.recommendNav.getNav)
  // 获取导航下属商品
  router.post('/app/getNavGoods', controller.app.recommendNav.getNavGoods)
  // 搜索
  router.get('/app/search', controller.app.home.search)

  // 购物车
  router.post('/app/getCart', jwt, controller.app.cart.getCart)
  router.post('/app/addCart', jwt, controller.app.cart.addCart)
  router.post('/app/delCart', jwt, controller.app.cart.delCart)
  router.post('/app/updateCart', jwt, controller.app.cart.updateCart)

  // 地址
  router.post('/app/getAppAddress', jwt, controller.app.address.getAppAddress)
  router.post('/app/getWechatAddress', jwt, controller.app.address.getWechatAddress)
  router.post('/app/addAddress', jwt, controller.app.address.addAddress)
  router.post('/app/delAddress', jwt, controller.app.address.delAddress)
  router.post('/app/updateAddress', jwt, controller.app.address.updateAddress)
  router.post('/app/setDefault', jwt, controller.app.address.setDefault)


  // 订单
  router.post('/app/getAppOrder', jwt, controller.app.order.getAppOrder)
  router.post('/app/addOrder', jwt, controller.app.order.addOrder)
  router.post('/app/delOrder', jwt, controller.app.order.delOrder)

  // 评价
  router.post('/app/createComment', jwt, controller.app.comment.createComment)

  // 通知
  router.get('/app/getNotice', controller.app.notice.getNotice)

  // 获取区域
  router.get('/app/getAreaList', jwt, controller.home.getAreaList)
  // 搜索城市
  router.post('/app/searchAreaList', jwt, controller.home.searchAreaList)
  // 小米之家详情
  router.post('/app/storeHome', jwt, controller.home.storeHome)
  // 小米之家店铺详情
  router.post('/app/storeDetail', jwt, controller.home.storeDetail)
}

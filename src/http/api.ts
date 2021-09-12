import http from "./index"

export default {
  // 上传图片
  upload() {
    return http.post('/admin/upload')
  },
  // 获取首页数据
  getIndex() {
    return http.get('/admin/index')
  },
  // 用户名登录
  login({ username, password }: { username: string, password: string }) {
    return http.post('/admin/login', {
      // 用户名
      username,
      // 密码
      password,
    })
  },
  // 获取用户
  getUser({ current, pageSize, query }: { current: number, pageSize: number, query: string }) {
    return http.get(`/admin/allUser?current=${current}&pageSize=${pageSize}&query=${query}`)
  },
  // 添加用户
  addUser({ username, avatar, email, mobile, password, status }: { username: string, password: string, avatar: string, email: string, mobile: string, status: boolean }) {
    return http.post('/admin/addUser', {
      // 用户名
      username,
      // 用户头像
      avatar,
      // 用户邮箱
      email,
      // 用户电话
      mobile,
      // 是否禁用
      status,
      // 用户密码
      password
    })
  },
  // 删除用户
  delUser(id: string) {
    return http.post('/admin/delUser', {
      // 用户id
      id
    })
  },
  // 显示用户
  showUser({ id, status }: { id: string, status: boolean }) {
    return http.post('/admin/showUser', {
      // 轮播图id
      id,
      // 是否禁用
      status
    })
  },
  // 修改用户
  updateUser({ id, username, avatar, email, mobile, status }: { id: string, username: string, avatar: string, email: string, mobile: string, status: boolean }) {
    return http.post('/admin/updateUser', {
      id,
      username,
      avatar,
      email,
      mobile,
      status
    })
  },

  // 获取轮播图
  getBanner({ current, pageSize, query }: { current: number, pageSize: number, query: string }) {
    return http.get(`/admin/getBanner?current=${current}&pageSize=${pageSize}&query=${query}`)
  },
  // 新增轮播图
  addBanner({ url, title, link }: { url: string, title: string, link: string }) {
    return http.post('/admin/addBanner', {
      url,
      title,
      link
    })
  },
  // 删除轮播图
  delBanner(id: string) {
    return http.post('/admin/delBanner', {
      id
    })
  },
  // 显示轮播图
  showBanner({ id, isShow }: { id: string, isShow: boolean }) {
    return http.post('/admin/showBanner', {
      id,
      isShow
    })
  },
  // 修改轮播图
  updateBanner({ id, url, title, link }: { id: string, url: string, title: string, link: string }) {
    return http.post('/admin/updateBanner', {
      id,
      url,
      title,
      link
    })
  },
  // 获取通知
  getNotice({ current, pageSize, query }: { current: number, pageSize: number, query: string }) {
    return http.get(`/admin/getNotice?current=${current}&pageSize=${pageSize}&query=${query}`)
  },
  // 新增通知
  addNotice({ content }: { content: string }) {
    return http.post('/admin/addNotice', {
      content
    })
  },
  // 删除通知
  delNotice(id: string) {
    return http.post('/admin/delNotice', {
      id
    })
  },
  // 显示通知
  showNotice({ id, isShow }: { id: string, isShow: boolean }) {
    return http.post('/admin/showNotice', {
      id,
      isShow
    })
  },
  // 修改通知
  updateNotice({ id, content }: { id: string, content: string, }) {
    return http.post('/admin/updateNotice', {
      id,
      content
    })
  },
  // 获取订单
  getOrder() {
    return http.get(`/admin/getOrder`)
  },

  // 获取导航
  getNav({ current, pageSize, query }: { current: number, pageSize: number, query: string }) {
    return http.get(`/admin/getNav?current=${current}&pageSize=${pageSize}&query=${query}`)
  },
  // 新增导航
  addNav({ title, url }: { title: string, url: string }) {
    return http.post('/admin/addNav', {
      title,
      url
    })
  },
  // 删除导航
  delNav(id: string) {
    return http.post('/admin/delNav', {
      id
    })
  },
  // 显示导航
  showNav({ id, isShow }: { id: string, isShow: boolean }) {
    return http.post('/admin/showNav', {
      id,
      isShow
    })
  },
  // 修改导航
  updateNav({ id, url, title }: { id: string, url: string, title: string }) {
    return http.post('/admin/updateNav', {
      id,
      url,
      title
    })
  },


  // 获取导航
  getRecommendNav({ current, pageSize, query }: { current: number, pageSize: number, query: string }) {
    return http.get(`/admin/getIndexNav?current=${current}&pageSize=${pageSize}&query=${query}`)
  },
  // 新增导航
  addRecommendNav({ name, desc, goods }: { name: string, desc: string, goods: any }) {
    return http.post('/admin/addIndexNav', {
      name,
      desc,
      goods
    })
  },
  // 删除导航
  delRecommendNav(id: string) {
    return http.post('/admin/delIndexNav', {
      id
    })
  },
  // 显示导航
  showRecommendNav({ id, isShow }: { id: string, isShow: boolean }) {
    return http.post('/admin/showIndexNav', {
      id,
      isShow
    })
  },
  // 修改导航
  updateRecommendNav({ id, name, desc, goods }: { id: string, name: string, desc: string, goods: any }) {
    return http.post('/admin/updateIndexNav', {
      id,
      name,
      desc,
      goods
    })
  },

  // 添加商品模型
  addModel({ name }: { name: string }) {
    return http.post('/admin/addModel', {
      name
    })
  },
  getModel({ current, pageSize, query }: { current: number, pageSize: number, query: string }) {
    return http.get(`/admin/getModel?current=${current}&pageSize=${pageSize}&query=${query}`)
  },
  delModel(id: string) {
    return http.post('/admin/delModel', {
      id
    })
  },
  // 修改商品模型
  updateModel({ id, name }: { id: string, name: string }) {
    return http.post('/admin/updateModel', {
      id,
      name
    })
  },
  // 获取商品规格
  getSpec({ parentId }: { parentId: string }) {
    return http.post(`/admin/getSpec`, {
      parentId
    })
  },
  // 添加规格
  addSpec({ name, model, spec_item, mode, parentId }: { name: string, model: string, spec_item: string[], mode: string, parentId: string }) {
    return http.post('/admin/addSpec', {
      name,
      model,
      spec_item,
      mode,
      parentId
    })
  },
  // 删除规格
  delSpec({ parentId, attrId }: { parentId: string, attrId: string }) {
    return http.post(`/admin/delSpec`, {
      parentId,
      attrId
    })
  },
  getCategory(query: string) {
    return http.get(`/admin/getCategory?current=1&pageSize=10000&query=${query}`)
  },
  // 添加一级分类
  addCategory({ name, short_name, isShow }: { name: string, short_name?: string, isShow?: boolean }) {
    return http.post('/admin/addCategory', {
      name,
      short_name,
      isShow,
    })
  },
  // 添加二级分类
  addSecondCategory({ name, parentId, isShow }: { name: string, parentId: string, isShow: string }) {
    return http.post('/admin/addSecondCategory', {
      name,
      parentId,
      isShow
    })
  },
  //删除分类
  delCategory(id: string) {
    return http.post('/admin/delCategory', {
      id
    })
  },
  // 分类状态
  showCategory({ id, isShow }: { id: string, isShow: boolean }) {
    return http.post('/admin/showCategory', {
      id,
      isShow
    })
  },
  // 获取商品
  getGoods({ current, pageSize, query }: { current: number, pageSize: number, query: string }) {
    return http.get(`/admin/getGoods?current=${current}&pageSize=${pageSize}&query=${query}`)
  },
  delGoods(id: string) {
    return http.post('/admin/delGoods', {
      id
    })
  },
  // 添加商品
  addGoods({ name, category, pic, video, cover, originalPrice,
    presentPrice, discount, detail, spec, introduction, company,
    stock, isNewGood, isHot, isRecommend, comment, isShow, sellDesc, productionDesc }:
    {
      name: string, category: string, pic?: string[],
      video?: string[], cover: string, originalPrice: string,
      presentPrice: string, discount: string[], detail: string,
      spec: string[], introduction: string, company: string,
      stock: string, isNewGood: boolean, isHot: boolean,
      isRecommend: boolean, comment: string[], isShow: boolean,
      sellDesc: string[], productionDesc: string[]
    }) {
    return http.post('/admin/addGoods', {
      // 商品名称
      name,
      // 商品分类
      category,
      // 商品图片
      pic,
      // 商品视频
      video,
      // 是否新品
      isHot,
      // 是否推荐
      isRecommend,
      // 封面图
      cover,
      // 原价
      originalPrice,
      // 现价
      presentPrice,
      // 优惠
      discount,
      // 商品详情
      detail,
      // 商品规格
      spec,
      // 商品简介
      introduction,
      // 商品单位
      company,
      // 商品库存
      stock,
      // 是否新品
      isNewGood,
      // 商品评价
      comment,
      // 是否显示
      isShow,
      // 推荐介绍
      sellDesc,
      // 产品介绍
      productionDesc
    })
  },
  // 获取
  getParams({ parentId }: { parentId: string }) {
    return http.post(`/admin/getParams`, {
      parentId
    })
  },
  // 新增商品参数
  addParams({ parentId, url, name, desc }: { parentId: string, url: string, name: string, desc: string }) {
    return http.post('/admin/addParams', {
      parentId,
      url,
      name,
      desc
    })
  },
  // 删除商品参数
  delParams({ parentId, attrId }: { parentId: string, attrId: string }) {
    return http.post('/admin/delParams', {
      parentId,
      attrId,
    })
  },
  // 修改商品参数
  updateParams({ parentId, id, url, name, desc }: { parentId: string, id: string, url: string, name: string, desc: string }) {
    return http.post('/admin/updateParams', {
      parentId,
      id,
      url,
      name,
      desc
    })
  },
  // 获取
  getSpecParams({ parentId }: { parentId: string }) {
    return http.post(`/admin/getSpecParams`, {
      parentId
    })
  },
  // 新增商品规格参数
  addSpecParams({ parentId, specParams }: { parentId: string, specParams: string, }) {
    return http.post('/admin/addSpecParams', {
      parentId,
      specParams
    })
  },
  // 删除商品参数
  delSpecParams({ parentId, attrId }: { parentId: string, attrId: string }) {
    return http.post('/admin/delSpecParams', {
      parentId,
      attrId,
    })
  },
  // 修改商品参数
  updateSpecParams({ id, specParams }: { id: string, specParams: string }) {
    return http.post('/admin/updateSpecParams', {
      id,
      specParams
    })
  },

  // 获取秒杀
  getSeckill({ current, pageSize, query }: { current: number, pageSize: number, query: string }) {
    return http.get(`/admin/getSeckill?current=${current}&pageSize=${pageSize}&query=${query}`)
  },
  // 添加秒杀
  addSeckill({ start_time, end_time, goods_number, price, goods, isShow, id }:
    {
      price: string, start_time: string, end_time: string,
      goods_number: string, goods: any, isShow: boolean, id: string
    }) {
    return http.post('/admin/addSeckill', {
      start_time,
      end_time,
      goods_number,
      goods,
      isShow,
      price,
    })
  },
  // 删除秒杀
  delSeckill({ id, goodsId }: { id: string, goodsId: string }) {
    return http.post('/admin/delSeckill', {
      id,
      goodsId,
    })
  },
  // 显示秒杀
  showSeckill({ id, isShow }: { id: string, isShow: boolean }) {
    return http.post('/admin/showSeckill', {
      id,
      isShow
    })
  },
  // 修改秒杀
  updateSeckill({ start_time, end_time, goods_number, goods, isShow }: { start_time: string, end_time: string, goods_number: string, goods: string, isShow: boolean }) {
    return http.post('/admin/updateSeckill', {
      // 开始时间
      start_time,
      // 结束时间
      end_time,
      // 秒杀数量
      goods_number,
      // 秒杀商品
      goods,
      // 是否显示
      isShow
    })
  },
  // 获取优惠券
  getCoupon({ current, pageSize, query }: { current: number, pageSize: number, query: string }) {
    return http.get(`/admin/getCoupon?current=${current}&pageSize=${pageSize}&query=${query}`)
  },
  addCoupon({ name, amount, threshold, start_time, end_time, number, isShow }: { name: string, amount: string, threshold: string, start_time: string, end_time: string, number: string, isShow: boolean }) {
    return http.post('/admin/addCoupon', {
      // 优惠券名称
      name,
      // 优惠券数量
      amount,
      // 优惠内容
      threshold,
      // 开始时间
      start_time,
      // 结束时间
      end_time,
      // 优惠券数量
      number,
      // 是否显示
      isShow
    })
  },
  delCoupon(id: string) {
    return http.post('/admin/delCoupon', {
      id
    })
  },
  showCoupon({ id, isShow }: { id: string, isShow: boolean }) {
    return http.post('/admin/showCoupon', {
      id,
      isShow
    })
  },
  updateCoupon({ name, amount, threshold, start_time, end_time, number, id }:
    { name: string, amount: number, threshold: number, start_time: string, end_time: string, number: number, id: string }) {
    return http.post('/admin/updateCoupon', {
      // 优惠券名称
      name,
      // 优惠券金额
      amount,
      // 使用门槛
      threshold,
      // 开始时间
      start_time,
      // 结束时间
      end_time,
      // 优惠券数量
      number,
      id
    })
  }
}
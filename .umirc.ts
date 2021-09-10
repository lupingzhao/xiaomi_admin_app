import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/Login',
      component: '@/pages/login/Login',
      title: '登陆'
    },
    {
      path: '/',
      component: '@/pages/layouts/Layouts',
      routes: [
        {
          path: '/',
          component: '@/pages/index',
          title: '首页',
        },
        {
          path: '/Classification',
          component: '@/pages/classification/Classification',
          title: '分类',
        },
        {
          path: '/Navigation',
          component: '@/pages/navigation/Navigation',
          title: '导航管理',
        },
        {
          path: '/Order',
          component: '@/pages/order/Order',
          title: '订单管理',
        },
        {
          path: '/Specifications',
          component: '@/pages/specifications/Specifications',
          title: '规格参数',
        },
        {
          path: '/CustomerService',
          component: '@/pages/customerService/CustomerService',
          title: '客服服务',
        },
        {
          path: '/Carousel',
          component: '@/pages/carousel/Carousel',
          title: '轮播图管理',
        },
        {
          path: '/Seckill',
          component: '@/pages/seckill/Seckill',
          title: '秒杀管理',
        },
        {
          path: '/ProductParameter',
          component: '@/pages/productParameter/ProductParameter',
          title: '商品参数',
        },
        {
          path: '/productSpecifications',
          component: '@/pages/productSpecifications/productSpecifications',
          title: '商品规格',
        },
        {
          path: '/GoodsModel',
          component: '@/pages/goodsModel/GoodsModel',
          title: '商品模型',
        },
        {
          path: '/AddGoods',
          component: '@/pages/addGoods/AddGoods',
          title: '添加商品',
        },
        {
          path: '/Notice',
          component: '@/pages/notice/Notice',
          title: '通知管理',
        },
        {
          path: '/RecommendNav',
          component: '@/pages/recommendNav/RecommendNav',
          title: '推荐导航',
        },
        {
          path: '/user',
          component: '@/pages/user/User',
          title: '用户管理',
        },
        {
          path: '/Coupon',
          component: '@/pages/coupon/Coupon',
          title: '优惠券管理',
        },

      ]
    },
  ],
  fastRefresh: {},
  locale: {
    default: 'zh-CN'
  }
});

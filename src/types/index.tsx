import {
  PictureOutlined,
  HomeOutlined,
  BarsOutlined,
  ReconciliationOutlined,
  UserOutlined,
  TableOutlined,
  FileAddOutlined,
  DatabaseOutlined,
  AlignCenterOutlined,
  FileOutlined,
  ApartmentOutlined,
  PartitionOutlined,
  FieldTimeOutlined,
  AccountBookOutlined,
  NotificationOutlined,
  MessageOutlined
} from '@ant-design/icons';

interface Icons {
  icon: any
  name: string,
  child?: Icons[],
  path?: string,
  t?: string
}
export const iconsNav: Icons[] = [
  {
    icon: HomeOutlined,
    name: '首页',
    child: [],
    t: 'home page',
    path: '/'
  },
  {
    icon: PictureOutlined,
    name: '轮播图管理',
    child: [],
    path: '/Carousel',
    t: 'Carousel map management',
  },
  {
    icon: BarsOutlined,
    name: '导航管理',
    child: [],
    path: '/Navigation',
    t: 'Navigation management',
  },
  {
    icon: ReconciliationOutlined,
    name: '推荐导航',
    child: [],
    path: '/RecommendNav',
    t: 'Recommended navigation',
  },
  {
    icon: UserOutlined,
    name: '用户管理',
    child: [],
    path: '/user',
    t: 'user management',
  },
  {
    icon: TableOutlined,
    name: '商品管理',
    t: 'Commodity management',
    child: [
      {
        icon: FileAddOutlined,
        name: '添加商品',
        path: '/AddGoods',
        t: 'Add goods',
      },
      {
        icon: DatabaseOutlined,
        name: '商品分类',
        t: 'Commodity classification',
        path: '/Classification'
      },
      {
        icon: AlignCenterOutlined,
        name: '商品模型',
        t: 'Commodity model',
        path: '/GoodsModel',
      },
      {
        icon: FileOutlined,
        name: '商品规格',
        t: 'Commodity specifications',
        path: '/productSpecifications'
      },
      {
        icon: ApartmentOutlined,
        name: '商品参数',
        t: 'Commodity parameters',
        path: '/ProductParameter',
      },
      {
        icon: PartitionOutlined,
        name: '规格参数',
        t: 'Specification parameters',
        path: '/Specifications'
      },
    ]
  },
  {
    icon: FieldTimeOutlined,
    name: '秒杀管理',
    child: [],
    t: 'Second kill management',
    path: '/Seckill',
  },
  {
    icon: AccountBookOutlined,
    name: '优惠卷管理',
    child: [],
    t: 'Coupon management',
    path: '/Coupon'
  },
  {
    icon: BarsOutlined,
    name: '订单管理',
    t: 'Order management',
    child: [],
    path: '/Order',
  },
  {
    icon: NotificationOutlined,
    name: '通知管理',
    t: 'Notification management',
    child: [],
    path: '/Notice',
  },
  {
    icon: MessageOutlined,
    name: '客服服务',
    t: 'Customer service',
    child: [],
    path: '/CustomerService',
  },
]
// 导航栏
export interface navList {
  isShow: boolean
  title: string
  url: string
  _id: string
}
// 通知
export interface Notices {
  content: string
  isShow: boolean
  _id: string
}
// 优惠券
export interface Coupon {
  amount: string
  end_time: string
  isShow: boolean
  name: string
  number: string
  start_time: string
  threshold: string
  _id: string
}
// 秒杀
export interface Seckill {
  end_time: string
  goods: string
  goods_number: string
  isShow: false
  price: string
  start_time: string
  _id: string
}
// 用户
export interface User {
  avatar: string
  email: string
  mobile: string
  regiter_time: string
  status: boolean
  username: string
  _id: string
}
// 推荐
export interface RecommendNav {
  avatar: string
  email: string
  mobile: string
  regiter_time: string
  status: boolean
  username: string
  _id: string
}
// 模型
export interface GoodsModel {
  attribute: any
  name: string
  specifications: any
  _id: string
}
// 规格
export interface Spec {
  mode: string
  model: string[]
  name: string
  parentId: string[]
  spec_item: any
  _id: string
  checklist: string[]
  specitem: string[]
}
// 商品参数
export interface Params {

}
// 商品
export interface Goods {
  category: string
  comment: string[]
  company: string
  cover: string
  create_time: string
  detail: string
  discount: string[]
  introduction: string
  isHot: true
  isNewGood: true
  isRecommend: true
  isShow: true
  name: string
  originalPrice: string
  params: Params[]
  pic: string[]
  presentPrice: string
  productionDesc: string[]
  sellDesc: string[]
  spec: string[]
  specParams: string
  stock: string
  video: string[]
  _id: string
}
// 规格参数
export interface SpecParams {

}
// 分类
export interface Category {
  isShow: boolean
  list: any
  name: string
  short_name: string
  _id: string
}

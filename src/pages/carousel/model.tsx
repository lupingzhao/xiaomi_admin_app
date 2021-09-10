import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
interface List {
  isShow: boolean
  link: string
  title: string
  url: string
  _id: string
}
// 定义state的数据
export interface CarouselModelState {
  list: List[],
  add: any,
  total: number
}

export interface CarouselModelType {
  namespace: 'Carousel'
  state: CarouselModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getBanners: Effect,
    getAdd: Effect,
    getshow: Effect,
    getEdit: Effect,
    del: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setList: Reducer<CarouselModelState>,
    setAdd: Reducer<CarouselModelState>,
  }
}

const CarouselModel: CarouselModelType = {
  namespace: 'Carousel',
  state: {
    list: [],
    add: '',
    total: 0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getBanners({ payload }, { call, put }) {
      let res = yield call(api.getBanner, payload)
      // console.log(res)
      if (res.code === 200) {
        yield put({
          type: 'setList',
          payload: res
        })
      }
    },
    *getAdd({ payload }, { call, put }) {
      let res = yield call(api.addBanner, payload)
      // console.log(res)
      if (res.code === 200) {
        yield put({
          type: 'setAdd',
          payload: res.data
        })
        yield put({
          type: 'getBanners',
          payload: { current: 1, pageSize: 5, query: '' }
        })
        message.success(res.msg)
      } else message.error(res.msg)

    },
    *getshow({ payload }, { call, put }) {
      let res = yield call(api.showBanner, payload)
      // console.log(res)
      if (res.code === 200) {
        message.success(res.msg)
      } else message.error(res.msg)

    },
    *getEdit({ payload }, { call, put }) {
      let res = yield call(api.updateBanner, payload)
      // console.log(res)
      if (res.code === 200) {
        message.success(res.msg)
      } else message.error(res.msg)

    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delBanner, payload)
      // console.log(res)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'getBanners',
          payload: { current: 1, pageSize: 10, query: '' }
        })
      } else message.error(res.msg)

    }
  },
  reducers: {
    setList(state, action) {
      // console.log(action.payload)
      return {
        add: state!.add,
        list: action.payload.data,
        total: action.payload.total
      }
    },
    setAdd(state, action) {
      return {
        list: state!.list,
        total: state!.total,
        add: action.payload,
      }
    }
  }
}

export default CarouselModel
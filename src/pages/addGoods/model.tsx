import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { Goods } from '@/types'
// 定义state的数据
export interface GoodsModelState {
  Goodss: Goods[],
  total: number
}

export interface GoodsModelType {
  namespace: 'Goods'
  state: GoodsModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    Goods: Effect,
    add: Effect,
    del: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setGoodss: Reducer<GoodsModelState>
  }
}

const LoginModel: GoodsModelType = {
  namespace: 'Goods',
  state: {
    Goodss: [],
    total: 0
  },

  effects: {
    // *等同于async
    // payload请求传递的参数
    *Goods({ payload }, { call, put }) {
      let res = yield call(api.getGoods, payload)
      // console.log(res)
      if (res.code === 200) {
        yield put({
          type: 'setGoodss',
          payload: res
        })
      } else message.error(res.msg)
    },
    *add({ payload }, { call, put }) {
      let res = yield call(api.addGoods, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Goods',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delGoods, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Goods',
          payload: payload.update
        })
      } else message.error(res.msg)
    },

  },
  reducers: {
    setGoodss(state, action) {
      return {
        ...state,
        Goodss: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default LoginModel
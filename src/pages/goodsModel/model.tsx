
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { GoodsModel } from '@/types'
// 定义state的数据
export interface GoodsModelModelState {
  GoodsModels: GoodsModel[],
  total: number
}

export interface GoodsModelModelType {
  namespace: 'GoodsModel'
  state: GoodsModelModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    GoodsModel: Effect,
    add: Effect,
    del: Effect,
    edit: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    setGoodsModels: Reducer<GoodsModelModelState>
  }
}

const LoginModel: GoodsModelModelType = {
  namespace: 'GoodsModel',
  state: {
    GoodsModels: [],
    total: 0
  },

  effects: {
    // *等同于async
    // payload请求传递的参数
    *GoodsModel({ payload }, { call, put }) {
      let res = yield call(api.getModel, payload)
      // console.log(res)
      if (res.code === 200) {
        yield put({
          type: 'setGoodsModels',
          payload: res
        })
      } else message.error(res.msg)
    },
    *add({ payload }, { call, put }) {
      let res = yield call(api.addModel, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'GoodsModel',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delModel, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'GoodsModel',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *edit({ payload }, { call, put }) {
      let res = yield call(api.updateModel, payload.edit)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'GoodsModel',
          payload: payload.update
        })
      } else message.error(res.msg)
    }
  },
  reducers: {
    setGoodsModels(state, action) {
      return {
        ...state,
        GoodsModels: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default LoginModel
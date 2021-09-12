
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { Params, Goods } from '@/types'
// 定义state的数据
export interface ParamsModelState {
  Paramss: Params[],
  total: number,
  goods: Goods[]
}

export interface ParamsModelType {
  namespace: 'Params'
  state: ParamsModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    Params: Effect,
    add: Effect,
    del: Effect,
    edit: Effect,
    goods: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setParamss: Reducer<ParamsModelState>,
    setgoods: Reducer<ParamsModelState>,
  }
}

const LoginModel: ParamsModelType = {
  namespace: 'Params',
  state: {
    Paramss: [],
    total: 0,
    goods: []
  },

  effects: {
    // *等同于async
    // payload请求传递的参数
    *Params({ payload }, { call, put }) {
      let res = yield call(api.getParams, payload)
      if (res.code === 200) {
        yield put({
          type: 'setParamss',
          payload: res
        })
      } else message.error(res.msg)
    },
    *add({ payload }, { call, put }) {
      let res = yield call(api.addParams, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Params',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delParams, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Params',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *edit({ payload }, { call, put }) {
      let res = yield call(api.updateParams, payload.edit)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Params',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *goods({ payload }, { call, put }) {
      let res = yield call(api.getGoods, payload)
      if (res.code === 200) {
        yield put({
          type: 'setgoods',
          payload: res.data
        })

      } else message.error(res.msg)
    },
  },
  reducers: {
    setParamss(state, action) {
      return {
        ...state,
        Paramss: action.payload.data,
        total: action.payload.total,
        goods: state!.goods
      }
    },
    setgoods(state, action) {
      return {
        ...state,
        Paramss: [],
        total: state!.total,
        goods: action.payload
      }
    }
  }
}

export default LoginModel
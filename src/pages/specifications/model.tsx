
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { SpecParams } from '@/types'
// 定义state的数据
export interface SpecParamsModelState {
  SpecParamss: any[],
  total: number
}

export interface SpecParamsModelType {
  namespace: 'SpecParams'
  state: SpecParamsModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    SpecParams: Effect,
    add: Effect,
    del: Effect,
    edit: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setSpecParamss: Reducer<SpecParamsModelState>
  }
}

const LoginModel: SpecParamsModelType = {
  namespace: 'SpecParams',
  state: {
    SpecParamss: [],
    total: 0
  },

  effects: {
    // *等同于async
    // payload请求传递的参数
    *SpecParams({ payload }, { call, put }) {
      let res = yield call(api.getSpecParams, payload)
      // console.log(res)
      if (res.code === 200) {
        yield put({
          type: 'setSpecParamss',
          payload: res
        })
      } else message.error(res.msg)
    },
    *add({ payload }, { call, put }) {
      let res = yield call(api.addSpecParams, payload)
      if (res.code === 200) {
        message.success(res.msg)
        window.location.pathname = '/AddGoods'
      } else message.error(res.msg)
    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delSpecParams, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'SpecParams',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *edit({ payload }, { call, put }) {
      let res = yield call(api.updateSpecParams, payload.edit)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'SpecParams',
          payload: payload.update
        })
      } else message.error(res.msg)
    },

  },
  reducers: {
    setSpecParamss(state, action) {
      return {
        ...state,
        SpecParamss: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default LoginModel
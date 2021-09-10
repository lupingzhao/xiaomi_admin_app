
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { Spec } from '@/types'
// 定义state的数据
export interface SpecModelState {
  Specs: Spec[],
  total: number
}

export interface SpecModelType {
  namespace: 'Spec'
  state: SpecModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    Spec: Effect,
    add: Effect,
    del: Effect,
    reset: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setSpecs: Reducer<SpecModelState>
  }
}

const LoginModel: SpecModelType = {
  namespace: 'Spec',
  state: {
    Specs: [],
    total: 0
  },

  effects: {
    // *等同于async
    // payload请求传递的参数
    *Spec({ payload }, { call, put }) {
      let res = yield call(api.getSpec, payload)
      // console.log(res);
      res.data.map((item: Spec) => {
        item.checklist = []
        item.specitem = item.spec_item.split('\n')
      })
      if (res.code === 200) {
        yield put({
          type: 'setSpecs',
          payload: res
        })
      } else message.error(res.msg)
    },
    *add({ payload }, { call, put }) {
      let res = yield call(api.addSpec, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Spec',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delSpec, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Spec',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    // 重置
    *reset({ payload }, { call, put }) {
      yield put({
        type: 'setSpecs',
        payload: { data: [], total: 0 }
      })
    }
  },
  reducers: {
    setSpecs(state, action) {
      return {
        ...state,
        Specs: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default LoginModel
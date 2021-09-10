
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { Seckill } from '@/types'
// 定义state的数据
export interface SeckillModelState {
  seckills: Seckill[],
  total: number
}

export interface SeckillModelType {
  namespace: 'Seckill'
  state: SeckillModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    Seckill: Effect,
    add: Effect,
    del: Effect,
    edit: Effect,
    show: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setSeckills: Reducer<SeckillModelState>
  }
}

const LoginModel: SeckillModelType = {
  namespace: 'Seckill',
  state: {
    seckills: [],
    total: 0
  },

  effects: {
    // *等同于async
    // payload请求传递的参数
    *Seckill({ payload }, { call, put }) {
      let res = yield call(api.getSeckill, payload)
      // console.log(res);
      if (res.code === 200) {
        yield put({
          type: 'setSeckills',
          payload: res
        })
      } else message.error(res.msg)
    },
    *add({ payload }, { call, put }) {
      let res = yield call(api.addSeckill, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Seckill',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delSeckill, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Seckill',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *edit({ payload }, { call, put }) {
      let res = yield call(api.updateSeckill, payload.edit)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Seckill',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *show({ payload }, { call, put }) {
      let res = yield call(api.showSeckill, payload.show)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Seckill',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
  },
  reducers: {
    setSeckills(state, action) {
      return {
        ...state,
        seckills: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default LoginModel
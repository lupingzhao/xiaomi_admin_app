
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { RecommendNav } from '@/types'
// 定义state的数据
export interface RecommendNavModelState {
  RecommendNavs: RecommendNav[],
  total: number
}

export interface RecommendNavModelType {
  namespace: 'RecommendNav'
  state: RecommendNavModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    RecommendNav: Effect,
    add: Effect,
    del: Effect,
    edit: Effect,
    show: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setRecommendNavs: Reducer<RecommendNavModelState>
  }
}

const LoginModel: RecommendNavModelType = {
  namespace: 'RecommendNav',
  state: {
    RecommendNavs: [],
    total: 0
  },

  effects: {
    // *等同于async
    // payload请求传递的参数
    *RecommendNav({ payload }, { call, put }) {
      let res = yield call(api.getRecommendNav, payload)
      // console.log(res)
      if (res.code === 200) {
        yield put({
          type: 'setRecommendNavs',
          payload: res
        })
      } else message.error(res.msg)
    },
    *add({ payload }, { call, put }) {
      let res = yield call(api.addRecommendNav, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'RecommendNav',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delRecommendNav, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'RecommendNav',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *edit({ payload }, { call, put }) {
      let res = yield call(api.updateRecommendNav, payload.edit)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'RecommendNav',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *show({ payload }, { call, put }) {
      let res = yield call(api.showRecommendNav, payload.show)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'RecommendNav',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
  },
  reducers: {
    setRecommendNavs(state, action) {
      return {
        ...state,
        RecommendNavs: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default LoginModel
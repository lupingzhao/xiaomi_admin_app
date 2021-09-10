import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd';
import { navList } from '@/types/index'
// 定义state的数据
export interface DetailModelState {
  navs: navList[],
  total: number
}

export interface DetailModelType {
  namespace: 'Navigation'
  state: DetailModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getNav: Effect,
    getaddNav: Effect,
    isShow: Effect,
    edit: Effect,
    del: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setNavs: Reducer<DetailModelState>
  }
}

const Navigation: DetailModelType = {
  namespace: 'Navigation',
  state: {
    navs: [],
    total: 0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    //  addNav({ title, url }
    *getNav({ payload }, { call, put }) {
      let res = yield call(api.getNav, payload)
      // console.log(res)
      if (res.code === 200) {
        yield put({
          type: 'setNavs',
          payload: res
        })
      }
    },
    *getaddNav({ payload }, { call, put }) {
      let res = yield call(api.addNav, payload)
      if (res.code === 200) {
        message.success(res.msg)
        // 重新请求列表数据
        yield put({
          type: 'getNav',
          payload: { current: 1, pageSize: 5, query: '' }
        })
      } else message.error(res.msg)
    },
    *isShow({ payload }, { call, put }) {
      let res = yield call(api.showNav, payload)
      // console.log(res)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'getNav',
          payload: { current: 1, pageSize: 5, query: '' }
        })
      } else message.error(res.msg)
    },
    // updateNav({ id, url, title }
    *edit({ payload }, { call, put }) {
      let res = yield call(api.updateNav, payload)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'getNav',
          payload: { current: 1, pageSize: 5, query: '' }
        })
      } else message.error(res.msg)
    },
    // updateNav({ id, url, title }
    *del({ payload }, { call, put }) {
      let res = yield call(api.delNav, payload)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'getNav',
          payload: { current: 1, pageSize: 5, query: '' }
        })
      } else message.error(res.msg)
    },

  },
  reducers: {
    setNavs(state, action) {
      return {
        ...state,
        navs: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default Navigation
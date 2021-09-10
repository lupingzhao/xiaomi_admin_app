import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { Notices } from '@/types'
// 定义state的数据
export interface NoticeModelState {
  notices: Notices[],
  total: number
}

export interface NoticeModelType {
  namespace: 'Notice'
  state: NoticeModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    notice: Effect,
    addNotice: Effect,
    editNotice: Effect,
    delNotices: Effect,
    isShowNotices: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setNotices: Reducer<NoticeModelState>
  }
}

const NoticeModel: NoticeModelType = {
  namespace: 'Notice',
  state: {
    notices: [],
    total: 0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *notice({ payload }, { call, put }) {
      let res = yield call(api.getNotice, payload)
      if (res.code === 200) {
        // message.success(res.msg)
        yield put({
          type: 'setNotices',
          payload: res
        })
      }
    },
    *addNotice({ payload }, { call, put }) {
      let res = yield call(api.addNotice, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'notice',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *editNotice({ payload }, { call, put }) {
      let res = yield call(api.updateNotice, payload.edit)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'notice',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *delNotices({ payload }, { call, put }) {
      let res = yield call(api.delNotice, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'notice',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *isShowNotices({ payload }, { call, put }) {
      let res = yield call(api.showNotice, payload.isShow)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'notice',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
  },
  reducers: {
    setNotices(state, action) {
      return {
        ...state,
        notices: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default NoticeModel

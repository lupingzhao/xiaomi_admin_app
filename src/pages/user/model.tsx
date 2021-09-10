
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { User } from '@/types'
// 定义state的数据
export interface UserModelState {
  Users: User[],
  total: number
}

export interface UserModelType {
  namespace: 'User'
  state: UserModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    User: Effect,
    add: Effect,
    del: Effect,
    edit: Effect,
    show: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setUsers: Reducer<UserModelState>
  }
}

const LoginModel: UserModelType = {
  namespace: 'User',
  state: {
    Users: [],
    total: 0
  },

  effects: {
    // *等同于async
    // payload请求传递的参数
    *User({ payload }, { call, put }) {
      let res = yield call(api.getUser, payload)
      // console.log(res);
      if (res.code === 200) {
        yield put({
          type: 'setUsers',
          payload: res
        })
      } else message.error(res.msg)
    },
    *add({ payload }, { call, put }) {
      let res = yield call(api.addUser, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'User',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delUser, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'User',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *edit({ payload }, { call, put }) {
      let res = yield call(api.updateUser, payload.edit)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'User',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *show({ payload }, { call, put }) {
      let res = yield call(api.showUser, payload.show)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'User',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
  },
  reducers: {
    setUsers(state, action) {
      return {
        ...state,
        Users: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default LoginModel
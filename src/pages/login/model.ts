
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
// 定义state的数据
export interface DetailModelState {
  userInfo: string,
}

export interface DetailModelType {
  namespace: 'Login'
  state: DetailModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getLogin: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setUserInfo: Reducer<DetailModelState>
  }
}

const LoginModel: DetailModelType = {
  namespace: 'Login',
  state: {
    userInfo: '',
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getLogin({ payload }, { call, put }) {
      let res = yield call(api.login, payload)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'setUserInfo',
          payload: res.data
        })
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('token', res.token)
        window.location.href = '/'
      }
    },
  },
  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      }
    },
  }
}

export default LoginModel
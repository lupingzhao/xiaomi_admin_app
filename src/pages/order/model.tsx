
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
// 定义state的数据
export interface OrderModelState {
  orders: [],
  total: number
}

export interface OrderModelType {
  namespace: 'Order'
  state: OrderModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    order: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setOrder: Reducer<OrderModelState>
  }
}

const LoginModel: OrderModelType = {
  namespace: 'Order',
  state: {
    orders: [],
    total: 0
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *order({ payload }, { call, put }) {
      let res = yield call(api.getOrder)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'setOrder',
          payload: res
        })
      }
    },
  },
  reducers: {
    setOrder(state, action) {
      return {
        ...state,
        orders: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default LoginModel
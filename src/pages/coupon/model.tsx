
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { Coupon } from '@/types'
// 定义state的数据
export interface CouponModelState {
  coupons: Coupon[],
  total: number
}

export interface CouponModelType {
  namespace: 'Coupon'
  state: CouponModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    Coupon: Effect,
    add: Effect,
    del: Effect,
    edit: Effect,
    show: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setCoupon: Reducer<CouponModelState>
  }
}

const LoginModel: CouponModelType = {
  namespace: 'Coupon',
  state: {
    coupons: [],
    total: 0
  },

  effects: {
    // *等同于async
    // payload请求传递的参数
    *Coupon({ payload }, { call, put }) {
      let res = yield call(api.getCoupon, payload)
      if (res.code === 200) {
        yield put({
          type: 'setCoupon',
          payload: res
        })
      } else message.error(res.msg)
    },
    *add({ payload }, { call, put }) {
      let res = yield call(api.addCoupon, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Coupon',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delCoupon, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Coupon',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *edit({ payload }, { call, put }) {
      let res = yield call(api.updateCoupon, payload.edit)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Coupon',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *show({ payload }, { call, put }) {
      let res = yield call(api.showCoupon, payload.show)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Coupon',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
  },
  reducers: {
    setCoupon(state, action) {
      return {
        ...state,
        coupons: action.payload.data,
        total: action.payload.total
      }
    },
  }
}

export default LoginModel
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
// 定义state的数据
export interface IndexModelState {
  indexData: any,
  cateData: any
}

export interface IndexModelType {
  namespace: 'Index'
  state: IndexModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getIndex: Effect,
    getCate: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setIndexData: Reducer<IndexModelState>,
    setCateData: Reducer<IndexModelState>
  }
}

const LoginModel: IndexModelType = {
  namespace: 'Index',
  state: {
    indexData: '',
    cateData: ''
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getIndex({ payload }, { call, put }) {
      let res = yield call(api.getIndex)

      if (res.code === 200) {
        yield put({
          type: 'setIndexData',
          payload: res.data
        })
      }
    },
    *getCate({ payload }, { call, put }) {
      let res = yield call(api.getCategory, payload)
      let data = [] as any
      res.data.map((item: any) => {
        data.push({ value: item.list.length, name: item.name },)
      })
      if (res.code === 200) {
        yield put({
          type: 'setCateData',
          payload: data
        })
      }
    },

  },
  reducers: {
    setIndexData(state, action) {
      return {
        cateData: state!.indexData,
        indexData: action.payload,
      }
    },
    setCateData(state, action) {
      return {
        cateData: action.payload,
        indexData: state!.indexData,
      }
    }
  }
}

export default LoginModel
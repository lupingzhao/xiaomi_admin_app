
import { Effect, Reducer } from 'umi'
import api from '@/http/api'
import { message } from 'antd'
import { Category } from '@/types'
// 定义state的数据
export interface CategoryModelState {
  Categorys: Category[],
}
export interface CategoryModelType {
  namespace: 'Category'
  state: CategoryModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    Category: Effect,
    add: Effect,
    addSecond: Effect,
    del: Effect,
    show: Effect,
  },
  // 等同于vuex里面的mutation
  reducers: {
    setCategorys: Reducer<CategoryModelState>
  }
}

const LoginModel: CategoryModelType = {
  namespace: 'Category',
  state: {
    Categorys: [],
  },

  effects: {
    // *等同于async
    // payload请求传递的参数
    *Category({ payload }, { call, put }) {
      let res = yield call(api.getCategory, payload.res)
      let data = [] as any
      res.data.map((item: any, index: number) => {
        data.push({
          title: item.name,
          key: item._id,
          children: [],
          isShow: item.isShow,
          disabled: false
        })
        item.list.map((item1: any, index1: number) => {
          data[index].children.push({
            title: item1.name,
            key: item1._id,
            isLeaf: true
          })
        })
      })
      if (payload.isadd) {
        data.map((a: any) => {
          if (a.children.length) {
            a.disabled = false
          } else a.disabled = true
        })
      }
      // console.log(data);
      if (res.code === 200) {
        yield put({
          type: 'setCategorys',
          payload: data
        })
      } else message.error(res.msg)
    },
    *add({ payload }, { call, put }) {
      let res = yield call(api.addCategory, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Category',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *addSecond({ payload }, { call, put }) {
      let res = yield call(api.addSecondCategory, payload.add)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Category',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *del({ payload }, { call, put }) {
      let res = yield call(api.delCategory, payload.del)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Category',
          payload: payload.update
        })
      } else message.error(res.msg)
    },
    *show({ payload }, { call, put }) {
      let res = yield call(api.showCategory, payload.show)
      if (res.code === 200) {
        message.success(res.msg)
        yield put({
          type: 'Category',
          payload: payload.update
        })
      } else message.error(res.msg)
    },



  },
  reducers: {
    setCategorys(state, action) {
      return {
        ...state,
        Categorys: action.payload,
      }
    },
  }
}

export default LoginModel
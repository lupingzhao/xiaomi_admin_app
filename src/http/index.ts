import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { message } from 'antd'
import { history } from 'umi';

const http = axios.create({
  // 基础路径
  baseURL: 'http://localhost:7001',
  timeout: 10000
})


// 请求拦截
// 每一次发请求前做的事情
http.interceptors.request.use((config: AxiosRequestConfig) => {
  // 验证用户身份 
  // token: 令牌
  // 在登录成功之后后端签发令牌
  // 每一次发请求的时候 加上这个令牌
  const token = localStorage.getItem('token')
  if (token) {
    // headers属性是后端约定的
    config.headers['Authorization'] = token
  }
  return config
}, (err: AxiosError) => {
  return Promise.reject(err)
})


// 响应拦截
// 响应拦截每一次请求结束做的事情
http.interceptors.response.use((res: any) => {
  return res.data
}, (err: AxiosError) => {
  const status: number = err.response! && err.response.status
  if (status === 401) {
    // token是有过期时间的
    // 登录过期
    // 跳转到登录页
    localStorage.clear()
    history.push('/Login');
  }
  if (status === 400) {
    message.error('参数错误')
  }
  if (status === 401) {
    message.error('登录过期')
  }
  if (status === 403) {
    message.error('没有全选')
  }
  if (status === 404) {
    message.error('路径错误')
  }
  if (status === 500) {
    message.error('服务器错误')
  }
  if (status === 503) {
    message.error('服务器维护')
  }
  return Promise.reject(err)

})


export default http
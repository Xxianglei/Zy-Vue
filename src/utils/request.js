import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 创建一个axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    //如果在vuex里面有token
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation请根据实际情况修改
      // config.headers['tokens'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2Zsb3dJZCI6ImVlMTZlNTRkLTRjYTQtNDRiZi05Y2VjLWQyNTViYzg5N2IzMSIsImlzcyI6Imlzc3VlciIsImV4cCI6MTU3NTgwNTcwNywiaWF0IjoxNTc1ODAzOTA3fQ.qvNjpJmc487VRy8EfTQxuW5dCyfO92xjwez7EJYRsrg"
      // config.headers['tokens']=getToken()
      config.headers['tokens']=localStorage.getItem('ACCESS_TOKEN')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 如果您想获得http信息，如头信息或状态信息
   * Please return  response => response
  */

  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过HTTP状态码来判断状态
   */

  response => {
    const res = response.data

    // 如果自定义代码不是200，则判断为错误。
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }else {
      return res
    }
  },
  error => {
    if(error.response.status===401){
      alert('请重新登陆')
      localStorage.removeItem('ACCESS_TOKEN')
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    }
    console.log('err' + error) // for debug
    console.log(error.response.status)
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error.response.status)
    // 如果授权码失效，去登陆
    // alert('请重新登陆')
    // console.log('请重新登陆')
    // localStorage.removeItem('ACCESS_TOKEN')
    
    // store.dispatch('user/resetToken').then(() => {
    //   location.reload()
    // })
  }
)

export default service

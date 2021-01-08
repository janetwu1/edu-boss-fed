/**
 * 用户相关请求模块
 */

import request from '@/utils/request'
import qs from 'qs'
// import store from '@/store'

interface User {
    phone: string;
    password: string;
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: '/front/user/login',
    // 如果data 是普通对象，则Content-Type是是application/json
    // 如果data是qs.stringify转换之后的数据：key=value&key=value,则Contnent-type会被设置为application/x-www-form-urlencoded
    // 如果data是FormData对象，则Content-Type是mutiipart/form-data
    data: qs.stringify(data)// axios默认发送的是application/json格式的函数
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
    // headers: {
    //   Authorization: store.state.user.access_token
    // }
  })
}

// 获取用户菜单和资源权限列表
export const getUserPermissions = () => {
  return request({
    method: 'GET',
    url: '/boss/permission/getUserPermissions'
  })
}

// 分页查询用户信息
export const getUserPages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}

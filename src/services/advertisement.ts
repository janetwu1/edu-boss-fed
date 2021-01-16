/**
 * 广告相关请求模块
 */

// 获取所有的广告列表 /front/ad/getAdList
import request from '@/utils/request'

export const getAdList = () => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}

// /front/ad/updateStatus
export const updateStatus = (data: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    data
  })
}

// 新增和修改广告信息
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

// 根据Id获取广告信息
// /front/ad/getAdById
export const getAdById = (id: number | string) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params: {
      id
    }
  })
}

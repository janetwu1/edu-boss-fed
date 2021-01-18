/**
 * 资源相关请求模块
 */

import request from '@/utils/request'

export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getResourceCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

// /boss/resource/saveOrUpdate
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

// /boss/resource/{id}
export const deleteResource = (id: number | string) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

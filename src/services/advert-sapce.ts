/**
 * 广告位相关请求模块
 */

// 获取所有的广告列表 /front/ad/getAdList
import request from '@/utils/request'

// 获取ID广告位 /front/ad/space/getSpaceById
export const getSpaceById = (id: number | string) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params: {
      id
    }
  })
}
// 获取所有的广告位 /front/ad/space/getAllSpaces
export const getAllSpaces = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

// 新增或者修改广告位
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}

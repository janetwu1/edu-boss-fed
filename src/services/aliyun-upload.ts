/**
 * 阿里云相关请求模块
 */

import request from '@/utils/request'

// 获取阿里云图片上传凭证
export const getAliyunImagUploadAddressAdnAuth = () => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

// 获取阿里云视频上传凭证 /boss/course/upload/aliyunVideoUploadAddressAdnAuth.json
export const getAliyunVideoUploadAddressAdnAuth = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
  })
}

// 阿里云转码请求  /boss/course/upload/aliyunTransCode.json
export const aliyunTransCode = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}

// 阿里云转码进度 /boss/course/upload/aliyunTransCodePercent.json
export const aliyunTransCodePercent = (lessonId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}

/** 上传相关请求模块 */
import request from '@/utils/request'

// 上传图片 /front/upload/img
export const uploadImage = (data: any, onUploadProgress?: (ProgressEvent: ProgressEvent) => void) => {
  return request({
    method: 'POST',
    url: '/front/upload/img',
    data,
    onUploadProgress
  })
}

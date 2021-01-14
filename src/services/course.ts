/**
 * 课程相关请求模块
 */
import request from '../utils/request'

// 课程上下架 /boss/course/changeState
export const changeState = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

// 通过课程Id获取课程信息 /boss/course/getCourseById
export const getCourseById = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}

// 分页查询课程信息
// /boss/course/getQueryCourses
export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 保存和更新课程信息
// /boss/course/saveOrUpdateCourse
export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

// 上传图片
export const uploadCourseImage = (data: any, onUploadProgress?: (ProgressEvent: ProgressEvent) => void) => {
  // 该接口请求要求的类型数据是multipart/form-data,所以需要提交 FormDate数据对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // html5 新增的上传响应事件：progress
    onUploadProgress
  })
}

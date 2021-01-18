<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <span>课程名称：{{ course.courseName }} </span>
        <div>阶段名称：{{ section.sectionName}}</div>
        <div>课时名称：{{ lesson.theme }}</div>
        <!-- <span></span> -->
      </div>
      <el-form label-width="40px">
        <el-form-item label="视频">
          <input
            ref="video-file"
            type="file"
          >
        </el-form-item>
        <el-form-item label="封面">
          <input
            ref="image-file"
            type="file"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleUpload"
          >开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item>
         <p>视频上传中： {{ uploadPercent }} %</p>
         <p
         v-if="isUploadSuccess"
         >视频转码中： {{ isTransCodeSuccess ? '完成' : '正在处理请稍后。。。'}}</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import {
  getAliyunVideoUploadAddressAdnAuth,
  getAliyunImagUploadAddressAdnAuth,
  aliyunTransCode,
  aliyunTransCodePercent
} from '../../services/aliyun-upload'
import { getCourseById } from '.././../services/course'
import { getBySectionId, getSectionAndLesson } from '../../services/course-section'
import { getById } from '../../services/course-lesson'
export default({
  name: 'CourseVideo',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      lesson: '',
      course: '',
      section: '',
      uploader: null,
      fileName: '',
      imageUrl: '',
      videoId: null,
      uploadPercent: 0,
      isUploadSuccess: false,
      isTransCodeSuccess: false
    }
  },
  computed: {
    video () {
      return this.$refs['video-file']
    },
    image () {
      return this.$refs['image-file']
    }
  },
  created () {
    this.initUploader()
    this.loadCourse()
    this.loadSection()
    this.loadLessons()
  },
  methods: {
    async loadSection () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.section = data.data[0]
      console.log('section', data.data)
    },
    async loadLessons () {
      const { data } = await getById(this.$route.query.lessonId)
      this.lesson = data.data

      console.log('lesson', data.data)
    },
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      this.course = data.data
      //  console.log(this.courseId)
      console.log('course', data.data)
    },
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值
        userId: 1618139964448548,
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: 'cn-shanghai',
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo) => {
          console.log('onUploadstarted', uploadInfo)
          // 1. 通过我们的后端获取上传凭证
          let uploadAddressAndAuth
          if (uploadInfo.isImage) {
            // 获取图片上传凭证
            const { data } = await getAliyunImagUploadAddressAdnAuth()
            console.log('img:', data)
            uploadAddressAndAuth = data.data
            this.imageUrl = data.data.imageURL
          } else {
            // 获取视频上传凭证
            const { data } = await getAliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageURL // 先上传图片
            })
            // console.log('video:',data)
            this.videoId = uploadAddressAndAuth.videoId
            uploadAddressAndAuth = data.data
          }
          // 2. 调用uploader.setUploadAuthAndAddress设置上传凭证
          ;(this.uploader).setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )
          // 3. 设置好上传凭证确认没有问题，上传进度开始
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
          console.log('onUploadSucceed', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
          console.log('onUploadFailed', uploadInfo, code, message)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
          console.log('onUploadProgress', uploadInfo, totalSize, loadedPercent)
          if (!uploadInfo.isImage) {
            this.uploadPercent = Math.floor(loadedPercent * 100)
          }
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo) {
          console.log('onUploadTokenExpired', uploadInfo)
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo) => {
          this.isUploadSuccess = true
          // console.log('onUploadEnd', uploadInfo)
          // 转码
          const { data } = await aliyunTransCode({
            lessonId: this.$route.query.lessonId,
            coverImageUrl: this.imageURL,
            fileId: this.videoId,
            fileName: (this.video).files[0].name
          })
          console.log('请求转码', data)

          // 转码进度
          const timer = setInterval(async () => {
            const { data } = await aliyunTransCodePercent(this.$route.query.lessonId)
            // console.log(data.data)
            if (data.data === 100) {
              this.isTransCodeSuccess = true
              window.clearInterval(timer)
              console.log('转码成功')
            }
          }, 3000)
        }
      })
    },

    handleUpload () {
      // 初始化上传状态
      this.isUploadSuccess = false
      this.uploadPercent = 0
      this.isTransCodeSuccess = false
      const videoFile = (this.$refs['video-file']).files[0]
      const imageFile = (this.$refs['image-file']).files[0]
      // const uploader = this.uploader
      // console.log(videoFile, imageFile)

      // 将用户所选的文件添加到上传列表中
      // 一旦开始上传，它会按照列表中添加的顺序进行上传
      this.uploader.addFile(imageFile, null, null, null, '{"Vod":{}}')
      // uploader.addFile(videoFile, null, null, null, '{"Vod":{}}')

      // 开始上传
      this.uploader.startUpload();
    }
  }
})
</script>

<style lang="scss" scoped></style>

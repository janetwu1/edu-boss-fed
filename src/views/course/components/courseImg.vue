<template>
  <div class="course-image">
      <el-progress
       v-if="isUploading"
        type="circle"
        :percentage="percentage"
        :width="178"
        :status="percentage === 100 ? 'success' : undefined"
        >
      </el-progress>
     <el-upload
        v-else
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :http-request="handleUpload"
        :before-upload="beforeAvatarUpload">
        <img v-if="value"
        :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { Form } from 'element-ui';
import Vue from 'vue'
import { uploadCourseImage } from '../../../services/course'

export default Vue.extend({
  name: 'courseImage',
  props: {
    value: {
      type: String
    },
    limit: { // 设置默认参数
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      isUploading: false,
      percentage: 0
    }
  },
  methods: {
    handleAvatarSuccess (res: any, file: any) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!')
        this.$message.error(`上传头像图片大小不能超过 ${this.limit}`)
      }
      return isJPG && isLt2M;
    },
    async handleUpload (option: any) {
      this.isUploading = true
      const fd = new FormData()
      fd.append('file', option.file)
      const { data } = await uploadCourseImage(fd, e => {
        // 环形进度条
        this.percentage = Math.floor(e.loaded / e.total * 100)
      })
      // this.course.courseListImg = data.data.name
      this.$emit('input', data.data.name)
      this.isUploading = false
      this.percentage = 0
    }
  }
})
</script>

<style lang="scss" scope>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>

<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadCourseImage } from '../../services/course'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  // 组件已经渲染好，可以初始化操作demo了
  mounted () {
    this.initEditor()
  },

  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      // 注意：事件监听必须在create 之前
      editor.config.onchange = (value: string) => {
      // console.log(value)
        this.$emit('input', value)
      }
      editor.create()
      // 注意：设置初始化必须在 create 以后
      editor.txt.html(this.value)

      editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: any) {
        // 1.把用户选择的resultFiles 上传到服务器
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        // console.log(data)
        // insertImgFn('图片地址) 根据图片地址生成img标签插入富文本编辑内容中
        insertImgFn(data.data.name)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>

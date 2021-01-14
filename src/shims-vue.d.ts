// 主要用于TypeScript识别.vue文件模块
// TypeScript默认不支持导入.vue模块，这个文件告诉TypeScript导入.vue文件模块都按VueConstructor<vue>类型识别处理
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface Window {
  AliyunUpload: any;
}

<template>
  <div class="createAndEditAdvert">
   <el-card>
       <el-form :model="advertListForm" :rules="rules" ref="advertListForm" label-width="100px" class="demo-ruleForm">
  <el-form-item required label="广告名称" prop="name">
    <el-input v-model="advertListForm.name"></el-input>
  </el-form-item>
  <el-form-item label="广告位置" prop="spaceId">
    <!-- <el-select  placeholder="请选择活动区域">
      <el-option label="区域一"></el-option>
      <el-option label="区域二"></el-option>
    </el-select> -->
    <el-select v-model="advertListForm.spaceId" placeholder="请选择">
    <el-option
      v-for="item in spaces"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

</el-form-item>
    <el-form-item label="开始时间" required>
            <el-date-picker
            type="date"
            prop="startTime"
            v-model="advertListForm.startTime"
            placeholder="选择日期"
            ></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" required>
        <el-date-picker
        type="date"
        prop="endTime"
        v-model="advertListForm.endTime"
        placeholder="选择日期"
        ></el-date-picker>
    </el-form-item>
  <el-form-item label="上线/下线" prop="status">
 <template>
      <el-radio-group v-model="advertListForm.status">
        <el-radio :label="0">下线</el-radio>
        <el-radio :label="1">上线</el-radio>
    </el-radio-group>
 </template>
  </el-form-item>
  <el-form-item label="广告图片" prop="img">
    <advert-image v-model="advertListForm.img"></advert-image>
  </el-form-item>
  <el-form-item label="广告链接" required>
    <el-input type="text"  v-model="advertListForm.link"></el-input>
  </el-form-item>
    <el-form-item label="广告备注">
    <el-input type="textarea" v-model="advertListForm.htmlContent" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('advertListForm')">提交</el-button>
    <el-button @click="resetForm('advertListForm')">重置</el-button>
  </el-form-item>
</el-form>
   </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdate, getAdById } from '../../../services/advertisement'
import { getAllSpaces } from '../../../services/advert-sapce'
import advertImage from './advert-Img.vue'
// import imageUpload from '../../../components/ImageUpload/index.vue'

export default Vue.extend({
  name: 'createAndEditAdvert',
  components: {
    advertImage
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    advertId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      advertListForm: {
        id: 0,
        name: '',
        spaceId: 0,
        keyword: '',
        htmlContent: '',
        text: '',
        img: '',
        link: '',
        startTime: '',
        endTime: '',
        createTime: '',
        updateTime: '',
        status: 0,
        priority: 0,
        startTimeFormatString: '',
        endTimeFormatString: ''
      },
      upload: {
        success: true,
        state: 0,
        message: '',
        content: {
          uid: '',
          name: '',
          status: '',
          response: ''
        }
      },
      isUploading: false,
      percentage: false,
      uploadUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      spaces: [],
      rules: {
        // name: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // region: [
        //   { message: '请选择活动区域', trigger: 'change' }
        // ],
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    }
  },
  created () {
    this.loadSpaces()
    if (this.isEdit) {
      this.advertLists()
    }
  },
  methods: {
    async loadSpaces () {
      const { data } = await getAllSpaces()
      console.log(data)
      this.spaces = data.content
    },
    async advertLists () {
      const { data } = await getAdById(this.advertId)
      this.advertListForm = data.content
      // console.log(data)
    },
    async submitForm () {
      await saveOrUpdate(this.advertListForm)
      this.$router.back()
    },
    resetForm (advertListForm) {
      this.$refs[advertListForm].resetFields();
    }
  }
})
</script>

<style lang="scss" scoped></style>

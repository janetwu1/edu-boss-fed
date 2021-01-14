<template>
  <el-card>
    <div slot="header">
    <el-steps :active="activeStep" simple>
    <el-step
    :title="item.title"
    :icon="item.icon"
    v-for="(item, index) in steps"
    :key="index"
        @click.native="activeStep = index"></el-step>
    <!-- <el-step title="课程封面" icon="el-icon-upload" @click.native="activeStep=1"></el-step>
    <el-step title="销售信息" icon="el-icon-picture"></el-step>
    <el-step title="秒杀活动" icon="el-icon-picture"></el-step>
    <el-step title="课程详情" icon="el-icon-picture"></el-step> -->
    </el-steps>
    </div>
    <el-form label-width="80px">
        <div v-show="activeStep === 0">
            <el-form-item label="课程名称" prop="course.courseName">
                <el-input v-model="course.courseName"></el-input>
            </el-form-item>
            <el-form-item label="课程简介">
                <el-input v-model="course.brief"></el-input>
            </el-form-item>
            <el-form-item label="课程概述">
                <el-input v-model="course.previewFirstField"
                type="textarea"
                placeholder="概述1"
                style="margin-bottom:15px"></el-input>
                <el-input
                v-model="course.previewSecondField"
                type="textarea"
                placeholder="概述2"></el-input>
            </el-form-item>
        <el-form-item label="讲师姓名">
                <el-input v-model="course.teacherDTO.teacherName"></el-input>
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="course.teacherDTO.description"></el-input>
            </el-form-item>
            <el-form-item label="课程排序">
                <el-input-number v-model="course.sortNum"></el-input-number>
            </el-form-item>
        </div>
        <div v-show="activeStep === 1">
            <el-form-item label="课程封面">
                    <!--
                    1.组件需要根据绑定的数据进行预览
                    2.组件需要把上传成功的图片地址同步到绑定的数据中
                    v-model的本质还是父子组件通信
                    1.它会给子组件传递一个名字叫value的数据（props）
                    2.默认监听 input 时间，修改绑定的数据（组定义事件)
                -->
                <course-image v-model="course.courseListImg"></course-image>
            </el-form-item>
            <el-form-item label="介绍封面">
                <course-image
                :limit="3"
                v-model="course.courseImgUrl">
                </course-image>
            </el-form-item>
        </div>
        <div v-show="activeStep === 2">
        <el-form-item label="售卖价格">
            <el-input v-model="course.discounts" >
                <template slot="append">元</template>
            </el-input>
        </el-form-item>
            <el-form-item label="商品原价">
            <el-input v-model="course.price" >
                <template slot="append">元</template>
            </el-input>
        </el-form-item>
            <el-form-item label="销量">
            <el-input v-model="course.sales">
                <template slot="append">单</template>
            </el-input>
        </el-form-item>
            <el-form-item label="活动标签">
            <el-input v-model="course.discountsTag">
            </el-input>
        </el-form-item>
        </div>
        <div v-show="activeStep === 3">
            <el-form-item label="限时秒杀开关">
            <el-switch
            v-model="course.activityCourse"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        <template v-if="course.activityCourse">
            <el-form-item label="开始时间">
            <el-date-picker
                type="date"
                v-model="course.activityCourseDTO.beginTime"
                placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
            <el-date-picker
                type="date"
                v-model="course.activityCourseDTO.endTime"
                placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀">
                <el-input v-model="course.activityCourseDTO.amount">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
                <el-input placeholder="请输入内容" v-model="course.activityCourseDTO.stock">
                    <template slot="append">个</template>
                </el-input>
            </el-form-item>
        </template>

        </div>
        <div v-show="activeStep === 4">
            <el-form-item label="课程详情">
               <text-editor v-model="course.courseDescriptionMarkDown"/>
            <!-- <el-input type="textarea"
            v-model="course.courseDescriptionMarkDown"></el-input> -->
            </el-form-item>
            <el-form-item label="是否发布">
            <el-switch
            v-model="course.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
            <el-form-item>
            <el-button
            @click="handleSave"
            type="primary">保存</el-button>
            </el-form-item>
        </div>
        <el-form-item v-if="activeStep >= 0 && activeStep < 4">
            <el-button @click="activeStep++">下一步</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import courseImage from './courseImg.vue'
import { saveOrUpdateCourse, getCourseById } from '../../../services/course'
import TextEditor from '../../../components/TextEditor/index.vue'
import moment from 'moment'

export default Vue.extend({
  name: 'CreateOrEdit',
  components: {
    courseImage,
    TextEditor
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      activeStep: 0,
      steps: [
        {
          title: '基本信息',
          icon: 'el-icon-edit'
        },
        {
          title: '课程封面',
          icon: 'el-icon-edit'
        },
        {
          title: '销售信息',
          icon: 'el-icon-edit'
        },
        {
          title: '秒杀活动',
          icon: 'el-icon-edit'
        },
        {
          title: '课程详情',
          icon: 'el-icon-edit'
        }
      ],
      imageUrl: '', // 预览图片地址
      isSecKill: false,
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0, // 0: 未发布，1: 已发布
        sales: 0,
        activityCourse: false,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadCourses()
    }
  },
  methods: {
    async loadCourses () {
      const { data } = await getCourseById(this.courseId)
      console.log(data)
      const { activityCourseDTO } = data.data
      if (activityCourseDTO !== null) {
        activityCourseDTO.beginTime = moment(activityCourseDTO.beginTime).format('YYYY-MM-DD')
        activityCourseDTO.endTime = moment(activityCourseDTO.endTime).format('YYYY-MM-DD')
      }
      this.course = data.data
    },
    async handleSave () {
      const { data } = await saveOrUpdateCourse(this.course)
      this.$router.back()
      // console.log(data)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step{
    cursor: pointer;
}
</style>

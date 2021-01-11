<template>
  <div class="courseList">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
     <el-form :inline="true" :model="filterParams" class="demo-form-inline">
  <el-form-item label="课程名称">
    <el-input v-model="filterParams.courseName" placeholder="课程名称"></el-input>
  </el-form-item>
  <el-form-item label="状态" prop="status">
    <el-select v-model="filterParams.status" placeholder="活动区域">
      <el-option label="全部" value=""></el-option>
      <el-option label="上架" value="1"></el-option>
      <el-option label="下架" value="0"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onQuery">查询</el-button>
  </el-form-item>
  <el-form-item style="float:right">
    <el-button
    type="primary"
    @click="$router.push({
      name: 'course-create'
    })"> + 新建课程 </el-button>
  </el-form-item>
</el-form>
    </div>
    <el-table
      :data="courses"
      style="width: 100%">
      <el-table-column
         type="index"
         label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名称">
      </el-table-column>
       <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
        <el-table-column
        prop="sortNum"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="status"
        label="上架状态">
        <template slot-scope="scope">
        <el-switch
        v-model="scope.row.status"
        :active-value="1"
        :inactive-value="0"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :disabled="scope.row.isStatusLoading"
        @change="onStateChange(scope.row)">
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px" >
        <template >
          <el-button>编辑</el-button>
          <el-button>内容管理</el-button>
        </template>
        </el-table-column>
    </el-table>
    </el-card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '../../../services/course'

export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      filterParams: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: '',
        id: ''
      },
      courses: [],
      totalCount: 0,
      loading: true,
      value: ''
    }
  },

  created () {
    this.loadCourses()
  },
  methods: {
    async loadCourses () {
      const { data } = await getQueryCourses(this.filterParams)
      data.data.records.forEach((item: any) => {
        item.isStatusLoading = false
      });
      this.courses = data.data.records
      // console.log(data)
    },
    onQuery () {
      this.loadCourses()
    },
    async onStateChange (course: any) {
      course.isStatusLoading = true
      const { data } = await changeState({
        courseId: course.id,
        status: course.status
      })
      this.$message.success(`${course.status === 0 ? '下架' : '上架'}成功`)
      course.isStatusLoading = false
    }
  }
})
</script>

<style lang="scss" scope></style>

<template>
  <div class="resource-list">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
           <el-form
           :inline="true"
           ref="form"
           :model="form"
           class="demo-form-inline">
            <el-form-item label="资源名称" prop="name">
                <el-input v-model="form.name" placeholder="资源名称"></el-input>
            </el-form-item>
             <el-form-item label="资源路径" prop="url">
                <el-input v-model="form.url" placeholder="资源路径"></el-input>
            </el-form-item>
            <el-form-item label="资源分类" prop="categoryId">
                <el-select
                 v-model="form.categoryId"
                  clearable placeholder="请选择资源分类">
                <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                type="primary"
                :disabled="isLoading"
                @click="onSubmit">立即搜索</el-button>
                <el-button :disabled="isLoading" @click="onReset">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
       <el-table
      :data="resources"
      style="width: 100%"
      v-loading="isLoading">
      <el-table-column
        type="index"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源名称">
      </el-table-column>
      <el-table-column
        prop="url"
        label="资源路径">
      </el-table-column>
       <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
       <el-table-column
         prop="createdTime"
         :formatter="formatTime"
        label="添加时间">
      </el-table-column>
   <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!--
        total总记录数
        page-size 每页大小
        分页组件会自动根据 total 和 page-size计算出一共分多少页
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :disabled="isLoading"
      :current-page.sync="form.current"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="form.size"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    </el-card>
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="50%">
          <el-form  :model="resourceForm" ref="resourceForm"  label-width="100px" class="demo-ruleForm">
        <el-form-item required label="资源名称" prop="name">
            <el-input v-model="resourceForm.name"></el-input>
        </el-form-item>
          <el-form-item required label="资源路径" prop="url">
            <el-input v-model="resourceForm.url"></el-input>
        </el-form-item>
            <el-form-item required label="资源分类" prop="categoryId">
                <el-select v-model="resourceForm.categoryId" clearable placeholder="请选择资源分类">
                <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
            v-model="resourceForm.description"
            type="textarea"></el-input>
        </el-form-item>

        </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSave">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script lang="ts">
import { Form } from 'element-ui'
import Vue from 'vue'
import {
  getResourcePages,
  getResourceCategory,
  saveOrUpdate,
  deleteResource
} from '../../../services/resource'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      form: {
        current: 1,
        size: 10,
        name: '',
        url: '',
        categoryId: null // 资源分类
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true,
      dialogVisible: false,
      resourceForm: {
        id: 0,
        name: '',
        categoryId: 0,
        url: '',
        description: ''
      }
    }
  },
  created () {
    this.loadResources()
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategory()
      // console.log(data)
      this.resourceCategories = data.data
    },
    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getResourcePages(this.form)
      // console.log(data)
      this.resources = data.data.records
      // this.resource = this.resources
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中的状态
    },
    onSubmit () {
      // console.log('submit!');
      this.form.current = 1
      this.loadResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResources()
    },
    formatTime (row: any, column: any) {
      const date = new Date(row[column.property])
      return date.getFullYear() + '年' +
      date.getMonth() + '月' +
      date.getDate() + '日 ' +
      date.getHours() + ':' +
       date.getMinutes()
    },
    async handleEdit (data: any) {
      // const { data } = await GetResource(id)
      // console.log(data)
      this.resourceForm.id = data.id
      this.resourceForm.categoryId = data.categoryId
      this.resourceForm.url = data.url
      this.resourceForm.description = data.description
      this.resourceForm.name = data.name
      // console.log('edit')
      this.loadResources()
      this.dialogVisible = true
    },
    async handleDelete (item: any) {
      // const { data } = await deleteResource(item.id)
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          // 请求删除操作
          const { data } = await deleteResource(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadResources() // 更新数据列表
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    },
    async handleSave () {
      await saveOrUpdate(this.resourceForm)
      this.loadResources()
      this.dialogVisible = false
    },
    handleSizeChange (val: number) {
    //   console.log(`每页 ${val} 条`)
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新刷新查询第一页数据
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      // console.log(`当前页: ${val}`)
      // 请求获取对应页码的数据
      this.form.current = val // 修改查询页面
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped>
.el-table{
    margin-bottom: 15px;
}
</style>

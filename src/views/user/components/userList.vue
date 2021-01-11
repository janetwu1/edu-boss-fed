<template>
  <div class="userList">
    <el-card class="box-card">
      <el-form :inline="true"
      :model="filterParams"
      ref="filter-form"
      class="demo-form-inline">
      <el-form-item label="手机号" prop="phone">
    <el-input v-model="filterParams.phone" placeholder="手机号"></el-input>
  </el-form-item>
    <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker
            v-model="filterParams.rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onQuery">查询</el-button>
    <el-button @click="handleReset">重置</el-button>
  </el-form-item>
     </el-form>
       <el-table :data="users">
        <el-table-column
        prop="id" type="index"
        label="编号">
      </el-table-column>
        <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleSelectRole(scope.row)"
          >分配角色</el-button>
        </template>
      </el-table-column>
       </el-table>
       <el-pagination
  background
  layout="prev, pager, next"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page.sync="filterParams.current"
  :total="totalCount">
</el-pagination>
       <el-dialog
  title="分配角色"
  :visible.sync="dialogVisible"
  width="50%">
   <el-select v-model="roleIdList" multiple placeholder="请选择" style="width:100%">
    <el-option
      v-for="item in roles"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleAllcRoll">确 定</el-button>
  </span>
</el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages } from '../../../services/user'
import { getAllRoles, allocateUserRoles, getUserRoles } from '../../../services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'userListIndex',
  data () {
    return {
      users: [],
      filterParams: {
        currentPage: 1,
        pageSize: 100,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      totalCount: 0,
      dialogVisible: false,
      roleIdList: [],
      roles: [],
      currentUser: null // 分配角色的当前用户
    }
  },
  created () {
    this.loadUsers()
  },

  methods: {
    async loadUsers () {
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPages(this.filterParams)
      console.log(data)
      this.users = data.data.records
      this.totalCount = data.data.total
    },
    async onQuery () {
      this.loadUsers()
    },
    async handleSelectRole (role: any) {
      this.currentUser = role
      // 加载角色列表
      const { data } = await getAllRoles()
      this.roles = data.data
      const { data: { data: userRoles } } = await getUserRoles((this.currentUser as any).id)
      // console.log(userRoles)
      this.roleIdList = userRoles.map((item: any) => item.id)
      // 弹出对话框
      this.dialogVisible = true
    },
    async handleAllcRoll () {
      await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList
      })
      this.$message.success('操作成功')
      this.dialogVisible = false
    },
    handleSizeChange (val: number) {
      console.log(`每页 ${val} 条`)
      this.filterParams.pageSize = val
      this.filterParams.currentPage = 1 // 每页大小改变重新刷新查询第一页数据
      this.loadUsers()
    },
    handleCurrentChange (val: number) {
      console.log(`当前页: ${val}`)
      // 请求获取对应页码的数据
      this.filterParams.currentPage = val // 修改查询页面
      this.loadUsers()
    },
    handleReset () {
      // (this.filterParams as Form).resetFields()
      (this.$refs['filter-form'] as Form).resetFields()
      this.loadUsers()
    }
  }
})
</script>

<style lang="scss" scoped>
.el-table{ margin-bottom: 15px;}
</style>

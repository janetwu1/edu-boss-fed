<template>
  <div class="userList">
    <el-card class="box-card">
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
      const { data } = await getUserPages(this.filterParams)
      console.log(data)
      this.users = data.data.records
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
      const data = await allocateUserRoles({
        userId: this.currentUser.id,
        roleIdList: this.roleIdList
      })
      this.$message.success('操作成功')
      this.dialogVisible = false
    }
  }
})
</script>

<style lang="scss" scoped></style>

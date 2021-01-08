<template>
  <div class="role">
   <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-button @click="handleAdd" :disabled="isLoading">添加角色</el-button>
  </div>
   <el-table
      :data="roles"
      style="width: 100%">
      <el-table-column
        prop="date" type="index"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="createdBy"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="description"
        label="角色描述">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text"
        @click="$router.push({
        name: 'alloc-menu',
        params: {
          roleId:scope.row.id
        }
        })">分配菜单</el-button>
        <el-button size="mini" type="text">分配资源</el-button>
        <el-button
          size="mini"
          type="text"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="text"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
</el-card>

<el-dialog
  :title="isEdit ? '编辑角色' : '添加角色'"
  :visible.sync="addRoleDialog"
  width="30%">
  <create-or-edit
  v-if="addRoleDialog"
  @success="onSuccess"
  :role-id="roleId"
  :isEdit="isEdit"
  @cancel="addRoleDialog = false"></create-or-edit>
</el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllRoles, deleteRole } from '../../../services/role'
import createOrEdit from './createOrEdit.vue'

export default Vue.extend({
  name: 'roleList',
  components: {
    createOrEdit
  },
  data () {
    return {
      roles: [],
      addRoleDialog: false, // 控制添加角色的对话框
      isLoading: false,
      roleId: null,
      isEdit: false
    }
  },
  created () {
    this.isLoading = true
    this.loadRoleAll()
    this.isLoading = false
  },
  methods: {
    async loadRoleAll () {
      const { data } = await getAllRoles()
      this.roles = data.data
      console.log(data)
    },
    handleEdit (row: any) {
      this.addRoleDialog = true
      this.roleId = row.id
      this.isEdit = true
    },
    handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          // 请求删除操作
          const { data } = await deleteRole(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadRoleAll() // 更新数据列表
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    },
    onSuccess () {
      this.addRoleDialog = false // 关闭添加角色的对话框
      this.loadRoleAll() // 重新加载
    },
    handleAdd () {
      this.isEdit = false
      this.addRoleDialog = true
    }
  }
})
</script>

<style lang="scss" scoped></style>

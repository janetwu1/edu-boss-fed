<template>
<div class="editOrEdit">
    <el-form>
      <el-form-item label="角色名称">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
       <el-form-item label="角色编码">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
       <el-form-item label="角色描述">
        <el-input v-model="role.description"></el-input>
      </el-form-item>
       <el-form-item>
         <el-button @click="$emit('cancel')">取消</el-button>
         <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
</div>

</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdate, getRoleId } from '../../../services/role'

export default Vue.extend({
  name: 'editOrEditRole',
  props: {
    roleId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      role: {
        code: '',
        name: '',
        description: ''
      }
    }
  },
  created () {
    // 如果是编辑操作，则根据角色ID加载展示角色信息
    if (this.isEdit) {
      console.log('这是编辑操作')
      this.loadRole()
    }
  },
  methods: {
    async onSubmit () {
      await createOrUpdate(this.role)
      this.$message.success('操作成功')
      this.$emit('success')
    },
    async loadRole () {
      const { data } = await getRoleId(this.roleId)
      this.role = data.data
    }
  }
})
</script>

<style scoped></style>

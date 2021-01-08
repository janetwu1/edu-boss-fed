<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配权限</span>
      </div>
  <el-tree
    :data="menus"
    ref="menu-tree"
    node-key="id"
    :default-checked-keys="checkedKeys"
    show-checkbox
    default-expand-all
    :props="defaultProps"
></el-tree>
<div style="text-align:center">
  <el-button @click="resetChecked">清空</el-button>
  <el-button type="primary" @click="onSave">保存</el-button>
</div>
    </el-card>

  </div>
</template>

<script lang="ts">
import { Menu, Tree } from 'element-ui'
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '../../services/menu'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },

  created () {
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenus () {
      const { data } = await getMenuNodeList()
      console.log(data)
      this.menus = data.data
    },

    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
      console.log(data)
    },
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          // this.checkedKeys.push(menu.id as never)
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([]);
    },
    async onSave () {
      const menuIdList = await (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      // 拿到选中节点的数据 id 列表
      // 请求提交保存
      await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      this.$message.success('操作成功')
      this.$router.back() // 返回上一页
    }
  }
})
</script>

<style lang="scss" scope></style>

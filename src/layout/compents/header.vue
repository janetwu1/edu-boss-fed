<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">{{ $route.meta.title }}</a></el-breadcrumb-item>
        <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-dropdown>
    <span class="el-dropdown-link">
        <el-avatar shape="square"
       :size="40"
       :src="userInfo.portrait || require('@/assets/default-avatar.png')"
       ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item
        divided
        @click.native="handleLogout"
        >退出</el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '../../services/user'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}, // 当前登录用户信息
      title: '活动管理',
      url: ''
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
      // console.log('loadUserInfo')
    },
    handleLogout () {
      this.$confirm('确认退出吗?', '提示提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认执行
        // 清除登录状态
        this.$store.commit('setUser', null)

        // 跳转登录页面
        this.$router.push({
          name: 'login'
        })
        this.$message({ // 取消执行
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({ // 取消执行这里
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    height: 100%;
     align-items: center;
     justify-content: space-between;
}
.el-dropdown-link{
    display: flex;
    align-items: center;
}
</style>

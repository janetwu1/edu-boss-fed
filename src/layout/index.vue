<template>
    <div class="layout">
        <el-container>
            <el-aside width="200px">
                <app-aside></app-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <app-header></app-header>
                </el-header>
                <el-main>
                    <!-- 子路由出口 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <!-- 子路由出口 -->
        <!-- <router-view></router-view> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from './compents/header.vue'
import AppAside from './compents/aside.vue'

export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-container{
    min-height: 100vh;
    min-width: 980px;
}
.el-header{
     background: #fff;
}
.el-aside{
    background: #d3dce6;
}
.el-main{
    background-color: #e9eef3;
    color: #333;
}
</style>

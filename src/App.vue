<template>
  <div id="app">
    <!-- <h1>测试</h1> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss" scoped>

.text{
  color:$success-color ;
}
</style>

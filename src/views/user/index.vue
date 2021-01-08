<template>
  <div class="user">
    <user-List></user-List>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import userList from './components/userList.vue'

export default Vue.extend({
  name: 'userIndex',
  components: {
    userList
  }
})
</script>

<style lang="scss" scope></style>

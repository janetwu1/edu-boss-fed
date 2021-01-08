<template>
  <div class="role">
    <role-List></role-List>
  </div>
</template>

<script>
import Vue from 'vue'
import roleList from './components/List'

export default Vue.extend({
  name: 'roleIndex',
  components: {
    roleList
  }
})
</script>

<style lang="scss" scoped></style>

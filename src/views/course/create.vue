<template>
  <div class="course-create">
    <create-or-edit></create-or-edit>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/createOrEdit.vue'

export default Vue.extend({
  name: 'courseCreate',
  components: {
    CreateOrEdit
  }
})
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="course-edit">
    <create-or-edit is-edit
    :courseId="courseId"></create-or-edit>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/createOrEdit.vue'

export default Vue.extend({
  name: 'courseEdit',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    CreateOrEdit
  }
})
</script>

<style lang="scss" scoped>
</style>

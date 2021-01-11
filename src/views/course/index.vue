<template>
  <div class="course">
    <course-list></course-list>
  </div>
</template>

<script>
import Vue from 'vue'
import CourseList from './components/courseList.vue'

export default Vue.extend({
  name: 'courseIndex',
  components: {
    CourseList
  }
})
</script>

<style lang="scss" scoped></style>

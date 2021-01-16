<template>
  <div class="home">
    <course></course>
  </div>
</template>

<script>
import Vue from 'vue'
import course from '../course'

export default Vue.extend({
  name: 'homeIndex',
  components: {
    course
  }
})
</script>

<style lang="scss" scoped></style>

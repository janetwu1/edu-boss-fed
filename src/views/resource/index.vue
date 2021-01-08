<template>
  <div class="resource">
    <resource-list></resource-list>
  </div>
</template>

<script>
import Vue from 'vue'
import ResourceList from './components/List.vue'

export default Vue.extend({
  name: 'resourceIndex',
  components: {
    ResourceList
  }
})
</script>

<style lang="scss" scoped></style>

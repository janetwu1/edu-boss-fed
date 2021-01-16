<template>
  <div class="advert">
    <advert-space-list></advert-space-list>
  </div>
</template>

<script>
import Vue from 'vue'
import advertSpaceList from './components/advert-space-list.vue'

export default Vue.extend({
  components: { advertSpaceList },
  name: 'homeIndex'
})
</script>

<style lang="scss" scoped></style>

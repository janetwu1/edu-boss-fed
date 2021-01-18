<template>
  <div class="advert">
    <advert-list></advert-list>
  </div>
</template>

<script>
import Vue from 'vue'
import AdvertList from './components/advert-list.vue'

export default Vue.extend({
  name: 'advertIndex',
  title: '广告管理',
  components: {
    AdvertList
  }
})
</script>

<style lang="scss" scoped></style>

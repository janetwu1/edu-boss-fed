<template>
  <create-and-edit-advert></create-and-edit-advert>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateAndEditAdvert from './components/createAndEditAdvert.vue'

export default Vue.extend({
  name: 'addAdvertise',
  components: {
    CreateAndEditAdvert
  }
})
</script>

<style lang="scss" scoped></style>

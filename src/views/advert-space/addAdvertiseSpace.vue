<template>
   <create-and-edit-advert-space></create-and-edit-advert-space>
</template>

<script lang="ts">
import Vue from 'vue'
import createAndEditAdvertSpace from './components/createAndEditAdvertSpace.vue'

export default Vue.extend({
  name: 'addAdvertiseSpace',
  components: {
    createAndEditAdvertSpace
  }
})
</script>

<style lang="scss" scoped></style>

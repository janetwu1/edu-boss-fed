<template>
  <create-and-edit-advert-space
  is-edit
  :spaceId="spaceId">
  </create-and-edit-advert-space>
</template>

<script lang="ts">
import Vue from 'vue'
import createAndEditAdvertSpace from './components/createAndEditAdvertSpace.vue'

export default Vue.extend({
  name: 'updateAdvertiseSpace',
  components: {
    createAndEditAdvertSpace
  },
  props: {
    spaceId: {
      type: [String, Number],
      required: true
    }
  }
})
</script>

<style lang="scss" scoped></style>

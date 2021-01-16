<template>
  <create-and-edit-advert
  is-edit
  :advertId="advertId"></create-and-edit-advert>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateAndEditAdvert from './components/createAndEditAdvert.vue'

export default Vue.extend({
  name: 'updateAdvert',
  components: {
    CreateAndEditAdvert
  },
  props: {
    advertId: {
      type: [String, Number],
      required: true
    }
  }
})
</script>

<style lang="scss" scoped></style>

<template>
  <div class="menu-create">
     <create-or-edit :isEdit="true"></create-or-edit>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'menuEdit',
  components: {
    CreateOrEdit
  },
  data () {
    return {}
  }
})
</script>
<style lang="scss" scoped></style>

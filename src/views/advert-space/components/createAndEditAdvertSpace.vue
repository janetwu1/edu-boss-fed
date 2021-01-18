<template>
  <div class="add-Advert">
      <el-card>
        <el-form  :model="advertSpaceForm" ref="advertSpaceForm"  label-width="100px" class="demo-ruleForm">
        <el-form-item required label="广告位名称" prop="name">
            <el-input v-model="advertSpaceForm.name"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm('advertSpaceForm')">重置</el-button>
        </el-form-item>
        </el-form>
</el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdate, getSpaceById } from '../../../services/advert-sapce'

export default Vue.extend({
  name: 'createAndEditAdvertSpace',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    spaceId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      advertSpaceForm: {
        id: 0,
        name: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadSpace()
    }
  },
  methods: {
    async loadSpace () {
      const { data } = await getSpaceById(this.spaceId)
      this.advertSpaceForm = data.content
    },
    async submitForm () {
      await saveOrUpdate(this.advertSpaceForm)
      this.$router.back()
    },
    resetForm (formName: any) {
      (this.$refs[formName] as any).resetFields();
    }
  }
})
</script>

<style lang="scss" scoped></style>

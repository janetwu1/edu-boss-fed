<template>
  <div class="advert-List">
      <el-card>
         <div slot="header">
             <el-button @click="$router.push({
               name:'addAdvertiseSpace'
             })">添加广告位</el-button>
         </div>
           <template>
    <el-table
      :data="spaceList"
      style="width: 100%">
     <el-table-column
         label="id"
         prop="id"
         width="100"
       >
      </el-table-column>
      <el-table-column
       prop="name"
        label="广告位名称"
       >
      </el-table-column>
      <el-table-column
      label="创建时间"
      prop="createTime"
       >
      </el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateTime">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
         <el-button
         type="text"
         @click="$router.push({
           name: 'updateAdvertiseSpace',
           params:{
             spaceId: scope.row.id
           }
         })">编辑</el-button>
         </template>
      </el-table-column>
    </el-table>
  </template>
      </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import moment from 'moment'
import { getAllSpaces } from '../../../services/advert-sapce'
export default Vue.extend({
  name: 'advertSpaceList',
  props: {
    spaceId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      spaceList: [],
      status: 0,
      adverId: ''
    }
  },
  created () {
    this.loadSpace()
  },
  methods: {
    async loadSpace () {
      const { data } = await getAllSpaces()
      this.spaceList = data.content
      console.log(data)
    }

  }
})
</script>

<style lang="scss" scoped></style>

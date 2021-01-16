<template>
  <div class="advert-List">
      <el-card>
         <div slot="header">
             <el-button style="fload:right"
             @click="$router.push({
                 name: 'addAdvertise'
             })">添加广告</el-button>
         </div>
           <template>
    <el-table
      :data="advertList"
      style="width: 100%">
     <el-table-column
         label="id"
         prop="id"
       >
      </el-table-column>
      <el-table-column
       prop="name"
        label="广告名称"
       >
      </el-table-column>
      <el-table-column
        prop="spaceId"
        label="广告位置"
       >
        <template :v-model="advertListForm.spaceId">
          <!-- <span
           v-for="item in spaceList"
          :key="item.id"
          :label="item.name"
          :value="item.id"></span> -->
        </template>
      </el-table-column>
        <!-- <el-form-item label="广告位置" prop="spaceId">
    <el-select v-model="advertListForm.spaceId" placeholder="请选择">
    <el-option
      v-for="item in spaces"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

</el-form-item> -->
      <el-table-column
        label="广告图片">
       <template slot-scope="scope">
      <img width="100" height="100"
        :model="scope.row.id"
        :src="scope.row.img"
      alt="">
      </template>
      </el-table-column>
      <el-table-column
        label="时间"
      >
      <template slot-scope="scope">
        <span>开始时间：{{ scope.row.createTime  }}</span><br>
        <span>结束时间: {{ scope.row.endTime }}</span>
      </template>
      </el-table-column>
      <el-table-column
        label="上线/线下"
        >
         <template slot-scope="scope">
        <el-switch
        v-model="scope.row.status"
        :active-value="1"
        :inactive-value="0"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="onStateChange(scope.row)">
        </el-switch>
         </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
         <el-button
         type="text"
         @click="$router.push({
            name: 'updateAdvertise',
            params: {
              advertId: scope.row.id
            }
         })"
         >编辑</el-button>
         </template>
      </el-table-column>
    </el-table>
  </template>
      </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdList, updateStatus } from '../../../services/advertisement'
import { getSpaceById } from '../../../services/advert-sapce'

export default Vue.extend({
  name: 'advert-List',
  data () {
    return {
      formInline: {
        name: ''
      },
      advertList: [],
      sapceName: '',
      createTime: '',
      spaceList: {
        id: '',
        name: ''
      },
      endTime: '',
      status: 0,
      adverId: ''
    }
  },
  created () {
    this.loadAdLists()
    this.loadSpace()
  },
  methods: {
    async loadAdLists () {
      const { data } = await getAdList()
      console.log(data)
      this.advertList = data.content
      this.spaceId = data.content.spaceId
    },

    async loadSpace () {
    //   const { data } = await getAllSpaces()
    //   console.log(data)
      const { data } = await getSpaceById(this.spaceId)
      this.spaceList = data.content
      console.log(data)
    },
    async onStateChange (advertList: any) {
      await updateStatus({
        status: advertList.status,
        adverId: advertList.adverId
      })

      // console.log(data)
      this.$message.success(`${advertList.status === 0 ? '下线' : '上线'}成功`)
    }
  }
})
</script>

<style lang="scss" scoped></style>

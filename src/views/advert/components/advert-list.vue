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
       <!-- <template slot-scope="scope">
         <div :model="scope.row.spaceId" >
           <span>{{ sapceName}}</span>
        </div>
       </template>  -->
      </el-table-column>
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
  props: {
    spaceId: {
      type: Number || String
    }
  },
  data () {
    return {
      formInline: {
        name: ''
      },
      sapceId: '',
      advertList: [],
      sapceName: '',
      createTime: '',
      spaceList: {
        id: '',
        name: ''
      },
      endTime: '',
      status: 0,
      adverId: '',
      advertspace: []
    }
  },
  created () {
    this.loadAdLists()
    // this.loadSpace()
  },
  methods: {
    async loadAdLists () {
      const { data } = await getAdList()
      this.advertList = data.content
    },
    async onStateChange (advertList: any) {
      await updateStatus({
        status: advertList.status,
        adverId: advertList.adverId
      })

      // console.log(data)
      this.$message.success(`${advertList.status === 0 ? '下线' : '上线'}成功`)
    },
    async getSpace (item: any) {
      // console.log(item.spaceId)
      const { data } = await getSpaceById(item.spaceId)
      console.log(data)
    }
  }
})
</script>

<style lang="scss" scoped></style>

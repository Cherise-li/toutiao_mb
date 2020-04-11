<template>
  <div class="home">
    <van-tabs >
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
      <ArticalList :channel='item'></ArticalList>
   </van-tab>
</van-tabs>
  </div>
</template>

<script>

import { getChannels } from '@/api/channels.js'
import ArticalList from './articalList.vue'
export default {
  name: 'Home',
  data () {
    return {
      channels: []
    }
  },
  components: {
    ArticalList
  },
  created () {
    this.hChannels()
  },
  methods: {
    async hChannels () {
      try {
        const { data: { data } } = await getChannels()
        this.channels = data.channels
        console.log(data)
      } catch (err) {
        this.$toast.fail('获取频道失败')
      }
    }
  }
}
</script>

<style scoped lang='less'></style>

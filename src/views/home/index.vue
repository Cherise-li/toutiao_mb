<template>
  <div class="home">
    <van-tabs v-model="channelId">
      <van-tab v-for="(item,index) in channels" :title="item.name" :key="index">
        <ArticalList :channel='item' @showMoreAction='hMoreAction'></ArticalList>
      </van-tab>
    </van-tabs>
    <van-popup style="width: 80%" v-model="show">
        <more-action @dislike = 'hDislike' @report='hReport' ref="getDom"></more-action>
    </van-popup>
    <div class="bar-btn" @click="showChannelEdit = true">
        <van-icon name="wap-nav" size="24" />
    </div>
    <van-action-sheet   title="编辑频道" v-model="showChannelEdit">
        <channel-edit :channels='channels' @changeChannel='hChangeChannel' @close='showChannelEdit=false'></channel-edit>
    </van-action-sheet>
  </div>
</template>

<script>

import { getChannels } from '@/api/channels.js'
import MoreAction from './moreaction'
import ArticalList from './articalList.vue'
import ChannelEdit from './channelEdit'
import { disArtical, repArtical } from '@/api/artical.js'
export default {
  name: 'Home',
  data () {
    return {
      channels: [],
      show: false,
      articalId: null,
      channelId: 0,
      showChannelEdit: false
    }
  },
  components: {
    ArticalList,
    MoreAction,
    ChannelEdit
  },
  created () {
    this.hChannels()
  },
  methods: {
    hChangeChannel (channel) {
      const idx = this.channels.findIndex(it => it.id === channel.id)
      console.log(idx)
      console.log(channel)
      this.channelId = idx
    },
    async hReport (channelId) {
      await repArtical(this.articalId, channelId)
      this.show = false
      this.$toast.success('操作成功')
      this.$eventBus.$emit('delArtical', {
        articalId: this.articalId,
        channelId: this.channelId
      })
    },
    async hDislike () {
      await disArtical(this.articalId)
      this.show = false
      this.$toast.success('操作成功')
      // 去artical中删除对应的文章
      this.$eventBus.$emit('delArtical', {
        articalId: this.articalId,
        channelId: this.channelId
      })
    },
    hMoreAction (articalId) {
      console.log()
      this.show = true
      this.articalId = articalId
      if (this.$refs.getDom) {
        this.$refs.getDom.isReport = false
      }
    },
    async hChannels () {
      try {
        const { data: { data } } = await getChannels()
        console.log(data.channels)
        this.channels = data.channels
        console.log(this.channels)
      } catch (err) {
        this.$toast.fail('获取频道失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.bar-btn{
    position: fixed;
    right: 5px;
    top: 52px;
    display: flex;
    align-items: center;
    background-color: #fff;
    opacity: 0.8;
    z-index:1
}
</style>

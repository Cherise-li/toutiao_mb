<template>
   <div class="channel-edit">
    <div class="channel">
      <van-cell title="我的频道" :border="false">
          <van-button  size="mini" type="info">{{'编辑'}}</van-button>
      </van-cell>
      <van-grid v-if="channels.length>0">
        <van-grid-item v-for="item in channels" :key="item.id" @click="changeChannel(item)">
            {{channels}}
          <span>{{item.name}}</span>
          <van-icon v-if="editing" name="cross" class="btn"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item v-for="(item,index) in recommendChannel" :key="index" >
          <span>{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  name: 'channelEdit',
  props: {
    channels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      editing: false,
      allChannels: []
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    changeChannel (channel) {
      this.$emit('changeChannel', channel)
      this.$emit('close')
    },
    async getAllChannels () {
      const { data: { data } } = await getAllChannels()
      this.allChannels = data.channels
    }
  },
  computed: {
    recommendChannel () {
      return this.allChannels.filter(channel => {
        const idx = this.channels.findIndex(item => {
          item.id = channel.id
        })
        return idx === -1
      })
    }
  }
}
</script>

<style scoped lang='less'>
.channel{
  padding:15px;
  font-size:14px;
}
  .btn {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 24px;
}
</style>

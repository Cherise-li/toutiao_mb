<template>
   <div class="channel-edit">
    <div class="channel">
      <van-cell title="我的频道" :border="false">
          <van-button  size="mini" type="info" @click="editing=!editing">{{editing ? '取消' : '编辑'}}</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item
          v-for="(item, idx) in channels"
          :key="item.id"
          @click="changeChannel(item)"
          :class="{'cur': idx === activeIndex}">
          <span >{{item.name}}</span>
          <!-- 推荐不能删除 -->
          <van-icon v-if="editing && idx !== 0" name="cross" class="btn"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item
        v-for="(item,index) in recommendChannel"
        :key="index"
        @click="addChannel(item)">
          <span>{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels, addNewChannel, delChannel } from '@/api/channels'
export default {
  name: 'channelEdit',
  props: {
    channels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 是否处于编辑状态
      editing: false,
      // 所有的频道列表
      allChannels: []
    }
  },
  created () {
    this.getAllChannels()
    console.log(this.channels)
  },
  methods: {
    async addChannel (channel) {
      const myChannels = [...this.channels, channel]
      const channels = myChannels.map((it, idx) => {
        return {
          id: it.id,
          seq: idx
        }
      })
      channels.splice(0, 1)
      await addNewChannel(channels)
      this.channels.push(channel)
    },
    async changeChannel (channel) {
      // 如果是非编辑状态,修改父组件index.vue的当前频道项
      // 如果是正在编辑的状态,要做删除频道
      if (this.editing) {
        // 参数是一个数组?
        await delChannel(channel.id)
        // 如果上面操作没有错误,那么更新视图从当前频道删除这个值
        // 1. 找出当前当前的下标
        const indx = this.channels.findIndex(it => it.id === channel.id)
        // 2. 找到后删除
        if (indx !== -1) {
          this.channels.splice(indx, 1)
        }
        // 如果当前删除的频道在活动频道之前,则要把活动频道的下标减1
        // 为什么不能直接改this.activeIndex - 1,因为activeIndex是通过props属性是从父组件继承来的,子组件是不能改变父组件的简单类型的值得,所以需要通过抛一个事件去父组件中去修改index
        this.$emit('changeIndex', this.activeIndex - 1)
      } else {
        this.$emit('changeChannel', channel)
        this.$emit('close')
      }
    },
    async getAllChannels () {
      const { data: { data } } = await getAllChannels()
      this.allChannels = data.channels
    }
  },
  computed: {
    recommendChannel () {
      return this.allChannels.filter(channel => {
        const idx = this.channels.findIndex(item =>
          item.id === channel.id
        )
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
.cur {
    color: red;
}
</style>

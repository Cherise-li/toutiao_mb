<template>
  <div class='artical'>
    <van-pull-refresh v-model="isLoadingNew"  @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
  <van-cell
  v-for="item in list"
  :key="item.id"
  :title="item.title"
  @click="$router.push('/artical/'+item.art_id)">
       <div slot="label">
                <van-grid :border="false" :column-num="item.cover.images.length">
                    <van-grid-item v-for="(img, index) in item.cover.images" :key="index">
                        <van-image height="80" :src="img" lazy-load />
                    </van-grid-item>
                </van-grid>
                <div class="meta">
                    <span>{{ item.aut_name }}</span>
                    <span>{{ item.comm_count }}评论</span>
                    <span>{{ item.pubdate | relativeTime }}</span>
                    <span class="close" v-if="$store.state.token" @click.stop="hMoreAction(item.art_id)">
                       <van-icon name="cross"></van-icon>
                    </span>
                </div>
            </div>
  </van-cell>
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { getArticals } from '@/api/artical.js'
export default {
  name: 'artical',
  props: ['channel'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isLoadingNew: false
    }
  },
  created () {
    this.delArtical()
  },
  methods: {
    delArtical () {
      this.$eventBus.$on('delArtical', (data) => {
        if (data.channelId === this.channel.id) {
          const idx = this.list.findIndex(item =>
            item.art_id.toString() === data.articalId
          )
          if (idx !== -1) {
            this.list.splice(idx, 1)
          }
        }
      })
    },
    hMoreAction (JsonBigObj) {
      this.$emit('showMoreAction', JsonBigObj.toString())
    },
    async onRefresh () {
      const { data: { data } } = await getArticals({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      this.list.unshift(...data.results)
      const msg = data.results.length ? `刷新成功${data.results.length}条` : '已经是最新的了'
      this.$toast(msg)
      this.isLoadingNew = false
    },
    async onLoad () {
      const { data: { data } } = await getArticals({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      console.log(data)
      this.list.push(...data.results)
      this.timestamp = data.pre_timestamp
      // 加载状态结束
      this.loading = false
      if (data.results.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang='less'>
.meta {
  display: flex;
  span {
    margin-right:10px;
  }
  .close {
    margin-left: auto;
  }
}
</style>

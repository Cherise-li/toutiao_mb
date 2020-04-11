<template>
  <div class='artical'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
  <van-cell v-for="item in list" :key="item.id" :title="item.title">
       <div slot="label">
                <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="(img, index) in item.cover.images" :key="index">
                        <van-image height="80" :src="img"  />
                    </van-grid-item>
                </van-grid>
                <div class="meta">
                    <span>{{ item.aut_name }}</span>
                    <span>{{ item.comm_count }}评论</span>
                    <span>{{ item.pubdate  }}</span>
                </div>
            </div>
  </van-cell>
</van-list>
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
      timestamp: null
    }
  },
  methods: {
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

<style scoped lang='less'></style>

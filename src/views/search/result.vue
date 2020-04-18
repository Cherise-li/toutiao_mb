<template>
  <div class="serach-result">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="$route.query.keyword+ '的搜索结果'"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, idx) in list"
        :key="idx"
        :title="item.title"
        @click="$router.push('/artical/'+item.art_id)"
      />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      params: {
        page: 1,
        per_page: 10,
        q: this.$route.query.keyword
      }
    }
  },

  methods: {
    async onLoad () {
      const { data: { data } } = await getSearchResult(this.params)
      this.list.push(...data.results)
      this.page++
      this.loading = false
      if (data.results.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3196fa;
  .van-nav-bar__title {
    color: #fff;
  }
  // 搜索结果页 后退按钮为白色
  .van-icon{
    color:#fff;
  }
}
</style>

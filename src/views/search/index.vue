<template>
<div>
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
      <van-search
        show-action
        placeholder="请输入搜索关键词"
        shape="round"
        v-model.trim="keyword"
        @input="hSearch"
      ><div slot="action" @click="addSearchHistory">搜索</div></van-search>

    <!-- 联想建议 -->
    <van-cell-group v-if="keyword">
      <van-cell
      v-for=" (item, idx) in cSerSuggest"
      :key="idx"
      icon="search"
      @click="addSuggestHistory(idx)">
      <div v-html="item"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delelte"></van-icon>
      </van-cell>
      <van-cell
      v-for="(item,idx) in searchHistory"
      :title="item"
      :key="idx"
      @click="clickHistory(item)">
        <van-icon name="close" @click.stop="delSearchHistory(idx)"/>
      </van-cell>
    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { getSuggest } from '@/api/search.js'
import { getItem, setItem } from '@/utils/storage.js'
export default {
  name: 'Search',
  data () {
    return {
      timer: null,
      keyword: '',
      serSuggest: [],
      searchHistory: getItem('searchHistories') || []
    }
  },
  watch: {
    searchHistory (newVal, oldVal) {
      setItem('searchHistories', newVal)
    }
  },
  computed: {
    cSerSuggest () {
      const reg = new RegExp(this.keyword, 'gi')
      return this.serSuggest.map(it => {
        const str = it.replace(reg, function (obj) {
          return `<span style='color:red'>${obj}</span>`
        })
        return str
      })
    }
  },
  methods: {
    // 删除搜索历史,由于计算属性的原因,所以我们要根据索引去serSuggest中获取真正的搜索内容
    delSearchHistory (idx) {
      this.searchHistory.splice(idx, 1)
    },
    clickHistory (str) {
      this.addHistoryAndJump(str)
    },
    addSuggestHistory (idx) {
      const str = this.serSuggest[idx]
      this.addHistoryAndJump(str)
    },
    addSearchHistory () {
      this.addHistoryAndJump(this.keyword)
    },
    addHistoryAndJump (str) {
      const idx = this.searchHistory.findIndex(it => it === str)
      if (idx !== -1) {
        this.searchHistory.splice(idx, 1)
      }
      this.searchHistory.unshift(str)
      this.keyword = null
      setTimeout(() => {
        this.$router.push({
          name: 'searchResult',
          query: {
            keyword: str
          }
        })
      })
    },
    // 节流
    hSearch () {
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.timer = null
          if (!this.keyword) {
            return
          }
          const { data: { data } } = await getSuggest(this.keyword)
          this.serSuggest = data.options
        }, 0.3 * 1000)
      }
    }
    // 防抖
    // hSearch () {
    //   console.log(`清除定时器${this.timer}`)
    //   if (this.timer) {
    //     clearTimeout(this.timer)
    //   }
    //   this.timer = setTimeout(async () => {
    //     if (!this.keyword) {
    //       return
    //     }
    //     const { data: { data } } = await getSuggest(this.keyword)
    //     this.serSuggest = data.options
    //   }, 3 * 1000)
    // }
  }
}
</script>

<style lang="" scoped>

</style>

<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, idx) in list"
        :key="idx"
        :title="item.aut_id"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate | relativeTime}}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入评论内容"
        v-model.trim="commentText"
      >
        <van-button
        slot="button"
        size="mini"
        type="info"
        @click="pubComment">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getCommentOrReply, addComment } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      commentText: '',
      list: [], // 评论列表
      offset: null, // 列表数据的偏移量,类似分页的效果
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },

  methods: {
    async  pubComment () {
      if (!this.commentText) {
        return
      }
      const { data: { data } } = await addComment({
        target: this.articleId,
        content: this.commentText
      })
      this.list.unshift(data.new_obj)
      console.log(data)
    },
    async onLoad () {
      const { data: { data } } = await getCommentOrReply({
        type: 'a',
        source: this.articleId,
        offset: this.offset
      })
      // 将数据添加到列表
      this.list.push(...data.results)
      this.loading = false
      if (data.results.length) {
        // 更新一下offset,这个值是后端要求,用啦做分页的,下一次请求要把上一次最后一个id传过去
        this.offset = data.results.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang='less'>
// 发表评论的区域是固定在下端的
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>

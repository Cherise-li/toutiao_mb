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
        :title="item.content"
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
            <van-button
            size="mini"
            type="default"
            @click="hReoly(item)"
            >回复{{item.reply_count}}</van-button>
          </p>
        </div>
        <van-icon
        slot="right-icon"
        @click="hLike(item)"
        :name="item.is_liking ? 'like' : 'like-o'" />
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
    <!-- 评论回复 -->
    <van-popup
    v-model="isReplyShow"
    round
    position="bottom"
    :style="{height:'85%'}">
      <comment-reply
      :comment = 'currentAutContent'
      v-if="isReplyShow"
      @close='isReplyShow=false'></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import {
  getCommentOrReply,
  addComment,
  cancelLike,
  addLike
} from '@/api/comment'
import CommentReply from './commentReply'
export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  components: {
    CommentReply
  },
  data () {
    return {
      currentAutContent: null,
      isReplyShow: false,
      commentText: '',
      list: [], // 评论列表
      offset: null, // 列表数据的偏移量,类似分页的效果
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },

  methods: {
    async hLike (item) {
      const comId = item.com_id.toString()
      if (item.is_liking) {
        await cancelLike(comId)
        // 取消喜欢
      } else {
        // 添加喜欢
        await addLike(comId)
      }
      item.is_liking = !item.is_liking
    },
    hReoly (item) {
      this.currentAutContent = item
      this.isReplyShow = true
    },
    async  pubComment () {
      if (!this.commentText) {
        return
      }
      const { data: { data } } = await addComment({
        target: this.articleId,
        content: this.commentText
      })
      this.list.unshift(data.new_obj)
      this.commentText = ''
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
        this.offset = data.last_id
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

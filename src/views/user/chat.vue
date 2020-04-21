<template>
    <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div class="chat-list" ref="list">
      <div class="chat-item"
        v-for="(item, idex) in list"
        :key="idex"
        :class="item.name === 'xz' ? 'left' : 'right'">
        <van-image
        fit="cover"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        v-if="item.name === 'xz'"/>
        <div class="chat-pao">{{item.msg}}</div>
        <van-image
        v-if="item.name === 'me'"
        fit="cover"
        round
        :src='$store.state.photo'/>
      </div>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="word" placeholder="说点什么...">
        <span  @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'UserChat',
  data () {
    return {
      word: '',
      list: [
        { name: 'xz', msg: '你好!我是小智', timestamp: Date.now() }
      ]
    }
  },
  created () {
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.$store.state.token.token
      }
    })
    // on 是监听事件,connect是固定名称,就表示和服务器成功建立连接
    this.socket.on('connect', () => {
      console.log('与服务器成功建立连接')
    })
    // 收到服务器的回复
    this.socket.on('message', (data) => {
      this.list.push({
        name: 'xz',
        msg: data.msg,
        timestamp: data.timestamp
      })
      this.toBottom()
    })
  },
  methods: {
    toBottom () {
      this.$nextTick(() => {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight
      })
    },
    send () {
      if (!this.word) { return }
      const obj = {
        msg: this.word,
        timestamp: Date.now()
      }
      this.socket.emit('message', obj)
      this.list.push({
        name: 'me',
        msg: this.word,
        timestamp: Date.now()
      })
      this.toBottom()
      this.word = ''
    }
  }
}

</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>

<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow />
    <van-cell-group>
      <van-field
        v-model.trim="user.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errInfo.mobile"
      />
      <van-field
        v-model.trim="user.code"
        required
        clearable
        type="password"
        label="密码"
        placeholder="请输入密码"
        :error-message="errInfo.code"
      />
    </van-cell-group>
    <div class="btn-wrap">
      <van-button
        type="primary"
        round
        size="large"
        color="#3296fa"
        @click="hLogin"
        class="btn"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      errInfo: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkInfo (user) {
      if (user.mobile === '') {
        this.errInfo.mobile = '手机号不能为空'
        return false
      } else {
        this.errInfo.mobile = ''
      }
      if (user.code === '') {
        this.errInfo.code = '密码不能为空'
        return false
      } else {
        this.errInfo.code = ''
      }
      return true
    },
    async hLogin () {
      if (!this.checkInfo(this.user)) {
        return
      }
      this.$toast.loading({
        message: '登录中...',
        duration: 0,
        mask: true
      })
      try {
        const {
          data: { data }
        } = await login(this.user)
        this.$router.push('/')
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data)
      } catch (err) {
        const errMsg = err.response.data.message
        if (errMsg.mobile) {
          this.$toast.fail('手机号错误')
        } else {
          this.$toast.fail('登录错误')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.btn-wrap {
  padding: 20px;
  .btn {
    width: 100%;
    background-color: #6db4fb;
    color: #fff;
  }
}
</style>

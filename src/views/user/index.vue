<template>
  <div class="user">用户模块
    {{$store.state.token}}
  </div>
</template>

<script>
import { getInfo } from '@/api/user.js'
export default {
  name: 'User',
  created () {
    getInfo()
  }
}
</script>

<style scoped lang='less'></style>

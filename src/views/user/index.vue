<template>
  <div class="user">用户模块
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

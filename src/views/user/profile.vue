<template>
    <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" ></van-nav-bar>
     <input
        type="file"
        hidden
        @change="hFileChange"
        ref="file">
    <van-cell-group>
      <van-cell
      is-link
      title="头像"
      center
      @click="hChangePhoto">
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" :value="user.name" @click="showName=true"/>
      <van-cell is-link title="性别" :value="user.gender === 1?'男':'女'" @click="showGender=true"/>
      <van-cell is-link title="生日" :value="user.birthday" @click="showBirthday=true"/>
    </van-cell-group>

    <!-- 编辑区域 姓名-->
    <van-dialog
    @confirm="hSaveName"
    v-model="showName"
    title="修改名字"
    show-cancel-button>
      <van-field
      type="text"
      focus
      v-model.trim="newName"
      placeholder="请输入名字" />
    </van-dialog>

    <van-popup
    v-model="showGender"
    position="bottom">
      <van-nav-bar
          title="修改性别"
          left-text="取消"
          @click-left="showGender=false"
      >
      </van-nav-bar>

        <van-cell is-link title="男" @click="hChangeGender(1)" />
        <van-cell is-link title="女" @click="hChangeGender(0)" />
    </van-popup>

    <van-popup v-model="showBirthday" position="bottom">
      <van-nav-bar
        title="修改生日"
      >
      </van-nav-bar>
      <van-datetime-picker
        v-model="newDate"
        @confirm="hSaveBirthday"
        @cancel="showBirthday=false"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { getInfo, updateInfo, changePhoto } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'userProfile',
  created () {
    this.getInfo()
  },
  data () {
    return {
      showName: false,
      showGender: false,
      showBirthday: false,
      user: {},
      newName: '',
      newDate: new Date(),
      minDate: new Date(1965, 0, 1),
      maxDate: new Date()
    }
  },
  methods: {
    hChangePhoto () {
      this.$refs.file.click()
    },
    async hFileChange () {
      const file = this.$refs.file.files[0]
      if (!file) { return }
      const fd = new FormData()
      fd.append('photo', file)
      const { data: { data } } = await changePhoto(fd)
      this.user.photo = data.photo
    },
    async getInfo () {
      const { data: { data } } = await getInfo()
      this.user = data
    },
    async hSaveName () {
      if (!this.newName) {
        this.showName = false
        return
      }
      const { data: { data } } = await updateInfo({ name: this.newName })
      this.user.name = data.name
      this.showName = false
    },
    async hChangeGender (g) {
      const { data: { data } } = await updateInfo({ gender: g })
      this.user.gender = data.gender
      this.showGender = false
    },
    async hSaveBirthday () {
      const { data: { data } } = await updateInfo({ birthday: dayjs(this.newDate).format('YYYY-MM-DD') })
      this.user.birthday = data.birthday
      this.showBirthday = false
    }
  }
}
</script>

<style lang="less">
.van-nav-bar__text{
  color:#fff;
}
</style>

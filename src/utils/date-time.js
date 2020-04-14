import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(rTime)
export const relativeTime = function (time) {
  // 使用dayjs提供的api对用户传入的事件进行格式化

  return dayjs().to(dayjs(time))
}

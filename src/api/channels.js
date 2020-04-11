import request from '@/utils/request'
export function getChannels () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

import request from '@/utils/request'
/**
 * 获取用户频道
 */
export function getChannels () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
/**
 * 获取所有频道
 */
export function getAllChannels () {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

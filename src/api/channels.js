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
/**
 * 批量修改用户频道列表
 */
export function addNewChannel (channels) {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
/**
 * 删除用户频道
 */
export function delChannel (channel) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channel}`,
    data: {
      target: channel
    }
  })
}

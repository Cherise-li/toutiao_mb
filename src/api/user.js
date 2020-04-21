// 把所有的用户操作的功能全部写在这里
import request from '@/utils/request'
/**
 * 用户登录
 * @param {Object} user 用户信息
 */
export function login (user) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: user
  })
}
/**
 * 退出登录
 * @param {*} user 用户信息
 */
export function logout (user) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: user
  })
}
/**
 * 获取用户信息
 */
export function getInfo () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
/**
 * 获取指定用户信息
 * @param {*} data
 */
export function getMyInfo () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
/**
 * 修改用户信息
 * @param {*} userId
 */

export function updateInfo (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
/**
 * 关注用户
 */
export function follow (userId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
/**
 * 取关用户
 */
export function unFollow (userId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
/**
 * 修改用户头像
 */
export function changePhoto (photo) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data: photo
  })
}

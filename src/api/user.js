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

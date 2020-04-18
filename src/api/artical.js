import request from '@/utils/request'
/**
 * 获取文章列表信息
 * @param {*} data 频道id
 */
export const getArticals = (data) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: data
  })
}
export const disArtical = articalId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articalId
    }
  })
}
export const repArtical = (articalId, channelId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: {
      target: articalId,
      type: channelId
    }
  })
}
/**
 * 获取文章详情
 */
export const getArticalDetail = (articalId) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articalId}`
  })
}
/**
 * 给文章点赞
 */
export function addLike (articalId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articalId
    }
  })
}
/**
 * 取消对文章点赞
 */
export function cancelLike (articalId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articalId}`
  })
}
/**
 * 对文章喜欢
 */
export function cancelLove (articalId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${articalId}`
  })
}
/**
 * 对文章不喜欢
 */
export function disLove (articalId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articalId
    }
  })
}

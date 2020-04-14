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

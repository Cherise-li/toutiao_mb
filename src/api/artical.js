import request from '@/utils/request'
/**
 * 获取文章列表信息
 * @param {*} data 频道id
 */
export const getArticals = (data) => {
  return request({
    type: 'GET',
    url: '/app/v1_1/articles',
    params: data
  })
}

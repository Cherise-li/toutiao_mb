
import request from '@/utils/request'
/**
 * 获取系统提示的搜索建议
 */
export function getSuggest (data) {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: { q: data }
  })
}
/**
 * 获取搜索结果
 */
export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: params
  })
}

import request from '@/utils/request'
/**
 * 获取评论或评论回复
 */
export function getCommentOrReply (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
/**
 * 发表评论
 */
export function addComment (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}

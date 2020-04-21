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
/**
 * 取消对文章评论的喜欢
 */
export function cancelLike (comId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${comId}`
  })
}
/**
 * 对评论的回复点赞
 */
export function addLike (comId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: comId
    }
  })
}

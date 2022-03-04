import utilCommon from '@/util/common'
import utilUri from '@/util/uri'
import client from './client'

export default {
  getPosts: (serviceId, identifer = '', params = {}, token = null) => {
    return new Promise((resolve, reject) => {
      const options = utilUri.getReqOptions(params, token)
      const uri = identifer ? `admin/posts/${serviceId}/${identifer}` : `admin/posts/${serviceId}`
      client.get(uri, options)
        .then((res) => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  headPostBySlug: (serviceId, identifer = '', token = null) => {
    return new Promise((resolve, reject) => {
      const options = utilUri.getReqOptions(null, token)
      const uri = `admin/posts/${serviceId}/${identifer}`
      client.head(uri, options)
        .then((res) => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  createPost: (serviceId, vals, token = null) => {
    return new Promise((resolve, reject) => {
      const options = utilUri.getReqOptions(null, token)
      const uri = `admin/posts/${serviceId}`
      client.post(uri, vals, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  editPost: (serviceId, slug, vals, token = null) => {
    return new Promise((resolve, reject) => {
      if (utilCommon.isEmpty(vals)) throw new Error('No value')
      const options = utilUri.getReqOptions(null, token)
      const uri = `admin/posts/${serviceId}/${slug}`
      client.post(uri, vals, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },
}


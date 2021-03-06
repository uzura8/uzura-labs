import utilCommon from '@/util/common'
import utilUri from '@/util/uri'
import client from './client'

export default {
  getServices: (identifer = '', params = {}, token = null) => {
    return new Promise((resolve, reject) => {
      const options = utilUri.getReqOptions(params, token)
      const uri = identifer ? `admin/services/${identifer}` : `admin/services`
      client.get(uri, options)
        .then((res) => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  createService: (vals, token = null) => {
    return new Promise((resolve, reject) => {
      const options = utilUri.getReqOptions(null, token)
      const uri = 'admin/services'
      client.post(uri, vals, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  updateService: (serviceId, vals, token = null) => {
    return new Promise((resolve, reject) => {
      const options = utilUri.getReqOptions(null, token)
      const uri = `admin/services/${serviceId}`
      client.post(uri, vals, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  getUsers: (identifer = '', params = {}, token = null) => {
    return new Promise((resolve, reject) => {
      const options = utilUri.getReqOptions(params, token)
      const uri = identifer ? `admin/users/${identifer}` : `admin/users`
      client.get(uri, options)
        .then((res) => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  updateUser: (username, vals, token = null) => {
    return new Promise((resolve, reject) => {
      if (utilCommon.isEmpty(vals)) throw new Error('No value')
      const options = utilUri.getReqOptions(null, token)
      const uri = `admin/users/${username}`
      client.post(uri, vals, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

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

  updatePost: (serviceId, identifer, vals, token = null) => {
    return new Promise((resolve, reject) => {
      if (utilCommon.isEmpty(vals)) throw new Error('No value')
      const options = utilUri.getReqOptions(null, token)
      const uri = `admin/posts/${serviceId}/${identifer}`
      client.post(uri, vals, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  updatePostStatus: (serviceId, identifer, postStatus, token = null) => {
    return new Promise((resolve, reject) => {
      const vals = { 'status': postStatus }
      const options = utilUri.getReqOptions(null, token)
      const uri = `admin/posts/${serviceId}/${identifer}/status`
      client.post(uri, vals, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  deletePost: (serviceId, identifer, token = null) => {
    return new Promise((resolve, reject) => {
      const options = utilUri.getReqOptions(null, token)
      const uri = `admin/posts/${serviceId}/${identifer}`
      client.delete(uri, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  getAccountServices: (params = {}, token = null) => {
    return new Promise((resolve, reject) => {
      const options = utilUri.getReqOptions(params, token)
      const uri = 'admin/account/services'
      client.get(uri, options)
        .then((res) => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}


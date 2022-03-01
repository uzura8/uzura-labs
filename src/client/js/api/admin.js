import utilUri from '@/util/uri'
import client from './client'

export default {
  getPosts: (serviceId, identifer = '', params = {}, token = null) => {
    return new Promise((resolve, reject) => {
      const options = utilUri.getReqOptions(params, token)
      const uri = identifer
        ? `admin/posts/${serviceId}/${identifer}`
        : `admin/posts/${serviceId}`
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

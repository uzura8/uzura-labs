import * as types from './mutation-types'
import { Admin } from '@/api'
import util from '@/util/common'
import siteUtil from '@/util/site'

export default {
  setHeaderMenuOpen: ({ commit }, isOpen) => {
    commit(types.SET_COMMON_HEADER_MENU_OPEN, isOpen)
  },

  setLoading: ({ commit }, isLoading) => {
    commit(types.SET_COMMON_LOADING, isLoading)
  },
}


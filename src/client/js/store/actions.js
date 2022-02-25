import * as types from './mutation-types'

export default {
  setHeaderMenuOpen: (ctx, isOpen) => {
    ctx.commit(types.SET_COMMON_HEADER_MENU_OPEN, isOpen)
  },

  setLoading: (ctx, isLoading) => {
    ctx.commit(types.SET_COMMON_LOADING, isLoading)
  },

  setAdminUser: async (ctx, payload) => {
    ctx.commit(types.SET_ADMIN_USER, payload)
  },
}


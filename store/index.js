import request from '../lib/request';

export const state = () => ({
  authInfo: {user_id: '12'},
  currentPath: '1-1'
})

export const mutations = {
  setAuthInfo( state, data ) {
    state.authInfo = data.authInfo;
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch, commit }, { req, res }) {
    console.log('sessionData:', req.session);
    if (req.session && req.session.authInfo) {
      commit('setAuthInfo', {
        authInfo: req.session.authInfo
      })
    }
  },
}
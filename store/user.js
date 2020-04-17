export const state = () => ({
  token: '',
  currentUser: ''
})

export const mutation = () => ({
  isAuthenticated: (state) => !!state.token
})
export const mutations = {
  updateUser(state) {
    state.token = this.$cookies.get('gh-token') || ''
    state.currentUser = this.$cookies.get('gh-user') || ''
  }
}
export const actions = {
  loginUser(context, payload) {
    this.$cookies.set('gh-token', payload.api_token)
    this.$cookies.set('gh-user', payload)
    context.commit('updateUser')
  },
  logOut(context) {
    this.$cookies.remove('gh-token')
    this.$cookies.remove('gh-user')
    context.commit('updateUser')
  }
}

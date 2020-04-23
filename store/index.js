export const actions = {
  async nuxtServerInit(vuexContext) {
    await vuexContext.commit('user/updateUser')
  }
}

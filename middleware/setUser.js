// can be replaced by the store/index the nuxtServerInit method
export default function({ store }) {
  store.commit('user/updateUser')
}

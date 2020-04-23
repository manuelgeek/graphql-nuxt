<template>
  <div class="container">
    <div>
      <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <logo :avatar="user.avatar" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ user.name }}</div>
          <p class="text-gray-700 text-base">
            {{ user.email }}
          </p>
        </div>
        <div class="px-6 py-4">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            <button class="modal-open">{{ button_2 }}</button>
          </span>
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            <nuxt-link to="/wines">All Wines</nuxt-link>
          </span>
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            <a href="#" @click.prevent="logout">{{ button }}</a>
          </span>
        </div>
      </div>
    </div>

    <!--Modal-->
    <upload-modal />
  </div>
</template>

<script>
import UploadModal from '../components/UploadModal'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo,
    UploadModal
  },
  data() {
    return {
      button: 'Logout',
      button_2: 'Change Avatar'
    }
  },
  computed: {
    user() {
      // console.log(this.$store.state)
      return this.$store.state.user.currentUser
    }
  },
  middleware: 'auth',
  methods: {
    logout() {
      this.button = 'Logging out ...'
      const query = `mutation { logOut(logout: true) }`
      this.$axios.post('/', { query }).then((response) => {
        if (response.data.data) {
          const vm = this
          this.$store.dispatch('user/logOut').then((_e) => {
            vm.$router.push('/login')
          })
        }
      })
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

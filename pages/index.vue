<template>
  <div class="container">
    <div>
      <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <logo />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ user.name }}</div>
          <p class="text-gray-700 text-base">
            {{ user.email }}
          </p>
        </div>
        <div class="px-6 py-4">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >About Me</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  middleware: 'auth',
  computed: {
    user() {
      // console.log(this.$store.state)
      return this.$store.state.user.currentUser
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

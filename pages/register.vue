<template>
  <div class="w-full h-full max-w-xs  self-center">
    <div class="row-start-2 row-span-2 text-blue-600 text-center">
      <h3 class="text-5xl">Register Page</h3>
    </div>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Name
        </label>
        <input
          id="username"
          v-model="form.name"
          :class="[
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
            errors.name ? 'border-red-500' : ''
          ]"
          type="text"
          placeholder="Name"
        />
        <p v-if="errors.name" class="text-red-500 text-xs italic">
          {{ errors.name[0] }}
        </p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          id="email"
          v-model="form.email"
          :class="[
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ',
            errors.email ? 'border-red-500' : ''
          ]"
          type="email"
          placeholder="Email"
        />
        <p v-if="errors.email" class="text-red-500 text-xs italic">
          {{ errors.email[0] }}
        </p>
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          id="password"
          v-model="form.password"
          :class="[
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ',
            errors.password ? ' border-red-500' : ''
          ]"
          type="password"
          placeholder="Password"
        />
        <p v-if="errors.password" class="text-red-500 text-xs italic">
          {{ errors.password[0] }}
        </p>
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password_c"
        >
          Password Confirm
        </label>
        <input
          id="password_c"
          v-model="form.password_confirmation"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="registerUser"
        >
          {{ button }}
        </button>
        <nuxt-link
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="/login"
        >
          Sign In?
        </nuxt-link>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2020 All rights reserved.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      button: 'Sign Up',
      errors: []
    }
  },
  methods: {
    registerUser() {
      this.button = 'Signing In...'
      const query = `mutation {
        signUp(
        name: "${this.form.name}"
        email: "${this.form.email}"
        password: "${this.form.password}"
      ) {
        id,
        email,
        name,
        api_token
      }
    }`
      this.$axios.post('/auth', { query }).then((response) => {
        console.log(response.data)
        if (response.data.errors || response.data.data.signUp === null) {
          if (response.data.errors[0].extensions.category === 'extensions') {
            console.log('here')
            this.errors = response.data.errors[0].extensions.validation
            return
          }
          alert('AN Error occurred, try again !')
          return
        }
        const vm = this
        if (response.data.data) {
          this.$store
            .disparch('user/loginUser', response.data.data.signUp)
            .then((_e) => {
              vm.$router.push('/')
            })
        }
        this.button = 'Sign In'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

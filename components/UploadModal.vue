<template>
  <div
    class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>

    <div
      class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div
        class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
      >
        <svg
          class="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          ></path>
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">Update Avatar</p>
          <div class="modal-close cursor-pointer z-50">
            <svg
              class="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              ></path>
            </svg>
          </div>
        </div>

        <!--Body-->
        <div class="custom-file">
          <input
            id="uploadFile"
            ref="uploadFile"
            type="file"
            :class="[
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ',
              errors.profilePicture ? 'border-red-500' : ''
            ]"
            accept="image/*"
            @change="handleUploadChange"
          />
          <label class="custom-file-label" for="uploadFile">
            Drop Files Here to upload
          </label>
          <p v-if="errors.profilePicture" class="text-red-500 text-xs italic">
            {{ errors.profilePicture[0] }}
          </p>
        </div>

        <!--Footer-->
        <div class="flex justify-end pt-2">
          <button
            class="px-4 bg-gray-300 p-3 rounded-lg text-indigo-500 hover:bg-gray-500 hover:text-indigo-400 mr-2"
            type="button"
            @click="upload"
          >
            {{ button }}
          </button>
          <!--          <button-->
          <!--            class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"-->
          <!--          >-->
          <!--            Close-->
          <!--          </button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      button: 'Update',
      errors: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user.currentUser
    }
  },
  mounted() {
    const vm = this
    const openmodal = document.querySelectorAll('.modal-open')
    for (let i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener('click', function(event) {
        event.preventDefault()
        vm.toggleModal()
      })
    }

    const overlay = document.querySelector('.modal-overlay')
    overlay.addEventListener('click', this.toggleModal)

    const closemodal = document.querySelectorAll('.modal-close')
    for (let i = 0; i < closemodal.length; i++) {
      closemodal[i].addEventListener('click', this.toggleModal)
    }

    document.onkeydown = function(evt) {
      evt = evt || window.event
      let isEscape = false
      if ('key' in evt) {
        isEscape = evt.key === 'Escape' || evt.key === 'Esc'
      } else {
        isEscape = evt.keyCode === 27
      }
      if (isEscape && document.body.classList.contains('modal-active')) {
        vm.toggleModal()
      }
    }
  },
  methods: {
    handleUploadChange() {
      this.file = this.$refs.uploadFile.files[0]
    },
    async upload() {
      if (!this.file) {
        return
      }
      this.errors = []
      this.button = 'Uploading ...'
      // Creating form data object
      const bodyFormData = new FormData()
      bodyFormData.set(
        'operations',
        JSON.stringify({
          // Mutation string
          query: `mutation($file: Upload!) { UpdateUserProfilePhoto(profilePicture: $file){id, name, avatar, email, api_token} }`,
          variables: { attachment: this.file }
        })
      )
      bodyFormData.set('operationName', null)
      bodyFormData.set('map', JSON.stringify({ file: ['variables.file'] }))
      bodyFormData.append('file', this.file)

      // Post the request to GraphQL controller
      const response = await this.$axios.post('/', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (
        response.data.errors ||
        response.data.data.UpdateUserProfilePhoto === null
      ) {
        console.log(response.data)
        const cat = response.data.errors[0].extensions.category
        if (cat === 'validation') {
          this.errors = response.data.errors[0].extensions.validation
          this.button = 'Upload'
          return
        }
        this.$toast.error('Error occured, try again !')
        this.button = 'Upload'
        return
      }
      if (response.data.data) {
        console.log('response')
        this.$store
          .dispatch('user/loginUser', response.data.data.UpdateUserProfilePhoto)
          .then((_e) => {
            this.file = null
            this.clear()
            this.toggleModal()
            this.$toast.success('Avatar successfully upated')
          })
      }
      this.button = 'Upload'
    },
    clear() {
      const input = this.$refs.uploadFile
      input.type = 'text'
      input.type = 'file'
    },
    toggleModal() {
      const body = document.querySelector('body')
      const modal = document.querySelector('.modal')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-active')
    }
  }
}
</script>

<style lang="scss" scoped></style>

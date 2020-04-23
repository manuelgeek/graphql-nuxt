<template>
  <div class="h-full max-w-xs  self-center">
    <div>
      <div class="font-bold text-xl mb-2">
        All Wines
      </div>
      <nuxt-link
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        to="/"
        >Back</nuxt-link
      >
    </div>
    <div class="bg-white flex flex-wr">
      <p v-if="$fetchState.pending">Fetching posts...</p>
      <p v-else-if="$fetchState.error">
        Error while fetching posts: {{ $fetchState.error.message }}
      </p>
      <ul v-else class=" list-reset flex flex-col">
        <li
          v-for="(wine, $index) in wines.data"
          :key="$index"
          class=" rounded-t relative -mb-px block border p-4 border-grey"
        >
          {{ wine.description }}, {{ wine.color }}, {{ wine.grape_variety }},
          {{ wine.country }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  async fetch() {
    const query = `query
{
    wines (limit:10,page:1)
    {
        data{
            id,
            description,
            color,
            grape_variety,
            country
        },
        total,
        per_page,
        current_page
    }
}`
    await this.$axios.post('/', { query }).then((response) => {
      this.wines = response.data.data.wines
    })
  },
  data() {
    return {
      wines: []
    }
  },
  middleware: 'auth'
}
</script>

<style scoped></style>

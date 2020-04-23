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
      <ul class=" list-reset flex flex-col">
        <li class=" rounded-t relative -mb-px block border p-4 border-grey">
          Cras justo odio
        </li>
        <li class="relative -mb-px block border p-4 border-grey">
          Da pibus ac facilisis in
        </li>
        <li class="relative -mb-px block border p-4 border-grey">
          Morbi leo risus
        </li>
        <li class="relative -mb-px block border p-4 border-grey">
          Porta ac consectetur ac
        </li>
        <li class="rounded-b relative block border p-4 border-grey">
          Vestibulum at eros
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped></style>

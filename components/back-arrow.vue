<template>
  <nuxt-link :to="{ path: '/' } ">
    <v-img
      :lazy-src="src"
      max-height="60"
      max-width="60"
      contain
      :src="src"
      class="mb-2"
    />
  </nuxt-link>
</template>
<script>
export default {
  data() {
    return {
      src: require('~/assets/back-arrow.png'),
    }
  }
}
</script>
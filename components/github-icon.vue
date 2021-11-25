<template>
  <v-img 
    :src="src"
    contain
    max-height="20"
    max-width="20"
  />
</template>
<script>
export default {
  data() {
    return {
      src: require('~/assets/github.png'),
    }
  }
}
</script>

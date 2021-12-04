<template>
  <v-app dark>
    <v-main class="mb-10">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <v-container class="footer-container">
        <v-row justify="center" align="center" id="app">
          <v-row class="col-sm-8 col-md-6 col-12">
            <v-col cols="6" sm="6">
              <span>{{ footerText }} &copy; {{ new Date().getFullYear() }}</span>
            </v-col>
            <v-col cols="6" sm="6">
              <div class="footer-logo-container">
                <a :href="`https://twitter.com/${ $getConst('general.adminTwitterID') }`" target="blank" class="mr-3">
                  <TwitterIcon/>
                </a>
                <a href="https://github.com/kahilav2/twitter-dashboard-on-akash" target="blank">
                  <GithubIcon/>
                </a>
              </div>
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import GithubIcon from '~/components/github-icon.vue';
import TwitterIcon from '~/components/twitter-icon.vue';
export default {
  components: {
    TwitterIcon,
    GithubIcon,
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    footerText() {
      return this.$getConst('general.pageTitle');
    },
  }
}
</script>
<style lang="scss" scoped>
.footer-logo-container {
  display: flex;
  align-items: center;
}
.footer-container {
  min-height: 60px;
}
</style>
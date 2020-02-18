<template>
  <v-app id="inspire">
    <TheNavBar
      v-if="hasNavigationAndFooter"
    />

    <v-content>
      <v-container fluid>
        <router-view :key="$route.path" v-show="showPage" @ready="pageReady"/>
        <AppSpinner v-show="!showPage" />
      </v-container>
    </v-content>

    <v-footer v-if="hasNavigationAndFooter" class="footer" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheNavBar from '@/components/TheNavBar'

export default {
  components: {
    TheNavBar,
  },
  data: () => ({
    showPage: false,
  }),
  computed: {
    hasNavigationAndFooter () {
      return !['Login', 'Register'].includes(this.$route.name)
    },
  },
  methods: {
    pageReady () {
      this.showPage = true
    },
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false
      next()
    })
  },
}
</script>

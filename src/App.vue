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
    </v-footer>
  </v-app>
</template>

<script>
import TheNavBar from '@/components/TheNavBar'
import { mapActions } from 'vuex'

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
    jwt () {
      return this.$store.state.auth.jwt
    },
    user () {
      return this.$store.state.users.currentUser
    },
  },
  methods: {
    ...mapActions('users', ['loadCurrentUser']),
    pageReady () {
      this.showPage = true
    },
    loadUser () {
      if (this.jwt && !this.user) {
        this.loadCurrentUser()
      }
    },
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false
      next()
    })

    this.loadUser()
  },
}
</script>

<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar class="login-header" dark flat>
          <v-toolbar-title>Prijava</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field @keydown.enter="signIn" v-model="form.email" label="Email" name="login" prepend-icon="mdi-account" type="text" />

            <v-text-field @keydown.enter="signIn" v-model="form.password" id="password" label="Geslo" name="password" prepend-icon="mdi-lock" type="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="signIn">Prijava</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        email: null,
        password: null,
      },
    }
  },
  methods: {
    ...mapActions('auth', ['signInWithEmailAndPassword']),
    signIn () {
      this.signInWithEmailAndPassword(this.form)
        .then(() => this.successRedirect())
    },
    successRedirect () {
      const redirectTo = this.$route.query.redirectTo || { name: 'Home' }
      this.$router.push(redirectTo)
    },
  },
  created () {
    this.$emit('ready')
  },
}
</script>

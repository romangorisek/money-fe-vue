<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
    >

      <v-list-item class="profile-data">
        <v-list-item-avatar>
          <v-img src="https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-title v-if="user">
          {{user.name}}
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <component
          v-for="item of menuItems.filter(item => !!item)"
          :key="item.title"
          :itemData="item"
          :is="item.subItems ? 'TheNavBarListGroupItem' : 'TheNavBarListItem'"
        >
        </component>

      </v-list>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <v-list dense>
          <v-list-item :to="{name: 'Logout'}" exact>
            <v-list-item-action>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Odjava</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

    </v-navigation-drawer>

    <v-app-bar app class="header" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ currentLocation }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import TheNavBarListItem from './TheNavBarListItem'
import TheNavBarListGroupItem from './TheNavBarListGroupItem'

export default {
  components: {
    TheNavBarListItem,
    TheNavBarListGroupItem,
  },
  data () {
    return {
      drawer: true,
      businessUnitPicker: false,
      menuItems: [
        {
          title: 'Domov',
          icon: 'mdi-home',
          route: 'Home',
        }, {
          title: 'Transakcija',
          icon: 'mdi-cash-multiple',
          route: 'Transaction',
        }, {
          title: 'Poslovno',
          icon: 'mdi-account-tie-outline',
          route: 'Business',
        }, {
          title: 'Nastavitve',
          icon: 'mdi-settings-outline',
          route: 'Settings',
        },
      ],
    }
  },
  computed: {
    user () {
      return { name: 'Roman hardcoded' }
    },
    currentLocation () {
      return this.$route.name
    },
  },
  methods: {
    hideDrawerOnMobileDevices () {
      this.drawer = !this.$vuetify.breakpoint.smAndDown
    },
  },
  created () {
    this.hideDrawerOnMobileDevices()
  },
}
</script>

<template>
  <div>
    <v-tabs>
      <v-tab @click="showClients">Stranke</v-tab>
      <v-tab @click="showProjects">Projekti</v-tab>
    </v-tabs>
    <SettingsClients v-if="currentTab === 'clients'" />
    <SettingsProjects v-if="currentTab === 'projects'" />
  </div>
</template>

<script>
import SettingsClients from '@/components/SettingsClients'
import SettingsProjects from '@/components/SettingsProjects'

export default {
  components: {
    SettingsClients,
    SettingsProjects,
  },
  data () {
    return {
      currentTab: 'clients',
    }
  },
  methods: {
    showClients () {
      this.currentTab = 'clients'
    },
    showProjects () {
      this.currentTab = 'projects'
    },
  },
}
</script>

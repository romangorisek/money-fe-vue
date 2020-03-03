<template>
  <div>
    <v-expansion-panels
      v-model="clientPanel"
    >
      <v-expansion-panel v-for="client of clients" :key="client.id">
        <v-expansion-panel-header><b>{{client.title}}</b></v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-expansion-panels
              v-model="projectPanel"
            >
              <v-expansion-panel v-for="project of clientsProjects(client)" :key="project.id">
                <v-expansion-panel-header>
                  <div class="row">
                    <div class="col-4">{{project.title}}</div>
                    <div class="col-4"><span class="text--secondary">V dobro {{$moment().format('YYYY')}}:</span> {{project.incomeThisYear | priceWithSign}}</div>
                    <div class="col-4"><span class="text--secondary">Skupaj odprto:</span> <span :style="project.openThisYear > 0 ? 'color: red;' : 'color: green;'">{{project.openThisYear | priceWithSign}}</span></div>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  content
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    clients () {
      return Object.values(this.$store.state.clients.items).sort((a, b) => (a.title > b.title) ? 1 : -1)
    },
    projects () {
      return Object.values(this.$store.state.projects.items)
    },
  },
  data () {
    return {
      panel: [],
      clientPanel: [],
      projectPanel: [],
    }
  },
  created () {
    Promise.all([
      this.loadClients(),
      this.loadProjects(),
    ])
      .then(() => {
        this.$emit('ready')
      })
  },
  methods: {
    ...mapActions('clients', { loadClients: 'loadItems' }),
    ...mapActions('projects', { loadProjects: 'loadItems' }),
    clientsProjects (client) {
      return this.projects.filter(project => project.client_id === client.id)
    },
  },
}
</script>

<template>
  <div>
    <v-expansion-panels
      v-model="clientPanel"
    >
      <v-expansion-panel v-for="client of clients" :key="client.id">
        <v-expansion-panel-header class="font-weight-bold">{{client.title}}</v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-expansion-panels
              v-model="projectPanel"
            >
              <v-expansion-panel v-for="project of clientsProjects(client)" :key="project.id">
                <v-expansion-panel-header>
                  <div class="row">
                    <div class="col-4 font-weight-bold">{{project.title}}</div>
                    <div class="col-4"><span class="text--secondary">V dobro {{$moment().format('YYYY')}}:</span> {{project.incomeThisYear | priceWithSign}}</div>
                    <div class="col-4"><span class="text--secondary">Skupaj odprto:</span> <span :style="project.openThisYear > 0 ? 'color: red;' : 'color: green;'">{{project.openThisYear | priceWithSign}}</span></div>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <FormBusinessWork
                    :ref="`formBusinessWork-${project.id}`"
                    class="mb-4"
                    :project_id="project.id"
                    @save="saveBusinessWork"
                  />
                  <FormBusinessPayment
                    :ref="`formBusinessPayment-${project.id}`"
                    :project_id="project.id"
                    :paymentTypes="paymentTypes"
                    @save="saveBusinessPayment"
                  />

                  <div class="row">
                    <ListBusinessWork
                      :work="workFor(project)"
                    />
                    <ListBusinessPayments
                      :payments="paymentsFor(project)"
                      :paymentTypes="paymentTypes"
                    />
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import FormBusinessWork from '@/components/FormBusinessWork'
import FormBusinessPayment from '@/components/FormBusinessPayment'
import { mapActions } from 'vuex'

export default {
  components: {
    FormBusinessWork,
    FormBusinessPayment,
    ListBusinessWork: () => import('@/components/ListBusinessWork'),
    ListBusinessPayments: () => import('@/components/ListBusinessPayments'),
  },
  computed: {
    clients () {
      return Object.values(this.$store.state.clients.items).sort((a, b) => (a.title > b.title) ? 1 : -1)
    },
    projects () {
      return Object.values(this.$store.state.projects.items)
    },
    paymentTypes () {
      return Object.values(this.$store.state.paymentTypes.items)
    },
    payments () {
      return Object.values(this.$store.state.payments.items)
    },
    work () {
      return Object.values(this.$store.state.work.items)
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
      this.loadPaymentTypes(),
      this.loadPayments(),
      this.loadWork(),
    ])
      .then(() => {
        this.$emit('ready')
      })
  },
  methods: {
    ...mapActions('clients', { loadClients: 'loadItems' }),
    ...mapActions('projects', { loadProjects: 'loadItems', refreshProject: 'loadItem' }),
    ...mapActions('paymentTypes', { loadPaymentTypes: 'loadItems' }),
    ...mapActions('payments', { loadPayments: 'loadItems', addPayment: 'createItem' }),
    ...mapActions('work', { loadWork: 'loadItems', addWork: 'createItem' }),
    clientsProjects (client) {
      return this.projects.filter(project => project.client_id === client.id)
    },
    saveBusinessWork (work) {
      this.addWork(work)
        .then(response => {
          this.$refs[`formBusinessWork-${work.project_id}`][0].clear()
          this.loadProjects()
          this.$notify({
            type: 'success',
            text: 'Podatki so bili uspešno shranjeni.',
          })
        })
        .catch(anErr => {
          this.$notify({
            type: 'error',
            text: 'Prišlo je do napake pri shranjevanju podatkov.',
          })
        })
    },
    saveBusinessPayment (payment) {
      this.addPayment(payment)
        .then(response => {
          this.$refs[`formBusinessPayment-${payment.project_id}`][0].clear()
          this.loadProjects()
          this.$notify({
            type: 'success',
            text: 'Podatki so bili uspešno shranjeni.',
          })
        })
        .catch(anErr => {
          console.log(anErr)
          this.$notify({
            type: 'error',
            text: 'Prišlo je do napake pri shranjevanju podatkov.',
          })
        })
    },
    workFor (project) {
      const work = this.work.filter(work => work.project_id === project.id)
      return work.sort((a, b) => a.done_on_end < b.done_on_end ? 1 : -1)
    },
    paymentsFor (project) {
      const payments = this.payments.filter(payment => payment.project_id === project.id)
      return payments.sort((a, b) => a.done_on < b.done_on ? 1 : -1)
    },
  },
}
</script>

<template>
  <div>
    <v-tabs>
      <v-tab @click="showAccounts">Računi</v-tab>
      <v-tab @click="showExpenses">Odhodki</v-tab>
      <v-tab @click="showIncomes">Prihodki</v-tab>
    </v-tabs>
    <SettingsAccounts v-if="currentTab === 'accounts'" />
    <SettingsIncomes v-if="currentTab === 'incomes'" />
    <SettingsExpenses v-if="currentTab === 'expenses'" />
  </div>
</template>

<script>
import SettingsAccounts from '@/components/SettingsAccounts'
import SettingsIncomes from '@/components/SettingsIncomes'
import SettingsExpenses from '@/components/SettingsExpenses'

export default {
  components: {
    SettingsAccounts,
    SettingsIncomes,
    SettingsExpenses,
  },
  data () {
    return {
      currentTab: 'accounts',
    }
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    showAccounts () {
      this.currentTab = 'accounts'
    },
    showExpenses () {
      this.currentTab = 'incomes'
    },
    showIncomes () {
      this.currentTab = 'expenses'
    },
  },
}
</script>

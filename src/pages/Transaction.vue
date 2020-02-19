<template>
  <div>
    <FormTransaction
      :transactionTypes="transactionTypes"
      :accounts="accounts"
      @save="save"
      ref="form"
    />
  </div>
</template>

<script>
import FormTransaction from '@/components/FormTransaction'

export default {
  components: {
    FormTransaction,
  },
  computed: {
    transactionTypes () {
      return []
    },
    accounts () {
      return []
    },
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    createTransaction () {
      console.log('aaaaasadad')
    },
    save ({ data }) {
      this.createTransaction(data)
        .then(company => {
          this.$notify({
            type: 'success',
            text: 'Transakcija dodana',
          })
          this.$refs.form.clearForm()
        })
    },
  },
}
</script>

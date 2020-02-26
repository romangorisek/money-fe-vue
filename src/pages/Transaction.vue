<template>
  <div>
    <FormTransaction
      @save="save"
      ref="form"
    />
  </div>
</template>

<script>
import FormTransaction from '@/components/FormTransaction'
import { mapActions } from 'vuex'

export default {
  components: {
    FormTransaction,
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    ...mapActions('transactions', { createTransaction: 'createItem' }),
    save ({ data }) {
      this.createTransaction(data)
        .then(company => {
          this.$notify({
            type: 'success',
            text: 'Transakcija dodana',
          })
          this.$refs.form.clear()
        })
    },
  },
}
</script>

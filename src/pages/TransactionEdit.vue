<template>
  <div>
    <FormTransaction
      :transaction="transaction"
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
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    transaction () {
      return this.$store.state.transactions.items[this.id]
    },
  },
  methods: {
    ...mapActions('transactions', ['loadItem', 'updateItem']),
    save ({ data }) {
      this.updateItem({ id: this.id, ...data })
        .then(transaction => {
          this.$notify({
            type: 'success',
            text: 'Transakcija uspesno shranjena',
          })
          this.$refs.form.clear()
          this.$router.go(-1)
        })
    },
  },
  created () {
    this.loadItem(this.id)
      .then(loaded => {
        this.$emit('ready')
      })
  },
}
</script>

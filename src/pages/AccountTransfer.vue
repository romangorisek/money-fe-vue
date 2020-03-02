<template>
  <div>
    <FormAccountTransfer
      @save="save"
      ref="form"
    />
  </div>
</template>

<script>
import FormAccountTransfer from '@/components/FormAccountTransfer'
import { mapActions } from 'vuex'

export default {
  components: {
    FormAccountTransfer,
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    ...mapActions('accountTransfers', ['createItem']),
    save ({ data }) {
      this.createItem(data)
        .then(transfer => {
          this.$notify({
            type: 'success',
            text: 'Prenos dodan',
          })
          this.$refs.form.clear()
        })
    },
  },
}
</script>

import AWN from 'awesome-notifications'

export default {
  data () {
    return {
      notifier: new AWN({
        position: 'bottom-right',
        labels: {
          success: 'Akcija uspešna',
          warning: 'Opozorilo',
          error: 'Napaka',
        },
      }),
    }
  },
  methods: {
    $notify ({ type, text }) {
      if (type === 'success') {
        this.notifier.success(text)
      }
      if (type === 'warning') {
        this.notifier.warning(text)
      }
      if (type === 'error') {
        this.notifier.alert(text)
      }
    },
  },
}

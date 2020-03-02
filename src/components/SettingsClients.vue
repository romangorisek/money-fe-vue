<template>
  <div>
    <FormClient
      ref="formNew"
      @save="createNew"
    />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Ime</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in clients" :key="item.id">
            <td v-if="editMode !== item.id">{{ item.title }}</td>
            <td v-else class="td-input">
              <v-text-field
                class="input-without-details"
                solo
                dense
                v-model="form.title"
                label="Ime"
              ></v-text-field>
            </td>

            <td class="text-right" v-if="editMode !== item.id">
              <ButtonActionEdit @click="toggleEditMode(item)" />
              <ButtonActionDelete @click="removeItem(item)" />
            </td>
            <td class="text-right" v-else>
              <ButtonActionSave @click="editItem(item)" />
              <ButtonActionCancel @click="toggleEditMode(item)" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import FormClient from './FormClient'
import ButtonActionDelete from './ButtonActionDelete'
import ButtonActionEdit from './ButtonActionEdit'
import ButtonActionSave from './ButtonActionSave'
import ButtonActionCancel from './ButtonActionCancel'
import { loadItems, deleteItem } from '@/utils/crudFunctions'
import { mapActions } from 'vuex'

export default {
  components: {
    FormClient,
    ButtonActionDelete,
    ButtonActionEdit,
    ButtonActionSave,
    ButtonActionCancel,
  },
  data () {
    return {
      editMode: null,
      form: {
        title: null,
      },
    }
  },
  computed: {
    clients () {
      return Object.values(this.$store.state.clients.items)
    },
  },
  methods: {
    ...mapActions('clients', ['loadItems', 'createItem', 'updateItem', 'deleteItem']),
    createNew ({ data }) {
      this.createItem({ ...data })
        .then(item => {
          this.$notify({
            type: 'success',
            text: 'Podatki so bili uspešno shranjeni.',
          })
          this.$refs.formNew.clear()
        })
    },
    toggleEditMode (item) {
      if (this.editMode && this.editMode === item.id) {
        this.editMode = null
        this.form.id = null
        this.form.title = null
      } else {
        this.form.id = item.id
        this.form.title = item.title
        this.editMode = item.id
      }
    },
    editItem (item) {
      this.updateItem({ ...this.form })
        .then(item => {
          this.toggleEditMode(item)
          this.$notify({
            type: 'success',
            text: 'Podatki so bili uspešno shranjeni.',
          })
        })
    },
    removeItem (item) {
      deleteItem(item, this)
    },
  },
  created () {
    loadItems(this)
  },
}
</script>

<style lang="scss">
  .input-without-details .v-text-field__details {
    display: none;
  }
  .v-data-table td {
    width: 80%;
  }
  .v-data-table td.td-input {
    padding: 0px;
    padding-left: 2px;
  }
</style>

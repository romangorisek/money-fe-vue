<template>
  <div>
    <FormProject
      v-if="clients.length"
      ref="formNew"
      :clients="clients"
      @save="createNew"
    />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Ime</th>
            <th class="text-left">Stranka</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in projects" :key="item.id">
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

            <td v-if="editMode !== item.id">{{ clientName(item.client_id) }}</td>
            <td v-else class="td-input">
              <v-select
                :items="clients"
                item-text="title"
                item-value="id"
                v-model="form.client_id"
                label="Stranka"
              ></v-select>
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
import FormProject from './FormProject'
import ButtonActionDelete from './ButtonActionDelete'
import ButtonActionEdit from './ButtonActionEdit'
import ButtonActionSave from './ButtonActionSave'
import ButtonActionCancel from './ButtonActionCancel'
import { deleteItem } from '@/utils/crudFunctions'
import { mapActions } from 'vuex'

export default {
  components: {
    FormProject,
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
        client_id: null,
      },
    }
  },
  computed: {
    projects () {
      return Object.values(this.$store.state.projects.items)
    },
    clients () {
      return Object.values(this.$store.state.clients.items)
    },
  },
  methods: {
    ...mapActions('projects', ['loadItems', 'createItem', 'updateItem', 'deleteItem']),
    ...mapActions('clients', { loadClients: 'loadItems' }),
    clientName (id) {
      const client = this.clients.find(client => client.id === id)
      if (client) {
        return client.title
      }
      return ''
    },
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
        this.form.client_id = null
      } else {
        this.form.id = item.id
        this.form.title = item.title
        this.editMode = item.id
        this.form.client_id = item.client_id
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
    Promise.all([
      this.loadItems(),
      this.loadClients(),
    ])
      .then(items => { this.$emit('ready') })
  },
}
</script>

<style lang="scss">
  .input-without-details .v-text-field__details {
    display: none;
  }
  .v-data-table td {
    width: 40%;
  }
  .v-data-table td.td-input {
    padding: 0px;
    padding-left: 2px;
  }
</style>

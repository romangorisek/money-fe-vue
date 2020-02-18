<template>
  <v-list-group v-model="item.active" :prepend-icon="item.icon" no-action>
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item v-for="subItem in item.subItems" :key="subItem.title" :to="{name: subItem.route}" exact>
      <v-list-item-content>
        <v-list-item-title v-text="subItem.title"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  props: {
    itemData: {
      required: true,
      type: Object,
    },
  },
  data () {
    return {
      item: null,
    }
  },
  created () {
    this.item = { ...this.itemData }
  },
}
</script>

<style lang="scss" scoped>
.v-list-group--active.primary--text {
  color: inherit !important;
}
</style>

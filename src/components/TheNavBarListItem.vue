<template>
  <v-list-item :to="{name: item.route}" exact>
    <v-list-item-action>
      <v-icon>{{item.icon}}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{item.title}}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
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

<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-hover v-slot:default="{ hover }">
        <v-btn icon small @click="$emit('click')" class="delete-btn" v-on="on">
          <v-icon small :color="hover ? 'red lighten-1' : 'grey'">
            mdi-cancel
          </v-icon>
        </v-btn>
      </v-hover>
    </template>
    <span>Prekliči</span>
  </v-tooltip>
</template>

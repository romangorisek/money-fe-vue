<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-hover v-slot:default="{ hover }">
        <v-btn icon small @click="$emit('click')" class="edit-btn" v-on="on">
          <v-icon small :color="hover ? 'blue lighten-1' : 'grey'">
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-hover>
    </template>
    <span>Uredi</span>
  </v-tooltip>
</template>

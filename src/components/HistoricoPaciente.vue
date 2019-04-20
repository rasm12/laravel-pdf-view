<template>
<v-container fluid>
 <v-layout align-center align-content-center align-content-space-between>
  <v-flex>
   <v-card v-for="(card, index) in cards" :key="index">
    <v-card-title primary-title>
     <div>
      <div class="headline"> {{ card.title}} </div>
      <span class="grey--text">{{card.date}}</span>
     </div>
    </v-card-title>
    <v-card-actions>
     <!-- <v-btn flat>Share</v-btn>
    <v-btn flat color="purple">Explore</v-btn> -->
     <v-spacer></v-spacer>
     <v-btn icon @click.native="show = !show">
      <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
     </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
     <v-card-text v-show="show">
      {{card.description}}
     </v-card-text>
    </v-slide-y-transition>
   </v-card>
  </v-flex>
 </v-layout>
</v-container>
</template>

<script>
export default {
 data: () => ({
  show: false,
  cards: [{
    "id": 1,
    "title": "Analisis de Sangre",
    "date": "2019-03-03",
    "description": "El archivo pdf del servidor"
   },
   {
    "id": 2,
    "title": "Analisis de Orina",
    "date": "2019-02-03",
    "description": "El archivo pdf del servidor"
   },

   {
    "id": 3,
    "title": "Analisis de Fecal",
    "date": "2019-01-03",
    "description": "El archivo pdf del servidor"
   },
  ]
 })
}
</script>

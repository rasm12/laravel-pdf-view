<template>
<v-container fluid grid-list-md>
 <v-data-iterator locale="es" :items="items" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" content-tag="v-layout" row wrap>
  <template v-slot:item="props">
   <v-flex xs12 sm6 md4 lg3>
    <v-card>
     <v-card-title>
      <h4>{{ props.item.name }}</h4>
     </v-card-title>
     <v-divider></v-divider>
     <v-list dense>
      <v-list-tile>
       <v-list-tile-content>Medico:</v-list-tile-content>
       <v-list-tile-content class="align-end">
        {{ props.item.medico }}
       </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
       <v-list-tile-content>Resultado:</v-list-tile-content>
       <v-list-tile-content class="align-end">
        <v-btn icon :href="props.item.resultado" target="_blank">
         <v-icon medium>attach_file</v-icon>
        </v-btn>
       </v-list-tile-content>
      </v-list-tile>
     </v-list>
    </v-card>
   </v-flex>
  </template>
 </v-data-iterator>
</v-container>
</template>

<script>
export default {
 data: () => ({
  rowsPerPageItems: [4, 8, 12],
  pagination: {
   rowsPerPage: 4
  },
  items: [{
    name: 'Analisis Fecha 2019-04-20',
    medico: 'Kristina Pimenova',
    resultado: '/registrar-paciente'
   },
   {
    name: 'Analisis Fecha 2019-03-10',
    medico: 'Kristina Pimenova',
    resultado: '/registrar-paciente'
   },
   {
    name: 'Analisis Fecha 2019-01-15',
    medico: 'Gabriela Bernal',
    resultado: '/registrar-paciente'
	 },
	 {
   name: 'Analisis Fecha 2018-12-20',
   medico: 'Kristina Pimenova',
   resultado: '/registrar-paciente'
  }
  ]
 })
}
</script>

<style scoped>
v-btn:hover,
a:hover {
 text-decoration: none !important
}
</style>

<template>
<v-container fluid grid-list-md>
 <v-layout>
  <v-flex >
   <v-card>
    <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img> -->

    <v-card-title primary-title class="indigo lighten-1 white--text">
     <div>
      <h3 class="headline mb-0">Ultimos resultados</h3>

     </div>
    </v-card-title>

    <v-card-actions class="text-xs-center">
     <v-data-iterator locale="es" :items="items" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" content-tag="v-layout" row wrap>
      <template v-slot:item="props">
       <v-flex>
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
            <v-btn icon :href="props.item.resultado ? props.item.resultado : 'https://www.google.com'" target="_blank">
             <v-icon medium>attach_file</v-icon>
            </v-btn>
           </v-list-tile-content>
          </v-list-tile>
         </v-list>
        </v-card>
       </v-flex>
      </template>
     </v-data-iterator>
    </v-card-actions>
   </v-card>
  </v-flex>
 </v-layout>
</v-container>
</template>

<script>
export default {
 mounted() {

 },
 data() {
  return {
   rowsPerPageItems: [4, 8, 12],
   link: 'http://localhost:8089/api/auth/generate-pdf',
   pagination: {
    rowsPerPage: 4
   },
   items: [{
     name: 'Analisis Fecha 2019-04-20',
     medico: 'Kristina Pimenova',
     resultado: 'http://localhost:8089/api/auth/generate-pdf'
    },
    {
     name: 'Analisis Fecha 2019-03-10',
     medico: 'Kristina Pimenova',
     resultado: 'http://localhost:8089/api/auth/generate-pdf'
    },
    {
     name: 'Analisis Fecha 2019-01-15',
     medico: 'Gabriela Bernal',
     resultado: 'http://localhost:8089/api/auth/generate-pdf'
    },
    {
     name: 'Analisis Fecha 2018-12-20',
     medico: 'Kristina Pimenova',
     resultado: 'http://localhost:8089/api/auth/generate-pdf'
    }
   ]
  }
 }
}
</script>

<style scoped>
v-btn:hover,
a:hover {
 text-decoration: none !important
}
</style>

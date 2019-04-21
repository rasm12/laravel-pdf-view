<template>
<v-toolbar>
 <v-toolbar-title></v-toolbar-title>
 <v-autocomplete :change="update()" v-model="pacienteCopy" item-value="document_number" :loading="loading" :items="patients" :search-input.sync="search" class="mx-3" hide-no-data hide-details label="Seleccione Paciente" solo-inverted>
  <template v-slot:item="data">
   <span>{{data.item.first_name}} {{data.item.last_name}} (Cedula: {{data.item.document_number}} )</span>
  </template>
  <template v-slot:selection="data">
   <span>{{data.item.first_name}} {{data.item.last_name}}</span>
  </template>
 </v-autocomplete>
 <!-- <v-btn icon>
  <v-icon>more_vert</v-icon>
 </v-btn> -->
</v-toolbar>
</template>

<script>
import axios from 'axios'
import {
 urlListPatients,
 getHeaders
} from '../config'
export default {
 props: ['paciente'],
 data() {
  return {
   loading: false,
   items: [],
   search: null,
   select: null,
   pacienteCopy: this.paciente,
   loading: false,
   patients: []
  }
 },
 mounted() {
  this.getPatients()
 },
 watch: {
  search(val) {
   val && val !== this.select && this.querySelections(val)
  }
 },
 methods: {
  querySelections(v) {
   this.loading = true
   this.items = this.patients.filter(e => {
    //return (e.name.first || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
   })
   this.loading = false

  },

  getPatients() {
   let vm = this;
   vm.loading = true
   axios({
    method: 'GET',
    url: urlListPatients,
   }).then(response => {

    if (response.data.success) {
     vm.patients = response.data.data;
    }
   }).catch(error => {
    console.log(error)
   }).then(a => {
    vm.loading = false
   })
  },
  update() {
   // enviar al componente padre el cambio
   this.$emit('updateFromChild', this.pacienteCopy);
  }
 },
}
</script>

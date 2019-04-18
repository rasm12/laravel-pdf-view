<template>
<v-toolbar>
 <v-toolbar-title>Seleccione Paciente</v-toolbar-title>
 <v-autocomplete :change="update()" return-object v-model="pacienteCopy" item-value="email" :loading="loading" :items="patients" :search-input.sync="search" class="mx-3" flat hide-no-data hide-details label="Paciente" solo-inverted>
  <template v-slot:item="data">
   <span>{{data.item.name.first}} {{data.item.name.last}}</span>
  </template>
  <template v-slot:selection="data">
   <span>{{data.item.name.first}} {{data.item.name.last}}</span>
  </template>
 </v-autocomplete>
 <v-btn icon>
  <v-icon>more_vert</v-icon>
 </v-btn>
</v-toolbar>
</template>

<script>
import axios from 'axios'
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
    url: 'https://randomuser.me/api?results=5'
   }).then(response => {
    //console.log(JSON.stringify(response.data.results))
    vm.patients = response.data.results;
   }).catch(error => {
    console.log(error)
   }).then(a => {
    vm.loading = false
   })
  },
  update() {
		// enviar al componente padre el cambio
		this.$emit('updateFromChild',this.pacienteCopy);
  }
 },
}
</script>

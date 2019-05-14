<template>
<v-layout row justify-center>
 <v-dialog v-model="open" scrollable max-width="300px">
  <template v-slot:activator="{ on }">
   <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
  </template>
  <v-card>
   <v-card-title>Lista de Permisos</v-card-title>
   <v-divider></v-divider>
   <v-card-text style="height: 300px;">

    <v-checkbox :label="item.description" v-for="(item, index) in list" :key="index"></v-checkbox>

   </v-card-text>
   <v-divider></v-divider>
   <v-card-actions>
    <v-btn color="blue darken-1" flat @click="update">Close</v-btn>
    <v-btn color="blue darken-1" flat @click="update">Save</v-btn>
   </v-card-actions>
  </v-card>
 </v-dialog>
</v-layout>
</template>

<script>
import axios from 'axios'
import {
 listOfPermissions,
 getHeaders
} from '../config';
export default {
 props: ['open', 'list'],
 data() {
  return {
   dialogm1: '',
   dialog: false,
   cpy: this.open,
   permissions: []
  }
 },
 mounted() {
  //this.getPermissions()
 },
 methods: {
  update() {
   // enviar al componente padre el cambio
   this.cpy = false
   console.log(this.cpy)
   this.$emit('updateValue', false);
  },
  getPermissions() {
   axios({
    method: 'GET',
    url: listOfPermissions,
    headers: getHeaders()
   }).then(response => {
    if (response.data.success) {
     this.permissions = response.data.data
    } else {
     this.$toasted.show(response.data, {
      type: 'error',
      icon: 'error'
     })
    }
   }).catch(ex => {
    console.log(ex)
   })
  }
 }
}
</script>

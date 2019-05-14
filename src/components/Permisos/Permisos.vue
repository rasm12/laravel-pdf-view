<template>
<v-container fluid>
 <v-layout>
  <v-flex md12>
   <v-card>

    <v-card-title>
     <div>
      <h3>Permisos</h3>
     </div>
    </v-card-title>

    <v-card-text style="width:100%">
     <v-container fluid>
      <v-layout fluid v-for="(item,index) in list" :key="index">
       <!-- <v-flex md3 xs3 lg3 v-for="(n, index) in 10" :key="index"> -->
       <v-flex md3 xs3 lg3>
        <v-checkbox :label=" item[0].name" v-if="item[0]"></v-checkbox>
       </v-flex>
       <v-flex md3>
        <v-checkbox :label=" item[1].name " v-if="item[1]"></v-checkbox>
       </v-flex>
       <v-flex md3>
        <v-checkbox :label=" item[2].name" v-if="item[2]"></v-checkbox>
       </v-flex>
       <v-flex md3>
        <v-checkbox :label=" item[3].name" v-if="item[3]"></v-checkbox>
       </v-flex>
      </v-layout>
     </v-container>
    </v-card-text>
   </v-card>
  </v-flex>
 </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'
import {
 listOfPermissions,
 getHeaders
} from '../../config';
export default {
	props: ['list'],
 mounted() {
  //this.itemsPermissions = this.chunk()
 },
 data() {
  return {
   checkbox1: true,
   checkbox2: false,
   itemsPermissions: [
    'permiso 1',
    'permiso 2',
    'permiso 3',
    'permiso 4',
    'permiso 5',
    'permiso 6',
    'permiso 7',
    'permiso 8',
    'permiso 9',
    'permiso 10',
   ]
  }
 },
 methods: {
  chunk() {
   let results = [];

   while (this.itemsPermissions.length) {
    results.push(this.itemsPermissions.splice(0, 4))
   }
   return results;
  },
  getPermissions() {
   axios({
    method: 'GET',
    url: listOfPermissions,
    headers: getHeaders()
   }).then(response => {
		 console.log(JSON.stringify(response))
    if (response.data.success) {
     this.itemsPermissions = response.data.data
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
 },
 computed: {
  chunkedItems() {
   return this.chunk();
  },
  items() {
   return this.chunk()
  }
 }
}
</script>

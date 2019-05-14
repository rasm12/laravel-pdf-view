<template>
<div>
 <v-container fluid>
  <v-toolbar flat color="white">
   <v-toolbar-title>Editar Roles</v-toolbar-title>
   <v-divider class="mx-2" inset vertical></v-divider>
   <v-spacer></v-spacer>
   <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
     <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
    </template>
    <v-card>
     <v-card-title>
      <span class="headline">{{ formTitle }}</span>
     </v-card-title>

     <v-card-text>
      <v-container grid-list-md>
       <v-layout wrap>
        <v-flex xs12 sm6 md4>
         <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
         <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
         <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
         <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
         <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
        </v-flex>
       </v-layout>
      </v-container>
     </v-card-text>

     <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
     </v-card-actions>
    </v-card>
   </v-dialog>
  </v-toolbar>
  <!-- <permissions :open="openPermissionsDialog" :list="permissionsArray" @updateValue="update"></permissions> -->
  <v-data-table :headers="headers" :items="roles" class="elevation-1">
   <template v-slot:items="props">

    <td>{{ props.item.name }}</td>

    <td class="text-xs-left">{{ props.item.guard_name }}</td>

    <td class="text-xs-left">{{ props.item.id }}</td>

    <td>
     <v-icon small class="mr-2" @click="editItem(props.item)">
      edit
     </v-icon>
     <v-icon small @click="deleteItem(props.item)">
      delete
     </v-icon>
    </td>
   </template>

  </v-data-table>

 </v-container>
 <v-dialog v-model="dialogp" persistent width="300">
  <v-card color="primary" dark>
   <v-card-text>
    Aguarde un momento...
    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
   </v-card-text>
  </v-card>
 </v-dialog>
 <permisos v-if="openPermissionsDialog" :list="permissionsArray"></permisos>
</div>
</template>

<script>
import axios from 'axios'
import Permissions from '@/components/Permissions.vue'
import Permisos from '@/components/Permisos/Permisos.vue'
import {
 listRole,
 listOfPermissions,
 getHeaders
} from '../config'
export default {
 components: {
  Permissions,
  Permisos
 },
 data: () => ({
  dialog: false,
  dialogp: false,
  habilitado: false,
  openPermissionsDialog: false,
  roles: [],
  permissionsArray: [],
  headers: [{
    text: 'Rol',
    align: 'left',
    sortable: false,
    value: 'name'
   },
   {
    text: 'Descripcion',
    value: 'guard_name'
   },
   {
    text: 'ID',
    value: 'id'
   },

   {
    text: 'Actions',
    value: 'name',
    sortable: false
   }
  ],
  desserts: [],
  editedIndex: -1,
  editedItem: {
   name: '',
   calories: 0,
   fat: 0,
   carbs: 0,
   protein: 0
  },
  defaultItem: {
   name: '',
   calories: 0,
   fat: 0,
   carbs: 0,
   protein: 0
  },
  loading: false
 }),

 computed: {
  formTitle() {
   return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
  }
 },

 watch: {
  dialog(val) {
   val || this.close()
  }
 },

 created() {
  this.initialize()
 },

 methods: {
  initialize() {
   this.desserts = [{
     name: 'Administrador',
     calories: 100,
     fat: 6.0,
     carbs: 24,
     protein: 4.0
    },
    {
     name: 'Medico',
     calories: 200,
     fat: 9.0,
     carbs: 37,
     protein: 4.3
    },

   ];

   this.loading = false
   axios({
    method: 'GET',
    url: listRole,
    headers: getHeaders()
   }).then(response => {

    if (response.data.success) {
     this.roles = response.data.data;

    } else {
     this.$toasted.show(response.data, {
      type: 'error',
      icon: 'error'
     })
    }
   }).catch(e => {
    this.$toasted.show(response.data, {
     type: 'error',
     icon: 'error'
    })
   }).then(a => {
    this.loading = false
   })
  },

  editItem(item) {
   this.editedIndex = this.desserts.indexOf(item)
   this.editedItem = Object.assign({}, item)
   //this.dialog = true
   this.getPermissions(this.editedItem.id);

  },

  deleteItem(item) {
   const index = this.desserts.indexOf(item)
   confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
  },

  close() {
   this.dialog = false
   setTimeout(() => {
    this.editedItem = Object.assign({}, this.defaultItem)
    this.editedIndex = -1
   }, 300)
  },

  save() {
   if (this.editedIndex > -1) {
    Object.assign(this.desserts[this.editedIndex], this.editedItem)
   } else {
    this.desserts.push(this.editedItem)
   }
   this.close()
  },
  update(newvalue) {
   //console.log('newvalue:' + newvalue)
   this.openPermissionsDialog = newvalue;
  },
  chunk(array) {
   let results = [];

   while (array.length) {
    results.push(array.splice(0, 4))
   }
	 console.log(JSON.stringify(results))
   return results;
  },
  getPermissions() {
   console.log('getPermissions')
   this.dialogp = true
	 this.openPermissionsDialog = false
   axios({
    method: 'GET',
    url: listOfPermissions,
    headers: getHeaders()
   }).then(response => {
    console.log(response)
    if (response.data.success) {
     this.permissionsArray = response.data.data
     this.permissionsArray = this.chunk(this.permissionsArray)
		 this.openPermissionsDialog = true
    } else {
     this.$toasted.show(response.data, {
      type: 'error',
      icon: 'error'
     })
    }
   }).catch(ex => {
    console.log(ex)
   }).then(alw => {
    this.dialogp = false
   })
  }
 }
}
</script>

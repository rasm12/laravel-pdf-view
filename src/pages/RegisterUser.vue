<template>
<v-container fluid grid-list-xl align-center justify-center row fill-height>
 <v-flex xs3 md6>
  <v-progress-linear :indeterminate="userCreating" v-if="userCreating"></v-progress-linear>
  <v-card>
   <v-img src="https://i.pinimg.com/originals/03/94/90/03949092b425fcd27a58c04260d457f1.jpg" aspect-ratio="2.75"></v-img>

   <v-card-title primary-title>
    <div>
     <h3 class="headline mb-0">Registrar Usuario</h3>
     <div> {{ card_text }} </div>
    </div>
   </v-card-title>
   <v-card-actions>
    <form>
     <v-text-field v-model="user.name" v-validate="'required|max:100'" :counter="100" :error-messages="errors.collect('name')" label="Username" data-vv-name="name" required></v-text-field>
     <v-text-field v-model="user.email" v-validate="'required|email'" :error-messages="errors.collect('email')" label="E-mail" data-vv-name="email" required></v-text-field>
     <!-- <v-select multiple v-model="select" v-validate="'required'" :items="items" :error-messages="errors.collect('select')" label="Select Role" data-vv-name="select" required></v-select>
  <v-checkbox v-model="checkbox" value="1" label="Habilitado" data-vv-name="checkbox" type="checkbox" required></v-checkbox> -->

     <v-layout wrap>
      <v-flex xs12 sm6 md4>
       <v-text-field label="Nombre *" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
       <v-text-field label="Segundo nombre" hint="Segundo nombre"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
       <v-text-field label="Apellido*" hint="Apellido" persistent-hint></v-text-field>
      </v-flex>
      <v-flex xs12>
       <v-text-field label="Password*" type="password" required></v-text-field>
      </v-flex>
     </v-layout>

     <v-layout row wrap align-center>
      <v-flex xs6>
       <v-subheader>Asignar Rol</v-subheader>
      </v-flex>

      <v-flex xs6>
       <v-select multiple :disabled="disabledSelect" v-model="selectRol" :items="items" item-text="name" item-value="name" label="Select Rol" persistent-hint single-line></v-select>
      </v-flex>
     </v-layout>
     <v-btn left @click.prevent="submit">Guardar</v-btn>
     <v-btn left @click="clear">Limpiar Campos</v-btn>
    </form>
   </v-card-actions>
  </v-card>
 </v-flex>
</v-container>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import axios from 'axios'

Vue.use(VeeValidate)

import {
 newUserUrl,
 listRole,
 getHeaders
} from '@/config';

export default {
 $_veeValidate: {
  validator: 'new'
 },

 data: () => ({
  name: '',
  email: '',
	card_text: 'Agrega un nuevo usuario',
  userCreating: false,
  select: null,
  user: {},
  disabledSelect: false,
  items: [],
  selectRol: [],
  checkbox: null,
  dictionary: {
   attributes: {
    email: 'E-mail Address'
    // custom attributes
   },
   custom: {
    name: {
     required: () => 'Name can not be empty',
     max: 'The name field may not be greater than 10 characters'
     // custom messages
    },
    select: {
     required: 'Select field is required'
    }
   }
  }
 }),

 mounted() {
  this.$validator.localize('en', this.dictionary)
  this.listOfRole()
 },

 methods: {
  submit() {
   this.$validator.validate().then(valid => {
    if (valid) {

     let vm = this;
     vm.userCreating = true

     const postdata = {
      name: vm.user.name,
      email: vm.user.email,
      roles: vm.selectRol,
     }

     console.log(JSON.stringify(vm.selectRol))

     return;

     axios({
      method: 'POST',
      data: postdata,
      headers: getHeaders(),
      url: newUserUrl
     }).then(response => {
      console.log(JSON.stringify(response))
      if (response.data.success) {
       alert('Usuario creado con exito')
       vm.clear()
      } else {
       alert(response.data.data)
      }
     }).catch(error => {
      console.log(error)
     }).then(f => {
      vm.userCreating = false
     })
    }
   })
  },
  listOfRole() {
   let vm = this;
   vm.disabledSelect = true;
   axios({
    method: 'GET',
    headers: getHeaders(),
    url: listRole
   }).then(response => {
    let body = response.data.data;
    let success = response.data.success;
    console.log(JSON.stringify(body))
    if (success) {
     vm.items = body;
    } else {
     alert(body)
    }

   }).catch(error => {
    alert(error)
   }).then(alwaysExcecuted => {
    vm.disabledSelect = false
   })
  },
  clear() {
   this.user = {};
   this.select = null;
   this.$validator.reset()
  }
 }
}
</script>

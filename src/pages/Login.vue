<template>
<v-app id="login" class="secondary">
 <v-content>
  <v-container fluid fill-height>
   <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 lg4>
     <v-card class="elevation-1 pa-3">
      <v-progress-linear :indeterminate="procesando" v-if="procesando"></v-progress-linear>
      <v-card-text>
       <div class="layout column align-center">
        <img src="static/logo.png" alt="Vue Material Admin" width="180" height="180">
        <h1 class="flex my-4 primary--text"></h1>
       </div>
       <v-form>
        <v-text-field append-icon="person" name="login" label="Login" type="text" v-model="login.user" :error="error" :rules="[rules.required]" />
        <v-text-field :type="hidePassword ? 'password' : 'text'" :append-icon="hidePassword ? 'visibility_off' : 'visibility'" name="password" label="Password" id="password" :rules="[rules.required]" v-model="login.password" :error="error" @click:append="hidePassword = !hidePassword" />
       </v-form>
      </v-card-text>
      <v-card-actions>
       <v-spacer></v-spacer>
       <v-btn block color="primary" @click="handlelogin()" :loading="loading">Login</v-btn>
      </v-card-actions>
     </v-card>
    </v-flex>
   </v-layout>
  </v-container>
  <v-snackbar v-model="showResult" :timeout="2000" top>
   {{ result }}
  </v-snackbar>
 </v-content>
</v-app>
</template>

<script>
import {
 mapState
} from 'vuex'

import {
 monchisLoginUrl,
 getHeader
} from '../config'
import axios from 'axios'

export default {

 data() {
  return {
   loading: false,
   userEmail: 'admin@yopmail.com',
   password: '123456',
   hidePassword: true,
   error: false,
   showResult: false,
   procesando: false,
   result: '',
   rules: {
    required: value => !!value || 'Required.'
   },
   login: {
    user: '',
    password: ''
   }
  }
 },

 computed: {
  ...mapState({
   userStore: state => state.userStore
  })
 },

 methods: {
  handlelogin() {
   const vm = this;

   const postData = {
    user: vm.login.user,
    password: vm.login.password
   }
	 const authUser = {}

	 vm.procesando = true

   axios.post(monchisLoginUrl, postData)
    .then(response => {
     //console.log('success: ' +JSON.stringify(response.data))
     vm.loading = false
     const body = response.data
     if (body.success === true) {

      authUser.data = body.data
      authUser.token = body.token
      window.localStorage.setItem('authUser', JSON.stringify(authUser))

      vm.$session.start()
      vm.$session.set('token', body.data.monchis_token)

      vm.$store.dispatch('setUserObject', authUser)
      vm.$router.push({
       name: 'Password'
      })
     } else {
      alert(body.data)
		 }
		 vm.procesando = false
    }).catch(error => {

     vm.procesando = false
     if (error.response) {
      alert(error.response.data.data)
     } else if (error.request) {
      alert(error.response.data.data)
     } else {
      // Algo ocurrió al configurar la solicitud que provocó un error
      if (error.message) {
       alert(error.message, 'Ops!')
      } else {
       alert("Error desconocido", 'Ops!')
      }
     }

    });
  }
 }
}
</script>

<style lang="css" scoped>
#login {
 height: 50%;
 width: 100%;
 position: absolute;
 top: 0;
 left: 0;
 content: "";
 z-index: 0;
}
</style>

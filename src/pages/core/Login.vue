<template>
<v-app id="login" class="secondary">
 <v-content>
  <v-container fluid fill-height>
   <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 lg4>
     <v-card class="elevation-1 pa-3">
      <v-card-text>
       <div class="layout column align-center">
        <img src="static/logo.png" alt="Vue Material Admin" width="180" height="180">
        <h1 class="flex my-4 primary--text">Vue Admin Template</h1>
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

import {monchisLoginUrl, getHeader} from '../config'

export default {

 data() {
  return {
   loading: false,
   userEmail: 'admin@yopmail.com',
   password: '123456',
   hidePassword: true,
   error: false,
   showResult: false,
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
   const postData = {
    user_name: this.login.user,
    password: this.login.password
   }
   const authUser = {}
   axios.post(loginUrl, postData)
    .then(response => {
     //console.log('success: ' +JSON.stringify(response.data))
     this.loading = false
     const body = response.data
     if (body.success === true) {

      authUser.data = body.data
      authUser.token = body.token
      window.localStorage.setItem('authUser', JSON.stringify(authUser))
      this.$store.dispatch('setUserObject', authUser)
      this.$router.push({
       name: 'inbox'
      })
     } else {
      alert(body.data)
     }
    }).catch(error => {
     // var resp = error.response.data
     // console.log('success: ' +JSON.stringify(resp))
     console.log('Error:' + error)
     this.loading = false
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

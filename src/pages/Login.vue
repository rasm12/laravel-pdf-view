<template>
<v-app id="inspire">
 <v-content>
  <v-container fluid fill-height grid-list-md>
   <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
     <v-card class="elevation-12">

      <v-toolbar dark color="primary">
       <v-toolbar-title>Sign In</v-toolbar-title>

       <v-spacer></v-spacer>
       <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on }">
         <v-btn :href="source" icon large target="_blank" v-on="on">
          <v-icon large>code</v-icon>
         </v-btn>
        </template>
        <span>Source</span>
       </v-tooltip>
       <v-tooltip right>
        <template v-slot:activator="{ on }">
         <v-btn icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank" v-on="on">
          <v-icon large>mdi-codepen</v-icon>
         </v-btn>
        </template>
        <span>Codepen</span>
       </v-tooltip> -->
      </v-toolbar>
      <v-progress-linear :indeterminate="loading" v-if="loading" class="pt-0"></v-progress-linear>
      <v-card-text>

       <v-form>
        <v-text-field append-outer-icon="person" name="login" label="Login" type="text" v-model="login.user" :error="error" :rules="[rules.required]" />
        <v-text-field :type="hidePassword ? 'password' : 'text'" :append-outer-icon="hidePassword ? 'visibility_off' : 'visibility'" name="password" label="Password" id="password" :rules="[rules.required]" v-model="login.password" :error="error" @click:append="hidePassword = !hidePassword" />
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

   vm.loading = true

   const postData = {
    email: vm.login.user,
    password: vm.login.password
   }
   const authUser = {}

   axios.post(monchisLoginUrl, postData)
    .then(response => {
     //console.log('success: ' +JSON.stringify(response.data))
     const body = response.data
     if (body.success === true) {

      authUser.data = body.data
      authUser.token = body.token
      window.localStorage.setItem('authUser', JSON.stringify(authUser))

      vm.$session.start()
      vm.$session.set('token', body.data.monchis_token)

      vm.$store.dispatch('setUserObject', authUser)
      vm.$router.push({
       name: 'Analisis'
      })
     } else {
      this.$toasted.show(body.data, {
       type: 'error',
       icon: 'error'
      })
      //this.$snotify.success('Example body content');
     }
    }).catch(error => {

     this.$toasted.show(body.data, {
      type: 'error',
      icon: 'error'
     })

    }).then(f => {
     vm.loading = false
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

#inspire {
 background-image: url('http://preview-vuse2.hexesis.com/static/doc-images/HexesisMaterial01.png');
 background-position: center;
 background-repeat: no-repeat;
 background-size: cover;
}
</style>

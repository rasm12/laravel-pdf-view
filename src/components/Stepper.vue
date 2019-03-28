<template>
<v-container>
 <v-layout>
  <v-flex lg8>
   <v-form ref="form" v-model="valid" lazy-validation>
    <h2> Reset Password </h2>

    <v-text-field :type="show ? 'text' : 'password'" :append-icon="show ? 'visibility' : 'visibility_off'" v-model="password" :rules="passwordRules" label="Password" required @click:append="show = !show"></v-text-field>

    <v-btn :disabled="!valid" @click="submit">
     submit
    </v-btn>
    <v-btn @click.native="clear">clear</v-btn>
   </v-form>
  </v-flex>
 </v-layout>
</v-container>
</template>

<script>

import axios from 'axios'


export default {

 data() {
  return {
   step: 0,
   valid: true,
   show: true,
   name: '',
   password: null,
   passwordRules: [
    v => !!v || 'Password is required',
    v => (v && v.length >= 6) || 'La longitud debe ser mayor a 5'
   ],
   email: '',
   emailRules: [
    v => !!v || 'E-mail is required',
    v => /.+@.+/.test(v) || 'E-mail must be valid'
   ],
   select: null,
   items: [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4'
   ],
   checkbox: false,
   date: new Date().toISOString().substr(0, 10)
  }
 },

 methods: {
  submit() {
   if (this.$refs.form.validate()) {
    let url = 'http://localhost:8001/user/password/reset'
    axios({
     method: 'POST',
     headers: {},
     url: url,
    }).then(response => {
     console.log('respuesta')
     console.log(JSON.stringify(response))
    }).catch(error => {
     console.log('catch error')
     console.log(JSON.stringify(error))
    })
   }

   this.step = 2;
  },
  clear() {
   this.$refs.form.reset()
  }
 }
}
</script>

<style>
</style>

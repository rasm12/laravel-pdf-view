<template>
<v-container fluid grid-list-xl>
 <v-card flat>
  <v-toolbar color="#ECEFF1" dark extended flat>
   <!-- <upload-btn :loading="loading" color="success" :fileChangedCallback="fileChanged" ref="inputFile" title="Seleccionar PDF" accept="application/pdf" round uniqueId>
    <template slot="icon-left">
     <v-icon left color="#fff">add</v-icon>
    </template>
   </upload-btn> -->
   <b-form-file v-model="pdfFile" accept="application/pdf" placeholder="Seleccione un archivo PDF" />

   <v-btn color="rgba(255, 0, 0, 0.5)" dark @click.prevent="sendFile()">Enviar</v-btn>
  </v-toolbar>
  <v-progress-linear :indeterminate="loading" v-if="loading"></v-progress-linear>
  <v-layout row pb-2>

   <v-flex xs8 offset-xs2>
    <v-card class="card--flex-toolbar" v-if="pdfFile && stringPdf">
     <v-toolbar card prominent>
      <v-toolbar-title class="body-2 grey--text">Nombre Archivo: {{this.pdfFile.name}}</v-toolbar-title>
      <template v-slot:extension>
       <v-toolbar-title class="gray--text"></v-toolbar-title>
      </template>
     </v-toolbar>

     <v-divider></v-divider>

     <v-card-text style="height: auto; white-space: pre">{{stringPdf}}</v-card-text>
    </v-card>
   </v-flex>
  </v-layout>
 </v-card>
</v-container>
</template>

<script>
import UploadButton from 'vuetify-upload-button'
import axios from 'axios'
import {
 pdfReadUrl,
 getHeaders
} from '../config'
export default {
 components: {
  'upload-btn': UploadButton,
 },
 data() {
  return {
   dialog: false,
   title: 'Seleccionar PDF',
   pdfFile: null,
   loading: false,
   stringPdf: null
  }
 },
 beforeCreate: function () {
  if (!this.$session.exists()) {
   //this.$router.push('login')
  }
 },
 methods: {
  fileChanged(file) {
   this.pdfFile = file
  },
  sendFile(e) {

   var vm = this;

   if (!vm.pdfFile) {
    alert('Seleccione un archivo')
    return;
	 }
	 vm.loading = true

	 vm.stringPdf = null;

   let formData = new FormData();
   formData.append('file', this.pdfFile)

   vm.axios({
    url: pdfReadUrl,
    method: 'POST',
    data: formData,
    headers: getHeaders()
   }).then(response => {
    console.log(response.data)
    vm.stringPdf = response.data
    vm.loading = false
   }).catch(error => {
		console.log('Error desc: ' + JSON.stringify(error))
		vm.stringPdf = null
    vm.loading = false

   })
  }
 }
}
</script>

<style>

</style>

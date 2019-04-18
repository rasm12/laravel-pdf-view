<template>
<v-container fluid>
 <v-card flat>
  <v-layout column>
   <v-flex md6>
    <v-progress-linear :indeterminate="loading" v-if="loading"></v-progress-linear>
   </v-flex>
   <v-flex md6>
    <search-paciente :paciente="paciente" @updateFromChild="updatePacientValue"></search-paciente>
   </v-flex>
   <v-flex md6 pb-0 pt-5>
    <b-form-file v-model="pdfFile" :multiple="false" accept="application/pdf" placeholder="Seleccione un archivo PDF" />
    <v-btn color="rgba(255, 0, 0, 0.5)" dark @click.prevent="sendFile()">Enviar</v-btn>
   </v-flex>
  </v-layout>

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
import SearchPaciente from '@/components/SearchPaciente.vue'
import axios from 'axios'
import {
 pdfReadUrl,
 getHeaders
} from '../config'
export default {
 components: {
  'upload-btn': UploadButton,
  'search-paciente': SearchPaciente
 },
 data() {
  return {
   dialog: false,
   title: 'Seleccionar PDF',
   pdfFile: null,
   loading: false,
	 stringPdf: null,
	 paciente: null,
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
   console.log(this.pdfFile)
  },
  sendFile(e) {

   var vm = this;
	 console.log(this.pdfFile)
	 console.log('paciente: ' + this.paciente)

   if (!vm.pdfFile) {
    alert('Seleccione un archivo')
    return;
   }
	 vm.loading = true

	 return;

   vm.stringPdf = null;

   let formData = new FormData();
   formData.append('file', this.pdfFile)

   vm.axios({
    url: pdfReadUrl,
    method: 'POST',
    data: formData,
    headers: getHeaders()
   }).then(response => {

    if (response.data.success) {
     vm.stringPdf = response.data.data;
    } else {
     this.$toasted.show(response.data.data, {
      type: 'error',
      icon: 'error'
     })
    }
    vm.loading = false
   }).catch(error => {
    vm.stringPdf = null
    vm.loading = false

   })
	},
	updatePacientValue(newvalue){
		this.paciente = newvalue;
	}
 },
 mounted() {

 }
}
</script>

<style>

</style>

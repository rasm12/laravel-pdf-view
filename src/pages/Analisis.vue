<template>
<v-container fluid>
 <v-card flat>
  <v-layout column>
   <v-flex md6>
    <v-progress-linear :indeterminate="loading" v-if="loading"></v-progress-linear>
   </v-flex>
  </v-layout>
  <v-layout>
   <v-flex md6 xs12 lg6>
    <search-paciente :paciente="paciente" @updateFromChild="updatePacientValue"></search-paciente>
   </v-flex>

	 <v-flex md4 xs12 lg6 ml-2>
    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
     <v-text-field slot="activator" v-model="date" label="Fecha resultado" prepend-icon="event" readonly></v-text-field>
     <v-date-picker v-model="date" scrollable locale="es">
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
     </v-date-picker>
    </v-dialog>
   </v-flex>
  </v-layout>


  <v-layout>
   <v-flex md8 pb-0 pt-3>
    <b-form-file v-model="pdfFile" :multiple="false" accept="application/pdf" placeholder="Seleccione un archivo PDF" />
   </v-flex>

	 <v-flex md4 pb-0 mt-2>
    <v-btn color="indigo lighten-0" dark @click.prevent="sendFile()">
     Cargar
     <v-icon right dark>cloud_upload</v-icon>
    </v-btn>
   </v-flex>

	</v-layout>

  <v-layout row pb-2>

   <v-flex xs8 offset-xs2>
    <v-card class="card--flex-toolbar">
     <!-- <v-toolbar card prominent>
      <v-toolbar-title class="body-2 grey--text">Nombre Archivo: {{this.pdfFile.name}}</v-toolbar-title>
      <template v-slot:extension>
       <v-toolbar-title class="gray--text"></v-toolbar-title>
      </template>
     </v-toolbar> -->

     <v-divider></v-divider>

     <v-card-text style="height: auto; white-space: pre">

     </v-card-text>

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
	 modal: false,
	 date: null
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

   if (!vm.pdfFile) {
    this.$toasted.show("Debe seleccionar un archivo!", {
     type: 'info',
     icon: 'info'
    });
    return;
   }
   vm.loading = true
   vm.stringPdf = null;

   let formData = new FormData();
   formData.append('file', this.pdfFile)
   formData.append('document_number', this.paciente ? this.paciente : null)

   console.log((formData.get('patient_id')))

   vm.axios({
    url: pdfReadUrl,
    method: 'POST',
    data: formData,
    headers: getHeaders()
   }).then(response => {

    if (response.data.success) {
     this.$toasted.show(response.data.data, {
      type: 'success',
      icon: 'success'
     })
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
  updatePacientValue(newvalue) {
   this.paciente = newvalue;
  }
 },
 mounted() {

 }
}
</script>

<style>

</style>

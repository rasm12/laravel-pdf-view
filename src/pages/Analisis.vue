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

   <v-flex ml-3>
    <v-toolbar>
     <v-toolbar-title class="mr-3">Fecha Analisis: </v-toolbar-title>
     <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
      <v-text-field slot="activator" v-model="date" prepend-icon="event" readonly></v-text-field>
      <v-date-picker v-model="date" scrollable locale="es">
       <v-spacer></v-spacer>
       <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
       <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
      </v-date-picker>
     </v-dialog>
    </v-toolbar>
   </v-flex>
  </v-layout>

  <v-layout>
   <v-flex md8 pb-0 pt-3>
    <b-form-file v-model="pdfFile" :multiple="false" accept="application/pdf" placeholder="Seleccione un archivo PDF" />
   </v-flex>

   <v-flex md4 pb-0 mt-2>
    <v-btn block color="indigo lighten-0" dark @click.prevent="sendFile()">
     Cargar
     <v-icon right dark>cloud_upload</v-icon>
    </v-btn>
   </v-flex>

  </v-layout>

  <v-layout row pb-2>

   <v-flex>

		 <data-iterator></data-iterator>
   </v-flex>
  </v-layout>
 </v-card>
</v-container>
</template>

<script>
import UploadButton from 'vuetify-upload-button'
import SearchPaciente from '@/components/SearchPaciente.vue'
import HistoricoPaciente from '@/components/HistoricoPaciente.vue'
import DataIterator from '@/components/DataIterator.vue'
import axios from 'axios'
import {
 pdfReadUrl,
 getHeaders
} from '../config'
import DataIteratorVue from '../components/DataIterator.vue';
export default {
 components: {
  'upload-btn': UploadButton,
  'search-paciente': SearchPaciente,
	'historico-paciente': HistoricoPaciente,
	'data-iterator' : DataIterator

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

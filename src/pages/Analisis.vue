<template>
<v-container fluid>
 <v-card flat>
  <v-layout column>
   <v-flex md6>
    <v-progress-linear :indeterminate="loading" v-if="loading"></v-progress-linear>
   </v-flex>
  </v-layout>
  <v-layout>
   <v-flex>
    <search-paciente :paciente="paciente" @updateFromChild="updatePacientValue"></search-paciente>
   </v-flex>
  </v-layout>
  <v-layout>

   <v-flex ml-3 pt-4>

    <!-- <v-toolbar-title class="mr-3">Fecha Analisis: </v-toolbar-title> -->
    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
     <v-text-field slot="activator" v-model="date" prepend-icon="event" readonly label="Fecha Analisis" :rules="[v => !!v || 'Campo Requerido']"></v-text-field>
     <v-date-picker v-model="date" scrollable locale="es" :rules="[v => !!v || 'Campo Requerido']">
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
     </v-date-picker>
    </v-dialog>
   </v-flex>
   <v-flex pt-4>

    <v-autocomplete class="pl-2" :rules="[v => !!v || 'Campo Requerido']" :items="analisis_types" label="Tipo Analisis *" item-text="description" item-value="code"></v-autocomplete>

   </v-flex>
  </v-layout>

  <v-layout>
   <v-flex md3 pb-0 pt-2 pl-3>
    <b-form-file v-model="pdfFile" :multiple="false" accept="application/pdf" placeholder="Seleccione un archivo PDF" />
   </v-flex>
  </v-layout>
  <v-layout style="border: 0px solid grey">

   <v-flex align-content-end class="text-xs-center" style="border: 0px solid blue">
    <v-btn color="indigo lighten-0" class="ml-3" dark @click.prevent="sendFile()">
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
  'data-iterator': DataIterator

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
   date: null,
   analisis_types: [{
     'description': 'Hemograma',
     'code': 'HGRM'
    },
    {
     'description': 'MicroBiologicos',
     'code': 'MCBL'
    },
    {
     'description': 'Toxicología',
     'code': 'TXGI'
    },
    {
     'description': 'Parasitologia',
     'code': 'PRGI'
    },
    {
     'description': 'Endocrinologia',
     'code': 'EDGI'
    },
    {
     'description': 'Urisalisis',
     'code': 'URS'
    },
   ]
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

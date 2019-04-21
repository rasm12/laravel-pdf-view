<template>
<v-container fluid grid-list-xl align-center justify-center row>
 <v-layout row justify-center>

  <v-card>
   <v-form ref="form" v-model="valid" lazy-validation>
    <v-progress-linear :indeterminate="procesing" v-if="procesing"></v-progress-linear>
    <v-img src="https://i.pinimg.com/originals/03/94/90/03949092b425fcd27a58c04260d457f1.jpg" aspect-ratio="4.75"></v-img>
    <v-card-title>
     <span class="headline">Nuevo Paciente</span>
    </v-card-title>
    <v-card-text>
     <v-container>

      <v-layout align-content-end>

       <v-flex text-xs-right layout align-center justify-end>
        <v-avatar :tile="true" color="grey">
         <img src="/static/add.png" alt="avatar">
        </v-avatar>
       </v-flex>
      </v-layout>

      <v-layout>

       <v-flex xs12 md4>
        <v-text-field v-model="patient.first_name" :rules="nameRules" label="Nombre *" required></v-text-field>
       </v-flex>

       <v-flex xs12 md4>
        <v-text-field v-model="patient.last_name" :rules="lastNameRules" label="Apellido *" required></v-text-field>
       </v-flex>

       <v-flex xs12 md4>
        <v-text-field v-model="patient.document_number" :rules="documentRules" label="Documento *" required></v-text-field>
       </v-flex>
      </v-layout>

      <v-layout row wrap>

      </v-layout>

      <v-layout>
       <v-flex xs12 sm6 md6>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
         <v-text-field :rules="birthDateRules" slot="activator" v-model="date" label="Fecha de Nacimiento *" :prepend-icon="null" readonly></v-text-field>
         <v-date-picker v-model="patient.birth_date" scrollable locale="es">
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(patient.birth_date)">OK</v-btn>
         </v-date-picker>
        </v-dialog>
       </v-flex>
       <v-flex xs12 md6>
        <v-text-field v-model="patient.email" :rules="emailRules" label="E-mail" required></v-text-field>
       </v-flex>
       <v-flex xs12 md4>
        <v-text-field v-model="patient.phone" :rules="phoneRules" label="Telefono *" required></v-text-field>
       </v-flex>

      </v-layout>

      <v-layout>
       <v-flex xs12 md12>
        <v-text-field v-model="patient.address" :rules="addressRules" label="Direccion *" required></v-text-field>
       </v-flex>
      </v-layout>

      <v-layout>
       <v-flex xs12 md4>
        <v-select v-model="select" :rules="cityRules" :items="cities" label="Ciudad *"></v-select>
       </v-flex>

       <v-flex xs12 sm3 md2>
        <v-text-field v-model="patient.age" :rules="ageRules" label="Edad *"></v-text-field>
       </v-flex>

       <v-flex xs12 sm3 md4>
        <v-autocomplete :rules="[v => !!v || 'Requerido']" :items="[{'description': 'Femenino', 'id': 'F'}, {'description': 'Masculino', 'id': 'M'}]" label="Genero *" item-text="description" item-value="id"></v-autocomplete>
       </v-flex>

      </v-layout>
     </v-container>
     <small>*Campos Requeridos</small>
    </v-card-text>
    <v-card-actions>
     <v-spacer></v-spacer>
     <v-btn color="info" dark @click.prevent="register">Guardar</v-btn>

    </v-card-actions>
   </v-form>
  </v-card>
 </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'
import BirthDate from '@/components/BirthDate.vue'
import {
 urlRegisterPatient,
 getHeaders
} from '../config'
export default {
 components: {
  'birth-date': BirthDate
 },
 data: () => ({
  valid: false,
  firstname: '',
  items: [],
  lastname: '',
  name: null,
  date: null,
  menu: false,
  modal: false,
  menu2: false,
  patient: {},
  select: null,
  procesing: false,
  // valor verdadero | valor falso
  nameRules: [
   v => !!v || 'Requerido',
   function (v) {
    if (v) {
     let longitud = v.trimStart().trimLeft().trim().length
     if (longitud < 1) return 'Valor no valido'
    }
    return true;
   },
  ],
  birthDateRules: [
   v => !!v || 'Requerido',
  ],
  ageRules: [
   v => !!v || 'Requerido',
	 v => !!v && !isNaN(v.trimStart().trimLeft().trim()) && v >= 0 || 'Valor no valido'
  ],
  cityRules: [
   v => !!v || 'Requerido',
  ],
  lastNameRules: [
   v => !!v || 'Requerido',
   v => !!v && v.trimStart().trimLeft().trim().length > 0 || 'Requerido'
  ],
  documentRules: [
   v => !!v || 'Requerido',
   v => !!v && v.trimStart().trimLeft().trim().length > 0 || 'Requerido'
  ],
  phoneRules: [
   v => !!v || 'Requerido',
   v => !!v && v.trimStart().trimLeft().trim().length > 0 || 'Requerido'
  ],
  addressRules: [
   v => !!v || 'Requerido',
   v => !!v && v.trimStart().trimLeft().trim().length > 0 || 'Requerido'
  ],
  email: '',
  emailRules: [
	 v => !!v || true,
   v => (!v || (!!v && /.+@.+/.test(v))) || 'Email invalido'
  ],
  cities: [
   "San Lorenzo",
   "Capiata",
   "Asuncion",
   "Fdo. de la Mora",
   "Ita",
   "Aregua",
   "Luque"
  ]
 }),
 methods: {
  register() {
   if (this.$refs.form.validate()) {
    let vm = this;

    vm.procesing = true
    axios({
     method: 'post',
     url: urlRegisterPatient,
     data: vm.patient,
     headers: getHeaders()
    }).then(response => {
     if (response.data.success) {
      this.$toasted.show(response.data.data, {
       type: 'success',
       icon: 'success'
      });
     } else {
      this.$toasted.show(response.data.data, {
       type: 'error',
       icon: 'error'
      });
     }
    }).catch(e => {
     this.$toasted.show(response.data, {
      type: 'error',
      icon: 'error'
     })
    }).then(f => {
     vm.procesing = false
    })
   }
  }
 },
 watch: {
  date(newval, oldval) {
   console.log('newval: ' + newval)
   console.log('oldval: ' + oldval)
  }
 }
}
</script>

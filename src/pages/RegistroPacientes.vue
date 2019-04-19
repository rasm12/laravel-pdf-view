<template>
<v-container fluid grid-list-xl align-center justify-center row fill-height>
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

      <v-layout wap>

       <v-flex xs12 md4>
        <v-text-field v-model="patient.first_name" :rules="nameRules" label="Nombre" required></v-text-field>
       </v-flex>

       <v-flex xs12 md4>
        <v-text-field v-model="patient.last_name" :rules="lastNameRules" label="Apellido" required></v-text-field>
       </v-flex>

       <v-flex xs12 md4>
        <v-text-field v-model="patient.document_number" :rules="documentRules" label="Documento" required></v-text-field>
       </v-flex>
      </v-layout>

      <v-layout>
       <v-flex xs12 md8>
        <v-text-field v-model="patient.email" :rules="emailRules" label="E-mail" required></v-text-field>
       </v-flex>
       <v-flex xs12 md4>
        <v-text-field v-model="patient.phone" :rules="phoneRules" label="Telefono" required></v-text-field>
       </v-flex>
       <v-flex xs12 md4>
        <!-- <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field> -->
       </v-flex>
      </v-layout>

      <v-layout>
       <v-flex xs12 md12>
        <v-text-field v-model="patient.address" :rules="addressRules" label="Direccion" required></v-text-field>
       </v-flex>
      </v-layout>

      <v-layout>
       <v-flex xs12 md4>
        <v-select v-model="select" :items="items" label="Item"></v-select>
       </v-flex>

       <v-flex xs12 sm3 md3>
        <v-text-field v-model="name" :counter="10" label="Age"></v-text-field>
       </v-flex>

       <v-flex xs12 sm3 md4>
        <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']" label="Interests" multiple></v-autocomplete>
       </v-flex>

      </v-layout>
     </v-container>
     <small>*Campos Requeridos</small>
    </v-card-text>
    <v-card-actions>
     <v-spacer></v-spacer>
     <v-btn color="blue darken-1" flat @click.prevent="register">Save</v-btn>
    </v-card-actions>
   </v-form>
  </v-card>
 </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'
import {
 urlRegisterPatient,
 getHeaders
} from '../config'
export default {
 data: () => ({
  valid: false,
  firstname: '',
  items: [],
  lastname: '',
  name: null,
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
   v => !!v || 'Requerido',
   v => /.+@.+/.test(v) || 'E-mail must be valid'
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
}
</script>

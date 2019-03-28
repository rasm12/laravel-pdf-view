<template>
<div>
 <v-container align-content-center>

  <v-layout>
   <v-flex>
    <v-form ref="clients" lazy-validation v-on:submit.prevent>
     <v-card>
      <v-toolbar>
       <v-text-field id="txtsearch" @click="$event.target.select()" @keyup.enter.native="searchClients()" v-model="q" hide-details single-line label="Email o nombre o apellido o telefono"></v-text-field>
       <v-btn icon @click="searchClients()">
        <v-icon>search</v-icon>
       </v-btn>
      </v-toolbar>
     </v-card>

    </v-form>
   </v-flex>
  </v-layout>

  <v-layout>
   <v-flex>
    <v-card>
     <v-card-title class="headline grey lighten-2" primary-title>
      Administrar Usuarios de la App
      <v-spacer></v-spacer>
      <v-progress-linear :indeterminate="procesando" v-if="procesando"></v-progress-linear>
      <!-- <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field> -->
     </v-card-title>
     <v-data-table :rows-per-page-items="[5, 10, 15]" :items="users" class="elevation-1" :headers="headers" :pagination.sync="pagination" :total-items="total">
      <template slot="items" slot-scope="props">
       <!-- <td class="text-xs-left">
        <v-avatar size="42">
         <img :src="randomAvatar()" alt="avatar">
        </v-avatar>
       </td> -->
       <td class="text-xs-center">{{ props.item.id }}</td>
       <td class="text-xs-center">{{ props.item.first_name }}</td>
       <td class="text-xs-center">{{ props.item.last_name }}</td>
       <td class="text-xs-center">{{ props.item.email }}</td>
       <td class="text-xs-center">{{ props.item.phone }}</td>
       <td class="text-xs-center">{{ props.item.birth_date }}</td>
       <td class="center layout px-10">
        <v-icon x-large @click="showDialogForReset(props.item)">
         lock_open
        </v-icon>

        <!-- <router-link :to="{name: 'ResetUserPassword', params: props.item}">
             <v-icon x-large>
              vpn_key
             </v-icon>
            </router-link> -->

       </td>
      </template>
     </v-data-table>
    </v-card>
   </v-flex>
  </v-layout>
 </v-container>
 <v-layout row justify-center>
  <v-dialog v-model="dialog" persistent max-width="400">

   <v-form ref="form" v-model="valid" lazy-validation>

    <v-card>
     <v-card-title class="headline grey lighten-2"> Editar Password
      <p />
      Usuario: {{user.first_name}} {{user.last_name && user.last_name.trim() !== '' ? ','+user.last_name : ''}}
     </v-card-title>
     <v-progress-linear :indeterminate="changePasswordProcess" v-if="changePasswordProcess"></v-progress-linear>
     <v-card-text>

     </v-card-text>
     <v-container text-xs-center>

      <v-layout row wrap>
       <v-flex>
        <v-text-field :rules="[rules.required, rules.min]" :append-icon="show ? 'visibility' : 'visibility_off'" label="Nuevo Password" v-model="new_password" :type="show ? 'text' : 'password'" @click:append="show = !show"></v-text-field>
       </v-flex>
      </v-layout>
     </v-container>
     <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" flat @click="reset()">Cancelar</v-btn>
      <v-btn color="green darken-1" flat @click="resetPassword()">Confirmar</v-btn>
     </v-card-actions>
    </v-card>
   </v-form>
  </v-dialog>
 </v-layout>
</div>
</template>

<script>
import {
 appMonchisUserResetPasswordUrl,
 getHeaders,
 appMonchisUserListUrl,
 clientsUrl
} from '@/config';

export default {
 watch: {
  pagination: {
   handler(newValue, oldValue) {
		//this.getDataFromApi();


    if ((!this.firstLoad && newValue.rowsPerPage !== oldValue.rowsPerPage) || this.firstLoad || newValue.page !== oldValue.page) {
		 this.searchClients()
		 this.firstLoad = false
    }

   },
   deep: true,
  }

 },
 beforeCreate: function () {
  //console.log('Token: ' + this.$session.get('token'))
 },
 data() {
  return {
   users: [],
   user: {},
   userCopy: {},
   procesando: false,
   show: false,
   search: '',
   dialog: false,
   new_password: null,
   firstLoad: true,
   valid: true,
	 procesando: false,
	 changePasswordProcess: false,
   total: 0,
   q: '',
   pagination: {
    rowsPerPage: 5
   },
   rules: {
    required: value => !!value || 'Introduzca el password.',
    min: v => v && v.length >= 6 || 'Min 6 Caracteres'
   },
   headers: [{
     text: 'ID',
     value: 'id',
     align: 'center',
     sortable: true
    },
    {
     text: 'Nombre',
     value: 'first_name',
     align: 'center',
     sortable: true
    },
    {
     text: 'Apellido',
     value: 'last_name',
     align: 'center',
     sortable: true
    },
    {
     text: 'Email',
     value: 'email',
     align: 'center',
     sortable: true
    },
    {
     text: 'Telefono',
     value: 'Phone',
     align: 'center',
     sortable: true
    },
    {
     text: 'Fecha Nacimiento',
     value: 'birth_date',
     align: 'center',
     sortable: true
    },
    {
     text: 'Acciones',
     value: ' ',
     align: 'left',
     sortable: false
    }
   ]
  }
 },

 methods: {
  searchClients() {
	 let vm = this

	 document.getElementById('txtsearch').select()

   const {
    sortBy,
    descending,
    page,
    rowsPerPage
   } = vm.pagination;

   let items = [];
   let total = 0;

   this.procesando = true
   vm.axios.get(clientsUrl + '?page=' + vm.pagination.page + '&rowsPerPage=' + vm.pagination.rowsPerPage + '&q=' + vm.q, {
     headers: getHeaders()
    })
    .then(response => {
     vm.procesando = false
     //console.log(JSON.stringify(response))
     if (response.data.success === true) {

      var body = response.data.data
      vm.users = body.data
      vm.total = body.total
      if (vm.total == 0) {
       toastr.error('No se encontraron datos con el criterio solicitado: ' + vm.q)
      }

      // if (rowsPerPage > 0) {
      //  items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
      // }
     } else {
      var body = response.data.data
      console.log(body)
      toastr.error(body)
     }

    })
    .catch(error => {
     vm.procesando = false
     if (error.response) {
      // Se realizó la solicitud y el servidor respondió con un código de estado.
      // console.log(error.responde.data);
      // console.log(error.responde.status);
      // console.log(error.responde.headers);

      if (error.response.data.data) {
       vm.$toastr.error(error.response.status + " - " + error.response.data.data, 'Ops!')
      } else {
       vm.$toastr.error(error.response.status + " - Error de proceso", 'Ops!')
      }

     } else if (error.request) {
      //Se realizó la solicitud pero no se recibió respuesta.
      vm.$toastr.error("El servidor no responde. Reintente!", 'Ops!')
     } else {
      // Algo ocurrió al configurar la solicitud que provocó un error
      if (error.message) {
       vm.$toastr.error(error.message, 'Ops!')
      } else {
       vm.$toastr.error("Error desconocido", 'Ops!')
      }
     }

    })

  },
  randomAvatar() {

   return avatars[Math.floor(Math.random() * avatars.length)];
  },
  showDialogForReset(user) {
   const vm = this;
   vm.user = Object.assign({}, user)
   vm.dialog = true
  },
  resetPassword() {

   let vm = this;
   if (vm.$refs.form.validate()) {

    vm.user.new_password = vm.new_password
    vm.changePasswordProcess = true

    vm.axios({

     url: appMonchisUserResetPasswordUrl,
     method: 'POST',
     data: vm.user,
     headers: getHeaders()

    }).then(response => {

     let success = response.data.success

     if (success) {

      toastr.success(response.data.data)
      vm.reset()

     } else {
      toastr.error(response.data.data)
     }
     // vm.users = response.data.data
    }).catch(error => {

     toastr.error('error')
    }).then(() => {
     vm.changePasswordProcess = false
    })
   }
  },

  reset() {
   const vm = this;
   vm.dialog = false
   vm.$refs.form.reset()
  },

  getMonchisUserList() {
   const vm = this;

   vm.axios({
    url: appMonchisUserListUrl,
    method: 'POST',
    headers: getHeaders()
   }).then(response => {
    vm.users = response.data.data.data

    toastr.success('Listado correctamente');
   }).catch(error => {
    //console.log('error: ' + JSON.stringify(error))
    toastr.error('Error al obtener la lista de clientes')
   })
  },
  getDataFromApi() {

   let vm = this;

   vm.loading = true;
   return new Promise((resolve, reject) => {
    const {
     sortBy,
     descending,
     page,
     rowsPerPage
    } = vm.pagination;

    let items = [];
    let total = 0;

    //console.log(appMonchisUserListUrl + '?page=' + vm.pagination.page + '&rowsPerPage=' + vm.pagination.rowsPerPage)

    // axios.post(url[, data[, config]])
    vm.axios({
      url: appMonchisUserListUrl + '?page=' + vm.pagination.page + '&rowsPerPage=' + vm.pagination.rowsPerPage,
      method: 'POST',
      headers: getHeaders()
     })
     .then(function (response) {

      ///console.log(JSON.stringify(response))

      vm.users = response.data.data.data;
      vm.total = response.data.total

      //console.log('rowsPerPage: ' + rowsPerPage)

      //console.log(JSON.stringify(response.data.data.data))

      // if (rowsPerPage > 0) {
      //  items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
      // }

      vm.loading = false;

     })
     .catch(function (error) {
      vm.loading = false;
      alert(error)
      if (error.response) {
       // Se realizó la solicitud y el servidor respondió con un código de estado.
       // console.log(error.responde.data);
       // console.log(error.responde.status);
       // console.log(error.responde.headers);

       if (error.response.data.data) {
        vm.$toastr.error(error.response.status + " - " + error.response.data.data, 'Ops!')
       } else {
        vm.$toastr.error(error.response.status + " - Error de proceso", 'Ops!')
       }

      } else if (error.request) {
       //Se realizó la solicitud pero no se recibió respuesta.
       vm.$toastr.error("El servidor no responde. Reintente!", 'Ops!')
      } else {
       // Algo ocurrió al configurar la solicitud que provocó un error
       if (error.message) {
        vm.$toastr.error(error.message, 'Ops!')
       } else {
        vm.$toastr.error("Error desconocido", 'Ops!')
       }
      }
     });
   });
  }
 },

 mounted() {
  // this.getMonchisUserList()
  //this.getDataFromApi()
 },

}
</script>

<style>
.table {
 border-radius: 3px;
 background-clip: border-box;
 border: 1px solid rgba(0, 0, 0, 0.125);
 box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
 background-color: transparent;
}
</style>

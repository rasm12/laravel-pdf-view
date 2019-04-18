<template>
<v-navigation-drawer v-model="toggle" fixed app stateless value="true">
 <v-toolbar flat light color="indigo" dense class="toolbar">
  <router-link :to="{ name: 'Dashboard' }">
   <img src="static/logo.png" width="36px"/>
  </router-link>
   <router-link :to="{ name: 'Analisis' }" class="text">
    KClinic
   </router-link>
 </v-toolbar>

 <v-list dense>
  <v-list-tile>
   <v-list-tile-action>
    <v-icon color="#FC697D">home</v-icon>
   </v-list-tile-action>
   <v-list-tile-title></v-list-tile-title>
  </v-list-tile>

  <v-list-group no-action sub-group value="true">
   <template v-slot:activator>
    <v-list-tile>
     <v-list-tile-title>Administrar</v-list-tile-title>
    </v-list-tile>
   </template>

   <v-list-tile v-for="(admin, i) in admins" :key="i" @click="changeRoute(admin[2],i)">
    <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
    <v-list-tile-action>
     <v-icon color="#FC697D" v-text="admin[1]"></v-icon>
    </v-list-tile-action>
   </v-list-tile>
  </v-list-group>

  <v-list-group sub-group no-action>
   <template v-slot:activator>
    <v-list-tile color="grey">
     <v-list-tile-title>Extras</v-list-tile-title>
    </v-list-tile>
   </template>
   <v-list-tile v-for="(crud, i) in cruds" :key="i" @click="changeRoute(crud[2],i)">
    <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
    <v-list-tile-action>
     <v-icon v-text="crud[1]" color="#FC697D"></v-icon>
    </v-list-tile-action>
   </v-list-tile>
  </v-list-group>
 </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
 props: {
  toggle: {
   type: Boolean,
   required: false,
   default: true
  }
 },

 data() {
  return {
   selectedIndex: 1,
   admins: [
    ['Recetario', 'people_outline', 'Analisis'],
    ['Medicos', 'settings', 'RegisterUser'],
    ['Pacientes', 'people_outline', 'RegistroPacientes'],
    ['Usuarios', 'settings', 'RegisterUser'],
    ['Laboratorios', 'settings', 'RegisterUser'],
    ['Citas', 'settings', 'RegisterUser'],
    ['Consultas Medicas', 'settings', 'RegisterUser'],
    ['Hitorial paciente', 'settings', 'RegisterUser'],
    ['Receta', 'update', 'RegisterUser'],
    ['Comentarios', 'delete', 'RegisterUser'],
    ['Medicamentos', 'delete', 'RegisterUser']
   ],
   cruds: [
    ['Estadistica', 'add', 'RegisterUser'],
    ['Mantenimiento de Datos', 'insert_drive_file', 'RegisterUser'],
    ['Accesos', 'update', 'RegisterUser'],
    ['Reportes', 'delete', 'RegisterUser'],
    ['Impresoras', 'add', 'RegisterUser'],
   ]
  }
 },

 methods: {
  changeRoute(routeName, selectedIndex) {
   const vm = this;

   vm.selectedIndex = selectedIndex;

   return vm.$router.push({
    name: routeName
   });
  }
 }
}
</script>

<style>
.toolbar {
 font-weight: bold;
 font-size: 18px;
}

.toolbar .text {
 padding-left: 15px;
 color: white;
 text-decoration: none;
}

.item-title {
 font-size: 17px;
 font-weight: 500;
}

.item-sub-title {
 font-size: 15px;
 font-weight: 500;
}

.active {
 font-weight: bold;
}
</style>

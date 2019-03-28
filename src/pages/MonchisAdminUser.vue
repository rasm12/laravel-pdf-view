<template>
<v-container fluid grid-list-xl>
 <v-layout row wrap>

  <v-flex d-flex lg12 sm6 xs12>
   <data-table-admin-users/>
  </v-flex>

  <v-flex d-flex lg6 sm6 xs12>
   <!-- <password-reset></password-reset> -->
  </v-flex>

 </v-layout>
</v-container>
</template>

<script>
import PasswordReset from '../components/PasswordReset.vue'
import DataTableAdminUsers from '../components/DataTableAdminUsers.vue'
export default {
 components: {
  PasswordReset,
  DataTableAdminUsers
 },
 data() {
  return {
   lorem: `Lorem ipsum dolor sit amet, mel at clita quando.`
  }
 },
 beforeCreate: function () {
  if (!this.$session.exists()) {
   //this.$router.push('login')
  }
 }
}
</script>

<style>

</style>

<template>
<v-container fluid grid-list-xl align-center justify-center row fill-height>
 <v-layout row justify-center>

  <v-card>
   <v-img src="https://i.pinimg.com/originals/03/94/90/03949092b425fcd27a58c04260d457f1.jpg" aspect-ratio="4.75"></v-img>
   <v-card-title>
    <span class="headline">Nuevo Paciente</span>
   </v-card-title>
   <v-card-text>
    <v-container>
     <v-layout wap>
      <v-flex xs12 md4>
       <v-text-field v-model="firstname" :rules="nameRules" label="First name" required></v-text-field>
      </v-flex>

      <v-flex xs12 md4>
       <v-text-field v-model="lastname" :rules="nameRules" label="Last name" required></v-text-field>
      </v-flex>

      <v-flex xs12 md4>
       <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      </v-flex>
     </v-layout>

		 <v-layout >
      <v-flex xs12 md4>
       <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
       <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
       <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      </v-flex>
     </v-layout>


		 <v-layout>
      <v-flex xs12 md4>
       <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item" required></v-select>
      </v-flex>

      <v-flex xs12 sm3 md3>
       <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Age" required></v-text-field>
      </v-flex>

      <v-flex xs12 sm3 md4>
       <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']" label="Interests" multiple></v-autocomplete>
      </v-flex>

     </v-layout>
    </v-container>
    <small>*indicates required field</small>
   </v-card-text>
   <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
    <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
   </v-card-actions>
  </v-card>
 </v-layout>
</v-container>
</template>

<script>
export default {
 data: () => ({
  valid: false,
  firstname: '',
  lastname: '',
  nameRules: [
   v => !!v || 'Name is required',
   v => v.length <= 10 || 'Name must be less than 10 characters'
  ],
  email: '',
  emailRules: [
   v => !!v || 'E-mail is required',
   v => /.+@.+/.test(v) || 'E-mail must be valid'
  ]
 })
}
</script>

<template>
 <v-container style="margin-bottom:200px">
    <FormUser />
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
    </v-col>
    <v-col cols="12" md="4">
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Utilisateurs</v-card-title>
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          class="elevation-3"
          locale="fr"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="showDialog(item._id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">
        Utilisateur
      </v-card-title>
      <v-card-text>
        Êtes-vous certain de vouloir supprimer l'utilisateur <strong>{{foundUser && foundUser.name}}</strong> ?
      </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="green darken-1" text @click="onRemoveUser()">Confirmer</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</v-container>
</template>
<script>
import Users from '../../../api/collections/Users';
import FormUser from "./FormUser.vue";

export default {
  name: "users",
  data() {
    return {
      Users: [],
      name: "",
      headers: [
        { text: "Nom", align: "start", sortable: true, value: "name" },
        { text: "Id", value: "identification", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
 
      ],
      dialog: '',
      foundUser: null
    };
  },

  components: { FormUser },

  meteor: {
      $subscribe: {
        'users': [],
      },
      users() {
        return Users.find();
      },
  },

  methods: {
    showDialog(id) {
      this.foundUser = this.users.find((user) => user._id === id)
      this.dialog = true
    },

    onRemoveUser() {
      if (!this.foundUser) return
      Meteor.call('deleteuser',  this.foundUser._id);
      this.foundUser = false;
      this.hideDialog();
    },

    hideDialog() {
      this.foundUser = null
      this.dialog = false
    }
  },
};
</script>

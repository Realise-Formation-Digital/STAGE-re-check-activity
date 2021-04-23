<template>
  <v-container style="margin-bottom: 200px">
    <FormUser />
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" md="8"> </v-col>
      <v-col cols="12" md="4"> </v-col>
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
              <v-icon @click="showDialogUpdate(item._id)">mdi-pencil</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog Delete User -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline"> Utilisateur </v-card-title>
        <v-card-text>
          Êtes-vous certain de vouloir supprimer l'utilisateur
          <strong>{{ foundUser && foundUser.email }}</strong> ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Annuler</v-btn
          >
          <v-btn color="green darken-1" text @click="onRemoveUser()"
            >Confirmer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Update Confirm -->
    <v-dialog v-model="dialogUpdateUser" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Modifier l'utilisateur {{ foundUser._id }}</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="foundUser.email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Champs obligatoires</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="hideDialogUpdate()"
            >Fermer</v-btn
          >
          <v-btn color="blue darken-1" text @click="updateCheck()"
            >Sauvegarder</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import FormUser from "./FormUser.vue";

export default {
  name: "users",
  data() {
    return {
      Users: [],
      email: "",
      headers: [
        {
          text: "Email",
          align: "start",
          sortable: true,
          value: "emails[0].address",
        },
        { text: "ID", value: "_id", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: "",
      dialogUpdateUser: false,
      form: "",
      foundUser: {
        _id: null,
        email: null,
      },
    };
  },

  components: { FormUser },

  meteor: {
    $subscribe: {
      users: [],
    },
    users() {
      return Meteor.users.find();
    },
  },
  
  methods: {
    showDialog(id) {
      const userFound = Meteor.users.findOne({'_id' : id});
      this.foundUser._id = userFound._id;
      this.foundUser.email = userFound.emails[0].address;
      this.dialog = true;
    },

    showDialogUpdate(id) {
      const userFound = Meteor.users.findOne({'_id' : id});
      this.foundUser._id = userFound._id;
      this.foundUser.email = userFound.emails[0].address
      this.dialogUpdateUser = true;
    },

    updateCheck() {
      if (!this.foundUser) return;
      Meteor.call( "editUser", this.foundUser._id, this.foundUser.email);
      this.foundUser = {
        _id: null,
        email: null,
      };
      this.hideDialogUpdate();
    },

    onRemoveUser() {
      if (!this.foundUser) return;
      Meteor.call("deleteUser", this.foundUser._id,  this.foundUser.email);
      this.foundUser = {
        _id: null,
        email: null,
      };
      this.hideDialog();
    },

    hideDialog() {
      this.foundUser = {
        _id: null,
        email: null,
      };
      this.dialog = false;
    },

    hideDialogUpdate() {
      this.foundUser = {
        _id: null,
        email: null,
      };
      this.dialogUpdateUser = false;
    },
  },
};
</script>

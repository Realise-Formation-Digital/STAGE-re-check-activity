<template>
  <v-container class="formulaire">
    <v-row>
      <v-btn color="success" dark @click="dialog = true">
        Ajouter un utilisateur
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Données Utilisateur</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.email"
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.password"
                    label="Mot de passe*"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*Champs obligatoires</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="hideDialog()">
              Fermer
            </v-btn>
            <v-btn color="blue darken-1" text @click="createCheck()">
              Enregister
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "FormUser",

  data: () => ({
    dialog: false,
    form: {
      email: null,
      password: null
    },
  }),
  methods: {
    showDialog() {
      this.dialog = true;
    },

    createCheck() {
      Meteor.call("registerUser", this.form.email, this.form.password);
      location.reload();
      this.hideDialog();
    },

    hideDialog() {
      this.form = {
        email: null,
        password: null
      };
      this.dialog = false;
    },
  },
};
</script>
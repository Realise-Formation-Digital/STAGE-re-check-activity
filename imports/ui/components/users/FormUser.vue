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
                    v-model="form.name"
                    label="Nom*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.identification"
                    label="Identification*"
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
      company: null,
    },
  }),
  methods: {
    showDialog() {
      this.dialog = true;
    },

    createCheck() {
      Meteor.call("createUser", this.form.name, this.form.identification);
      location.reload();
      this.hideDialog();
    },

    hideDialog() {
      this.form = {
        name: null,
        identification: null
      };
      this.dialog = false;
    },
  },
};
</script>
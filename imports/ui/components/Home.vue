<template>
  <v-card class="px-4">
    <v-row>
      <v-col cols="12">
        <h2>Inscription</h2>
      </v-col>
    </v-row>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Mot de passe"
            type="password"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate()"
          >
            Valider
          </v-btn>
          <v-btn color="error" class="mr-4" @click="reset">
            Réinitialiser le formulaire
          </v-btn>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="320">
        <v-card>
          <v-card-title class="headline"> Confirmation </v-card-title>
          <v-card-text>
            Vous allez recevoir un email de confirmation à l'adresse suivante :
            <strong>{{ this.email }}</strong>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="hideDialog()"
              >Fermer</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: "index",
  data: () => ({
    dialog: false,
    valid: true,
    email: "",
    password: "",
    emailRules: [
      (v) => !!v || "L'email est obligatoire",
      (v) => /.+@.+\..+/.test(v) || "L'email doit être valide",
    ],
    passwordRules: [
      (required = (value) => !!value || "Obligatoire"),
      (min = (v) => (v && v.length >= 8) || "Min 8 caractères"),
    ],
  }),

  methods: {
    validate() {
      Meteor.call("registerUser", this.email, this.password);
      this.showDialog();
    },

    reset() {
      this.$refs.form.reset();
    },

    showDialog() {
      this.dialog = true;
    },

    hideDialog() {
      this.$refs.form.reset();
      this.dialog = false;
    },
  },
};
</script>
<template>
  <v-container class="formulaire">
    <v-row justify="right">
      <v-btn color="success" dark @click="dialog = true">
            Ajouter un problème 
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un problème </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="form.title" label="Nature du problème*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="form.description" label="Description du problème*" required></v-text-field>
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
              Enregistrer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "FormProblem",

  data: () => ({
    dialog: false,
    form: {
      company: null

    }
  }),
  methods: {
    showDialog() {
      this.dialog = true
    },

    createCheck(){

      console.log("Value title", this.form.title)
      Meteor.call('createProblem', this.form.title, this.form.description)
      location.reload()
      this.hideDialog()
    },

    hideDialog() {
      this.form.title = null
      this.dialog = false
    }
  }
};
</script>
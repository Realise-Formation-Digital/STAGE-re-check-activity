<template>
  <v-container class="formulaire">
    <v-row justify="right">
      <v-btn color="success" dark @click="dialog = true">
            Ajouter un bâtiment
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Données Building</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="form.company" label="Entreprise*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="form.name" label="Bâtiment*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="form.adress" label="Adresse*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete v-model="form.floor"
                    :items="[
                      'Rez-de-chaussée',
                      '1er',
                      '2ème',
                      '3ème',
                      '4ème',
                      '5ème',
                      '6ème',
                      '7ème',
                      '8ème',
                    ]"
                    label="Etage*"
                  ></v-autocomplete>
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
  name: "FormBuilding",

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

      console.log("Value company", this.form.company)
      Meteor.call('createBuilding', this.form.company, this.form.name, this.form.adress, this.form.floor)
      location.reload()
      this.hideDialog()
    },

    hideDialog() {
      this.form.company = null
      this.dialog = false
    }
  }
};
</script>
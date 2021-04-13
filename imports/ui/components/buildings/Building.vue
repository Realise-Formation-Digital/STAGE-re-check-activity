<template>
<v-container style="margin-bottom:200px">
    <FormBuilding />
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
    </v-col>
    <v-col cols="12" md="4">
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Bâtiments</v-card-title>
        <v-data-table
          :headers="headers"
          :items="buildings"
          :items-per-page="5"
          class="elevation-3"
          locale="fr"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="showDialog(item._id)">mdi-delete</v-icon>
            <v-icon @click="showDialog1(item._id)">mdi-pencil</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" max-width="320">
    <v-card>
      <v-card-title class="headline">
        Bâtiment
      </v-card-title>
      <v-card-text>
        Êtes-vous certain de vouloir supprimer le bâtiment <strong>{{foundBuilding && foundBuilding.name}}</strong> ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="green darken-1" text @click="onRemoveBuilding()">Confirmer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialog1" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Modifier le bâtiment {{ foundBuilding.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="foundBuilding.company" label="Entreprise*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="foundBuilding.name" label="Bâtiment*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="foundBuilding.address" label="Adresse*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete v-model="foundBuilding.floor"
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
              >
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <small>*Champs obligatoires</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="hideDialog1()">Fermer</v-btn>
            <v-btn color="blue darken-1" text @click="updateCheck()">Sauvegarder</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-container>
</template>
<script>
import Buildings from '../../../api/collections/Buildings';
import FormBuilding from "./FormBuilding.vue";

export default {
  name: "buildings",
  data() {
    return {
      Buildings: [],
      name: "",
      headers: [
        { text: "Entreprise", align: "start", sortable: true, value: "company" },
        { text: "Bâtiment", value: "name", sortable: true },
        { text: "Adresse", value: "address", sortable: true },
        { text: "Etage", value: "floor", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: '',
      dialog1: false,
      form: '',
      foundBuilding: {_id:null, company:null, name:null, address:null, floor:null}
    };
  },

  components: { FormBuilding },

  meteor: {
      $subscribe: {
        'buildings': [],
      },
      buildings() {
        return Buildings.find();
      },
  },

  methods: {
    showDialog(id) {
      this.foundBuilding = this.buildings.find((building) => building._id === id)
      console.log("Building", this.foundBuilding)
      this.dialog = true
    },

    showDialog1(id) {
      this.foundBuilding = this.buildings.find((building) => building._id === id)
      console.log("Building", this.foundBuilding)
      this.dialog1 = true
    },

    updateCheck(){
      Meteor.call('editBuilding', this.foundBuilding._id, this.foundBuilding.company, this.foundBuilding.name, 
      this.foundBuilding.address, this.foundBuilding.floor)
      this.hideDialog1()
    },

    onRemoveBuilding() {
      if (!this.foundBuilding) return
      Meteor.call('deletebuilding',  this.foundBuilding._id);
      this.foundBuilding = {_id:null, company:null, name:null, address:null, floor:null};
      this.hideDialog();
    },

    hideDialog() {
      this.foundBuilding = {_id:null, company:null, name:null, address:null, floor:null};
      this.dialog = false
    },

    hideDialog1() {
      this.foundBuilding = {_id:null, company:null, name:null, address:null, floor:null};
      this.dialog1 = false
    }
  },
};
</script>
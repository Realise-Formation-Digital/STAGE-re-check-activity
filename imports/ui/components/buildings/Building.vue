<template>
  <v-container style="margin-bottom: 200px">
    <FormBuilding />
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" md="8"> </v-col>
      <v-col cols="12" md="4"> </v-col>
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
              <v-icon @click="showDialogUpdate(item._id)">mdi-pencil</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog Delete Building -->
    <v-dialog v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="headline"> Bâtiment </v-card-title>
        <v-card-text>
          Êtes-vous certain de vouloir supprimer le bâtiment
          <strong>{{ foundBuilding && foundBuilding.name }}</strong> ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Annuler</v-btn
          >
          <v-btn color="green darken-1" text @click="onRemoveBuilding()"
            >Confirmer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Update Building -->
    <v-dialog v-model="dialogUpdateBuilding" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Modifier le bâtiment {{ foundBuilding.name }}</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="foundBuilding.company"
                  label="Entreprise*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="foundBuilding.name"
                  label="Bâtiment*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="foundBuilding.address"
                  label="Adresse*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="foundBuilding.floor"
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
import Buildings from "../../../api/collections/Buildings";
import FormBuilding from "./FormBuilding.vue";

export default {
  name: "buildings",
  data() {
    return {
      Buildings: [],
      name: "",
      headers: [
        {
          text: "Entreprise",
          align: "start",
          sortable: true,
          value: "company",
        },
        { text: "Bâtiment", value: "name", sortable: true },
        { text: "Adresse", value: "address", sortable: true },
        { text: "Etage", value: "floor", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: "",
      dialogUpdateBuilding: false,
      form: "",
      foundBuilding: {
        _id: null,
        company: null,
        name: null,
        address: null,
        floor: null,
      },
    };
  },

  components: { FormBuilding },

  meteor: {
    $subscribe: {
      buildings: [],
    },
    buildings() {
      return Buildings.find();
    },
  },

  methods: {
    showDialog(id) {
      this.foundBuilding = this.buildings.find(
        (building) => building._id === id
      );
      this.dialog = true;
    },

    showDialogUpdate(id) {
      this.foundBuilding = this.buildings.find(
        (building) => building._id === id
      );
      this.dialogUpdateBuilding = true;
    },

    updateCheck() {
      Meteor.call(
        "editBuilding",
        this.foundBuilding._id,
        this.foundBuilding.company,
        this.foundBuilding.name,
        this.foundBuilding.address,
        this.foundBuilding.floor
      );
      this.hideDialogUpdate();
    },

    onRemoveBuilding() {
      if (!this.foundBuilding) return;
      Meteor.call("deletebuilding", this.foundBuilding._id);
      this.foundBuilding = {
        _id: null,
        company: null,
        name: null,
        address: null,
        floor: null,
      };
      this.hideDialog();
    },

    hideDialog() {
      this.foundBuilding = {
        _id: null,
        company: null,
        name: null,
        address: null,
        floor: null,
      };
      this.dialog = false;
    },

    hideDialogUpdate() {
      this.foundBuilding = {
        _id: null,
        company: null,
        name: null,
        address: null,
        floor: null,
      };
      this.dialogUpdateBuilding = false;
    },
  },
};
</script>
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
            <v-icon @click="showDialog(id)">mdi-delete</v-icon>{{ item._id }}
            
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog
            v-model="dialog"
            max-width="290"
            >
            <v-card>
              <v-card-title class="headline">
                Bâtiment
              </v-card-title>
              <v-card-text>
                Êtes-vous certain de vouloir supprimer le bâtiment <strong></strong> ?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
                >Annuler</v-btn>
                <v-btn
                color="green darken-1"
                text
                @click="onRemoveBuilding(_id)"
                >Confirmer</v-btn>
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
        { text: "Adresse", value: "adress", sortable: true },
        { text: "Etage", value: "floor", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: '',
      id: null,
      foundBuilding: null
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
      this.foundBuilding = Buildings.find((building) => building._id === id)
      this.dialog = true
    },

    onRemoveBuilding(_id) {
      Meteor.call('deletebuilding', _id);
      this.item = false;
      this.hideDialog();
    },

    hideDialog() {
      this.item._id= null
      this.dialog = false
    }
  },
};
</script>
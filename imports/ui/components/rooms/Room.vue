<template>
<v-container style="margin-bottom:200px">
    <FormRoom />
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
    </v-col>
    <v-col cols="12" md="4">
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Locaux</v-card-title>
        <v-data-table
          :headers="headers"
          :items="rooms"
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
  <v-dialog v-model="dialog" max-width="320">
    <v-card>
      <v-card-title class="headline">
        Local
      </v-card-title>
      <v-card-text>
        Êtes-vous certain de vouloir supprimer le local <strong>{{foundRoom && foundRoom.name}}</strong> ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="green darken-1" text @click="onRemoveRoom()">Confirmer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-container>
</template>
<script>
import Rooms from '../../../api/collections/Rooms';
import FormRoom from "./FormRoom.vue";

export default {
  name: "rooms",
  data() {
    return {
      Rooms: [],
      name: "",
      headers: [
        { text: "Local", align: "start", sortable: true, value: "name" },
        { text: "Etage", value: "floor", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: '',
      foundRoom: null
    };
  },

  components: { FormRoom },

  meteor: {
      $subscribe: {
        'rooms': [],
      },
      rooms() {
        return Rooms.find();
      },
  },

  methods: {
    showDialog(id) {
      this.foundRoom = this.rooms.find((room) => room._id === id)
      console.log("Room", this.foundRoom)
      this.dialog = true
    },

    onRemoveRoom() {
      if (!this.foundRoom) return
      Meteor.call('deleteroom',  this.foundRoom._id);
      this.foundRoom = false;
      this.hideDialog();
    },

    hideDialog() {
      this.foundRoom = null
      this.dialog = false
    }
  },
};
</script>
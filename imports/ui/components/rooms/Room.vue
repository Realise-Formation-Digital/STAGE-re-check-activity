<template>
  <v-container style="margin-bottom:200px">
    <FormRoom/>
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
              <v-icon @click="showDialog1(item._id)">mdi-pencil</v-icon>
            </template>

            <template v-slot:[`item.buildingId`]="{ item }">
              {{findBuildingName(item.buildingId)}}
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
          Êtes-vous certain de vouloir supprimer le local <strong>{{ foundRoom && foundRoom.name }}</strong> ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="green darken-1" text @click="onRemoveRoom()">Confirmer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Modifier un local {{ foundRoom.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select v-model="foundRoom.buildingId" label="Bâtiment*" required
                          :items="buildingList"
                          item-value="id"
                          item-text="name"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="foundRoom.name" label="Local*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete v-model="foundRoom.floor"
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
          <v-btn color="blue darken-1" text @click="hideDialog1()">Fermer</v-btn>
          <v-btn color="blue darken-1" text @click="updateCheck()">Sauvegarder</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Rooms from '../../../api/collections/Rooms';
import Buildings from '../../../api/collections/Buildings';
import FormRoom from "./FormRoom.vue";

export default {
  name: "rooms",
  data() {
    return {
      Rooms: [],
      Buildings: [],
      name: "",
      headers: [
        {text: "Local", align: "start", sortable: true, value: "name"},
        {text: "Batiment", value: "buildingId", sortable: true},
        {text: "Etage", value: "floor", sortable: true},
        {text: "Actions", value: "actions", sortable: false},
      ],
      dialog: '',
      dialog1: false,
      form: '',
      foundRoom: {_id: null, name: null, floor: null, buildingId: null},
    };
  },

  components: {FormRoom},

  meteor: {
    $subscribe: {
      'rooms': [],
      'buildings': [],
    },
    rooms() {
      return Rooms.find();
    },
    buildings() {
      return Buildings.find();
    },
    buildingList() {
      const buildingsFound = Buildings.find();
      return buildingsFound.map((building) => {
        return {
          name: building.name,
          id: building._id
        }
      })
    }
  },

  methods: {
    showDialog(id) {
      this.foundRoom = this.rooms.find((room) => room._id === id)
      console.log("Room", this.foundRoom)
      this.dialog = true
    },

    showDialog1(id) {
      this.foundRoom = this.rooms.find((room) => room._id === id)
      console.log("Room", this.foundRoom)
      this.dialog1 = true
    },

    findBuildingName(idBuilding) {
      const foundBuilding = this.buildings.find((b) => b._id === idBuilding)
      if (!foundBuilding) return ""
      return foundBuilding.name
    },

    updateCheck() {
      Meteor.call('editRoom', this.foundRoom._id, this.foundRoom.name, this.foundRoom.floor, this.foundRoom.buildingId)
      this.hideDialog1()
    },

    onRemoveRoom() {
      if (!this.foundRoom) return
      Meteor.call('deleteRoom', this.foundRoom._id);
      this.foundRoom = {_id: null, name: null, floor: null, buildingId: null};
      this.hideDialog();
    },

    hideDialog() {
      this.foundRoom = {_id: null, name: null, floor: null, buildingId: null}
      this.dialog = false
    },

    hideDialog1() {
      this.foundRoom = {_id: null, name: null, floor: null, buildingId: null}
      this.dialog1 = false
    }
  },
};
</script>

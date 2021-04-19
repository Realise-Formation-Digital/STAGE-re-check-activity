<template>
  <v-container style="margin-bottom: 200px">
    <FormConfirm />
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" md="8"> </v-col>
      <v-col cols="12" md="4"> </v-col>
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Confirmations</v-card-title>
          <v-data-table
            :headers="headers"
            :items="confirms"
            :items-per-page="5"
            class="elevation-3"
            locale="fr"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="showDialog(item._id)">mdi-delete</v-icon>
              <v-icon @click="showDialogUpdate(item._id)">mdi-pencil</v-icon>
            </template>

            <template v-slot:[`item.roomId`]="{ item }">
              {{ findRoomName(item.roomId) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog Delete Confirm -->
    <v-dialog v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="headline"> Confirmation </v-card-title>
        <v-card-text>
          Êtes-vous certain de vouloir supprimer la confirmation
          <strong>{{ foundConfirm && foundConfirm._id }}</strong> ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Annuler</v-btn
          >
          <v-btn color="green darken-1" text @click="onRemoveConfirm()"
            >Confirmer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Update Confirm -->
    <v-dialog v-model="dialogUpdateConfirm" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Modifier une confirmation {{ foundConfirm._id }}</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="foundConfirm.roomId"
                  label="Local*"
                  required
                  :items="roomList"
                  item-value="id"
                  item-text="name"
                />
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="foundConfirm.status"
                  :items="[
                    'Pas nettoyé',
                    'En attente',
                    'Nettoyé'
                  ]"
                  label="Status*"
                ></v-autocomplete>
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
import Rooms from "../../../api/collections/Rooms";
import Confirms from "../../../api/collections/Confirms";
import FormConfirm from "./FormConfirm.vue";

export default {
  name: "confirms",
  data() {
    return {
      Rooms: [],
      Confirms: [],
      headers: [
        { text: "ID", align: "start", sortable: true, value: "_id" },
        { text: "Local", value: "roomId", sortable: true },
        { text: "Status", value: "status", sortable: true },
        { text: "Date Confirmation", value: "timestamp", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: "",
      dialogUpdateConfirm: false,
      form: "",
      foundConfirm: { _id: null, status: null, timestamp: null, roomId: null },
    };
  },

  components: { FormConfirm },

  meteor: {
    $subscribe: {
      rooms: [],
      confirms: [],
    },
    rooms() {
      return Rooms.find();
    },
    confirms() {
      return Confirms.find();
    },
    roomList() {
      const roomsFound = Rooms.find();
      return roomsFound.map((room) => {
        return {
          name: room.name,
          id: room._id,
        };
      });
    },
  },

  methods: {
    showDialog(id) {
      this.foundConfirm = this.confirms.find((confirm) => confirm._id === id);
      this.dialog = true;
    },

    showDialogUpdate(id) {
      this.foundConfirm = this.confirms.find((confirm) => confirm._id === id);
      this.dialogUpdateConfirm = true;
    },

    findRoomName(idRoom) {
      const foundRoom = this.rooms.find((r) => r._id === idRoom);
      if (!foundRoom) return "";
      return foundRoom.name;
    },

    updateCheck() {
      Meteor.call(
        "editConfirm",
        this.foundConfirm._id,
        this.foundConfirm.roomId,
        this.foundConfirm.status
      );
      this.hideDialogUpdate();
    },

    onRemoveConfirm() {
      if (!this.foundConfirm) return;
      Meteor.call("deleteConfirm", this.foundConfirm._id);
      this.foundConfirm = { _id: null, roomId: null, status: null };
      this.hideDialog();
    },

    hideDialog() {
      this.foundConfirm = { _id: null, roomId: null, status: null };
      this.dialog = false;
    },

    hideDialogUpdate() {
      this.foundConfirm = { _id: null, roomId: null, status: null };
      this.dialogUpdateConfirm = false;
    },
  },
};
</script>
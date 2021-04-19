<template>
  <v-container class="formulaire">
    <v-row>
      <v-btn color="success" dark @click="dialog = true">
        Ajouter une confirmation
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter une confirmation</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="form.roomId"
                    label="Local*"
                    required
                    :items="roomList"
                    item-value="id"
                    item-text="name"
                  />
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="form.status"
                    :items="[
                      'Pas nettoyé',
                      'En attente',
                      'Nettoyé',
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
import Confirms from "../../../api/collections/Confirms";
import Rooms from "../../../api/collections/Rooms";
export default {
  name: "FormConfirm",
  meteor: {
    $subscribe: {
      confirms: [],
      rooms: [],
    },
    confirms() {
      return Confirms.find();
    },
    rooms() {
      return Rooms.find();
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
  data: () => ({
    dialog: false,
    form: {
      confirm: null,
    },
  }),

  methods: {
    showDialog() {
      this.dialog = true;
    },

    createCheck() {
      Meteor.call("createConfirm", this.form.roomId, this.form.status);
      this.hideDialog();
    },

    hideDialog() {
      this.form = {
        roomId: null,
        status: null,
      }; 
      this.dialog = false;
    },
  },
};
</script>
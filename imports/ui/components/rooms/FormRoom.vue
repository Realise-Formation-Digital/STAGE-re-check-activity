<template>
  <v-container class="formulaire">
    <v-row>
     <v-btn color="success" dark @click="dialog = true">
            Ajouter un local
     </v-btn>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un local</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select v-model="form.buildingId" label="Bâtiment*" required
                   :items="buildingList"
                   item-value="id"
                   item-text="name"
                  />                     
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="form.name" label="Local*" required></v-text-field>
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
              Enregistrer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import Buildings from '../../../api/collections/Buildings';
export default {
  name: "FormRoom",
  meteor: {
    $subscribe: {
      'buildings': [],
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
  data: () => ({
    dialog: false,
    form: {
      room: null,
      floor: null,
      buildingId: null
    },
  }),

  methods: {
    showDialog() {
      this.dialog = true
    },

    createCheck(){
      Meteor.call('createRoom', this.form.name, this.form.floor, this.form.buildingId)
      this.hideDialog()
    },

    hideDialog() {
      this.form = {
        room: null,
        floor: null,
        buildingId: null
      }
      this.dialog = false
    }
  }
};
</script>
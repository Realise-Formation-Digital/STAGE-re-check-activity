<template>
<v-container style="margin-bottom:200px">
    <FormProblem />
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
    </v-col>
    <v-col cols="12" md="4">
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Problèmes à signaler</v-card-title>
        <v-data-table
          :headers="headers"
          :items="problems"
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
  <v-dialog
            v-model="dialog"
            max-width="320"
            >
            <v-card>
              <v-card-title class="headline">
                Problèmes à signaler  
              </v-card-title>
              <v-card-text>
                Êtes-vous certain de vouloir supprimer ce problème <strong>{{foundProblem && foundProblem.title}}</strong> ?
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
                @click="onRemoveProblem()"
                >Confirmer</v-btn>
              </v-card-actions>
            </v-card>
            </v-dialog>
  </v-container>
</template>
<script>
import Problems from '../../../api/collections/Problems';
import FormProblem from "./FormProblem.vue";

export default {
  name: "problems",
  data() {
    return {
      Problems: [],
      name: "",
      headers: [
        { text: "Problème", align: "start", sortable: true, value: "title" },
        { text: "Description", value: "description", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: '',
      foundProblem: null
    };
  },

  components: { FormProblem },

  meteor: {
      $subscribe: {
        'problems': [],
      },
      problems() {
        return Problems.find();
      },
  },

  methods: {
    showDialog(id) {
      this.foundProblem = this.problems.find((problem) => problem._id === id)
      console.log("Problem", this.foundProblem)
      this.dialog = true
    },

    onRemoveProblem() {
      if (!this.foundProblem) return
      Meteor.call('deleteproblem',  this.foundProblem._id);
      this.foundProblem = false;
      this.hideDialog();
    },

    hideDialog() {
      this.foundProblem = null
      this.dialog = false
    }
  },
};
</script>
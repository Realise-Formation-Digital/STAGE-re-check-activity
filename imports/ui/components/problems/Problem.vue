<template>
  <v-container style="margin-bottom: 200px">
    <FormProblem />
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" md="8"> </v-col>
      <v-col cols="12" md="4"> </v-col>
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
              <v-icon @click="showDialogUpdate(item._id)">mdi-pencil</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog Delete Problem -->
    <v-dialog v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="headline"> Problèmes à signaler </v-card-title>
        <v-card-text>
          Êtes-vous certain de vouloir supprimer ce problème
          <strong>{{ foundProblem && foundProblem.title }}</strong> ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Annuler</v-btn
          >
          <v-btn color="green darken-1" text @click="onRemoveProblem()"
            >Confirmer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog Update Problem -->
    <v-dialog v-model="dialogUpdateProblem" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Modification lié au problème {{ foundProblem.title }}</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="foundProblem.title"
                  label="Problème*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="foundProblem.description"
                  label="Description*"
                  required
                ></v-text-field>
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
import Problems from "../../../api/collections/Problems";
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
      dialog: "",
      dialogUpdateProblem: false,
      form: "",
      foundProblem: { _id: null, title: null, description: null },
    };
  },

  components: { FormProblem },

  meteor: {
    $subscribe: {
      problems: [],
    },
    problems() {
      return Problems.find();
    },
  },

  methods: {
    showDialog(id) {
      this.foundProblem = this.problems.find((problem) => problem._id === id);
      this.dialog = true;
    },

    showDialogUpdate(id) {
      this.foundProblem = this.problems.find((problem) => problem._id === id);
      this.dialogUpdateProblem = true;
    },

    updateCheck() {
      Meteor.call(
        "editProblem",
        this.foundProblem._id,
        this.foundProblem.title,
        this.foundProblem.description
      );
      this.hideDialogUpdate();
    },

    onRemoveProblem() {
      if (!this.foundProblem) return;
      Meteor.call("deleteproblem", this.foundProblem._id);
      this.foundProblem = { _id: null, title: null, description: null };
      this.hideDialog();
    },

    hideDialog() {
      this.foundProblem = { _id: null, title: null, description: null };
      this.dialog = false;
    },

    hideDialogUpdate() {
      this.foundProblem = { _id: null, title: null, description: null };
      this.dialogUpdateProblem = false;
    },
  },
};
</script>
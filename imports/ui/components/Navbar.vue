<template>
  <v-app-bar color="blue" dense>
    <v-app-bar-title>Recheck</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn>
    <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>


<script>
export default {
  name: "Navbar",
  data: () => ({
    collapseOnScroll: true,
  }),
};
</script>

<style>
</style>

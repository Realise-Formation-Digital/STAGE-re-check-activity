<template>
  <v-app id="app">
    <v-main>
      <Navbar />
      <v-container fluid>
        <router-view />
      </v-container>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/layouts/Navbar.vue";
import Footer from "./components/layouts/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
</style>

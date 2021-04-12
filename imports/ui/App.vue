<template>
  <v-app id="app">
    <v-main>
      <v-container
          fluid>
          <Navbar />
        <router-view/>
          <Footer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/layouts/Navbar.vue";
import Footer from "./components/layouts/Footer.vue";
export default {
  name: 'App',
	components: {
		Navbar, Footer
	},

}
</script>

<style>

</style>

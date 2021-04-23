<template>
  <v-footer color="black lighten-1" fixed>
    <v-row justify="center" no-gutters>
      <v-col class="black lighten-2 text-center white--text" cols="12">
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        {{ new Date().getFullYear() }}
      </v-col>
      <div class="subheading">
        <v-col class="black lighten-2" cols="12">
          <v-img src="img/logoRealise.png" max-height="60" max-width="120" />
        </v-col>
      </div>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  data: () => ({
    links: ["Brusk", "Daniel", "Lahouari", "Ruben", "Simon", "Tristan", "©"],
  }),
};
</script>
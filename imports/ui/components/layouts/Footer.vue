<template>
  <v-footer color="black lighten-1" fixed>
    <v-row justify="center" no-gutters>
      <div class="subheading">
        <v-col class="black lighten-2" cols="12">
          <v-img src="img/imageLogoRealise.png" max-height="60" max-width="120" />
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
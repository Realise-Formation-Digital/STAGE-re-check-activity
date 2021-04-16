<template>
  <v-footer color="black lighten-1" fixed>
    <v-row justify="center" no-gutters>
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
      <v-col class="black lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>réalise</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  data: () => ({
    links: ["Brusk", "Daniel", "Lahouari", "Ruben", "Simon", "Tristan"],
  }),
};
</script>
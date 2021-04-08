<template>
  <div>
    <Navbar />
    <FormBuilding />
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import FormBuilding from "./FormBuilding.vue";

export default {
  data() {
    return {
      counter: 0,
    };
  },

  components: { Navbar, FormBuilding },
};
</script>

<style scoped>
p {
  font-family: serif;
}
</style>

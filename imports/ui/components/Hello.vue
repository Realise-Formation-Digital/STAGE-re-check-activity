<template>
  <div>
    <Navbar />
    <FormBuilding />
    <FormRoom />
    <Building />

  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import FormBuilding from "./FormBuilding.vue";
import FormRoom from "./FormRoom.vue";
import Building from "./Building.vue";




export default {
  data() {
    return {
      counter: 0,
    };
  },

  components: { Navbar, FormBuilding, FormRoom, Building },
};
</script>

<style scoped>
p {
  font-family: serif;
}
</style>

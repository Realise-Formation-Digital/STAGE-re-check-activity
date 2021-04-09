
<template>
<ul>
  <li v-for="building in buildings" :key="building.company">
    
      {{ building.company }} - {{ building.name }} - {{ building.adress }} - {{ building.floor }}
    
  </li>
</ul>
</template>

<script>
import Buildings from '../../api/collections/Buildings';
export default {
  name: 'Building',
  meteor: {
    $subscribe: {
      'buildings': [],
    },
    buildings() {
      return Buildings.find();
    },
  }
};
</script>>
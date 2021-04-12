import {Meteor} from "meteor/meteor";
import Vue from 'vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//import '@mdi/font/css/materialdesignicons.css' 
//import 'material-design-icons-iconfont/dist/material-design-icons.css'
import fr from 'vuetify/src/locale/fr.ts'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  }
}

Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'fr'
    },
  },
})

export default new Vuetify({
  lang: {
    locales: { fr },
    current: 'fr',
  },
})

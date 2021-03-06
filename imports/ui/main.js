import {Meteor} from "meteor/meteor";

import Vue from 'vue'
import './plugins/tracker'
import App from "./App";
import router from "./plugins/router";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";

Meteor.startup(() => {
  new Vue({
    el: '#app',
    router: router,
    vuetify: vuetify,
    ...App,
  })
})
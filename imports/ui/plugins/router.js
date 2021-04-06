// Import the router
import {Meteor} from "meteor/meteor";

import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from "../components/Hello";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Hello,
  }
]

export default new VueRouter({
  mode: 'history',
  routes: routes
})

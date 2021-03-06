// Import the router
import {Meteor} from "meteor/meteor";

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../components/Home";
import Building from "../components/buildings/Building";
import Room from "../components/rooms/Room";
import Users from "../components/users/Users.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Home,
  },
  {
    path: '/batiments',
    name: 'building',
    component: Building,
  },
  {
    path: '/locaux',
    name: 'room',
    component: Room,
  },
  {
    path: '/utilisateurs',
    name: 'users',
    component: Users,
  },

]

export default new VueRouter({
  mode: 'history',
  routes: routes
})

// Import the router
import {Meteor} from "meteor/meteor";

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../components/Home";
import Building from "../components/buildings/Building";
import Room from "../components/rooms/Room";
import Problem from "../components/problems/Problem";
import User from "../components/users/User"
import Confirm from "../components/confirms/Confirm"

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
    name: 'user',
    component: User,
  },
  {
    path: '/problemes',
    name: 'problem',
    component: Problem,
  },
  {
    path: '/confirmations',
    name: 'confirm',
    component: Confirm,
  },

]

export default new VueRouter({
  mode: 'history',
  routes: routes
})

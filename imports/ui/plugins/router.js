// Import the router
import { Meteor } from "meteor/meteor";

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../components/Home";
import Building from "../components/buildings/Building";
import Room from "../components/rooms/Room";
import Problem from "../components/problems/Problem";
import Confirm from "../components/confirms/Confirm";
import User from "../components/users/User";
import Login from "../components/Login";

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
    path: '/problemes',
    name: 'problem',
    component: Problem,
  },
  {
    path: '/confirmations',
    name: 'confirm',
    component: Confirm,
  },
  {
    path: '/utilisateurs',
    name: 'user',
    component: User,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },

]

export default new VueRouter({
  mode: 'history',
  routes: routes
});

Accounts.onEmailVerificationLink(function (token, done) {
  Accounts.verifyEmail(token, (err) => {
    if (err) {
      console.log("Error: ", err);
    } else {

      // Call a method in the server to send the enrollment email


      console.log("Success");
    }
  });
});

// add Function to send email to change the initial password
Accounts.onEnrollmentLink((token, done) => {
  Accounts.resetPassword(token, newPassword, (err) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      window.location.href = 'http://localhost:3000/login'
      done();
    }
  });
});

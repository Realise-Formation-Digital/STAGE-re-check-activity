import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Users from '../collections/Users.js';

Meteor.methods({
  'createUser'(name, floor, building,) {
    check(name, String);
    check(floor, String);
    check(building, String);
    
    return Users.insert({
      name,
      floor,
      building,
      });
  },
});
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Users from '../collections/Users.js';

Meteor.methods({
  'createUser'(name, identification) {
    check(name, String);
    check(identification, String);
     
    return Users.insert({
      name,
      identification,
      });
  },
  'deleteuser'(_id){
    Users.remove(_id)
 },
});
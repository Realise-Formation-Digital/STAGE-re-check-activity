import { Meteor } from 'meteor/meteor';
import Users from '../collections/Users.js';

Meteor.publish('users', function () {
  return Users.find();
});

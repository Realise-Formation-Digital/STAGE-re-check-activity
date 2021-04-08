import { Meteor } from 'meteor/meteor';
import Confirms from '../collections/Confirms.js';

Meteor.publish('confirms', function () {
  return Confirms.find();
});


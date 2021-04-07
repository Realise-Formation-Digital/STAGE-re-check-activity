import { Meteor } from 'meteor/meteor';
import Histories from '../collections/Histories.js';

Meteor.publish('histories', function () {
  return Histories.find();
});

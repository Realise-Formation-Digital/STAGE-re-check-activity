import { Meteor } from 'meteor/meteor';
import Rooms from '../collections/Rooms.js';

Meteor.publish('rooms', function () {
  return Rooms.find();
});

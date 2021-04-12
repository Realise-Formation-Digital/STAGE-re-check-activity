import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Rooms from '../collections/Rooms.js';

Meteor.methods({
  'createRoom'(name, floor) {
    check(name, String);
    check(floor, String);
    

    return Rooms.insert({
      name,
      floor,
    });
  },
  'deleteroom'(_id){
    Rooms.remove(_id)
 },
});
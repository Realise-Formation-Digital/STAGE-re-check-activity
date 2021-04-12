import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Rooms from '../collections/Rooms.js';

Meteor.methods({
  'createRoom'(name, floor, buildingId) {
    check(name, String);
    check(floor, String);
    check(buildingId, String);
    

    return Rooms.insert({
      name,
      floor,
      buildingId,
    });
  },
  'deleteroom'(_id){
    Rooms.remove(_id)
  },
});
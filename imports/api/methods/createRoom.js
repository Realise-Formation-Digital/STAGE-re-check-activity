import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Rooms from '../collections/Rooms.js';

Meteor.methods({

  /**
   * Create new room
   * @param {*} name - Name of the room
   * @param {*} floor Name of the room's floor
   * @param {*} buildingId Name of the room's buildingId
   * @returns 
   */
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
  /**
   *  Delete Room
   * @param {*} _id 
   */
  'deleteroom'(id){
    Rooms.remove({'_id':id})
  },

  /**
   * Edit of a single room
   * @param {*} id - Id of the room that we want to modify
   * @param {*} name - New name of the room 
   * @param {*} floor - New name of the floor
   * @param {*} buildingId - New name of the BuildingID
   */

  'editRoom'(id, name, floor, buildingId) {

    // First we have to check if the fields are inserted in the right way 
    check(name, String);
    check(floor, String);
    check(buildingId, String);

    // we have to update the database
    Rooms.update({ "_id": id }, {
      'name': name,
      'floor': floor,
      'buildingId': buildingId
    })
  }
});

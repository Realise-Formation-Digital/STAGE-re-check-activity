import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Confirms from '../collections/Confirms.js';

Meteor.methods({
  /**
   * Create new confirm
   * @param {*} timestamp - Date of confirm
   * @param {*} roomId Name of the confirm's roomId
   * @returns 
   */
  'createConfirm'(timestamp, roomId) {
    check(timestamp, String);
    check(roomId, String);
    
    return Confirms.insert({
      timestamp,
      roomId
    });
  },

   /**
   *  Delete Confirm
   * @param {*} _id 
   */
  'deleteConfirm'(id){
    Confirms.remove({'_id':id})
  },

  /**
   * Edit of a single confirm
   * @param {*} id - Id of the confirm that we want to modify
   * @param {*} timestamp - New timestamp of the confirm 
   * @param {*} roomId - New name of the roomId
   */

  'editConfirm'(id, timestamp, roomId) {

    // First we have to check if the fields are inserted in the right way 
    check(timestamp, String);
    check(roomId, String);

    // we have to update the database
    Confirms.update({ "_id": id }, {
      'timestamp': timestamp,
      'roomId': roomId
    })
  }

});
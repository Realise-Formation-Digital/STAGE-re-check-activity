import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Confirms from '../collections/Confirms.js';

Meteor.methods({
  /**
   * Create new confirm
   * @param {Number} timestamp - Date of confirm
   * @param {String} roomId Name of the confirm's roomId
   * @param {String[]} problems - array of problems
   * @returns
   */
  'createConfirm'(roomId, problems) {
    //check(timestamp, String);
    check(roomId, String);
    // check(problems, [String]);

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const timestamp = date +' '+ time;

    return Confirms.insert({
      timestamp,
      roomId
    });
  },

   /**
   *  Delete Confirm
   * @param {String} id 
   */
  'deleteConfirm'(id){
    Confirms.remove({'_id':id})
  },

  /**
   * Edit of a single confirm
   * @param {String} id - Id of the confirm that we want to modify
   * @param {Number} timestamp - New timestamp of the confirm 
   * @param {String} roomId - New name of the roomId
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

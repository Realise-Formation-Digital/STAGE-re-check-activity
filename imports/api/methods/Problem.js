import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Problems from '../collections/Problems.js';

Meteor.methods({
  'createProblem'(title, description) {
    check(title, String);
    check(description, String);

    return Problems.insert({
      title,
      description,
    });
  },

  /**
   * Delete single problem
   * @param {String} id
   */
  'deleteproblem'(id){
    Problems.remove({'_id':id})
 },
 /**
   * Edit of a problem
   * @param {String} id - Id of the problem that we want to modify
   * @param {String} title -  title of the problem 
   * @param {String} description - Description of problem
   */

  'editProblem'(id, title, description) {

    // First we have to check if the fields are inserted in the right way 
    check(title, String);
    check(description, String);

    // we have to update the database
    Problems.update({ "_id": id }, 
    {
      'title': title,
      'description': description,
    })
  }
});
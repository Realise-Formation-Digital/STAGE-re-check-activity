import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


Meteor.methods({
  /**
   * Create new user 
   * @param {String} name - user's name
   * @param {String} identification - user's identification  
   * @returns 
   */
   'createUser'(name, identification) {
    check(name, String);
    check(identification, String);
   

    return Users.insert({
      name,
      identification,
      });
  },

  /**
   * Delete single user
   * @param {String} id
   */
  'deleteuser'(id){
    Users.remove({'_id':id})
  },

  /**
   * Edit of a single user
   * @param {String} id - Id of user that we want to modify
   * @param {String} name - user's name 
   * @param {String} identification - identification of the user
   */
  'edituser' (id, name, identification) {

    // First we have to check if the fields are inserted in the right way 
    check(name, String);
    check(identification, String);
    // we have to update the database
    Users.update({"_id": id}, {
      'name': name,
      'identification': identification,
     })
  }
});

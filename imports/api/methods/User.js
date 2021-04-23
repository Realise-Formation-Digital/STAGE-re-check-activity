import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from "meteor/accounts-base";


Meteor.methods({
  /**
   * Create new user 
   * @param {String} email - user's name
   * @param {String} password - user's identification  
   * @returns 
   */
  'registerUser'(email, password) {
    check(email, String);
    check(password, String);

    let userId = Accounts.createUser({
      email: email,
      password: password
    });
    Accounts.sendVerificationEmail(userId);
  },

  'accountSendEnrollmentEmail' (userId){
    Accounts.sendEnrollmentEmail(userId)
  },

  /**
   * Delete single user
   * @param {String} id
   */
  'deleteuser'(id) {
    Users.remove({ '_id': id })
  },

  /**
   * Edit of a single user
   * @param {String} id - Id of user that we want to modify
   * @param {String} email - user's name 
   * @param {String} password - identification of the user
   */
  'edituser'(id, email, passowrd) {

    // First we have to check if the fields are inserted in the right way 
    check(email, String);
    check(password, String);
    // we have to update the database
    Users.update({ "_id": id }, {
      'email': email,
      'password': password,
    })
  }
});

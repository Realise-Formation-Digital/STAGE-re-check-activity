import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Buildings from '../collections/Buildings.js';

Meteor.methods({

  /**
   * Create new building 
   * @param {String} company - company's building
   * @param {String} name - name of the building
   * @param {String} adress - adress of the building
   * @param {String} floor - floor of the building
   * @returns 
   */
  'createBuilding'(company, name, adress, floor) {
    check(company, String);
    check(name, String);
    check(adress, String);
    check(floor, String);

    console.log("ciao", name)

    return Buildings.insert({
      company,
      name,
      adress,
      floor,
    });
  },

  /**
   * Delete single building
   * @param {*} _id 
   */
  'deletebuilding'(_id){
    Buildings.remove(_id)
  },

  /**
   * Edit of a single building
   * @param {*} id - Id of building that we want to modify
   * @param {String} name - new name of building
   * @param {String} adress - new adress of buildin
   * @param {String} floor - new floor of building
   * @param {String} company - new company of building
   */
  'editBuilding' (id, name, adress, floor, company) {

    // First we have to check if the fields are inserted in the right way 
    check(company, String);
    check(name, String);
    check(adress, String);
    check(floor, String);

    // we have to update the database
    Buildings.update({"_id": id}, {
      'company': company,
      'name': name,
      'adress': adress,
      'floor': floor
    })
  }
});

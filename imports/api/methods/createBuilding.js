import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Buildings from '../collections/Buildings.js';

Meteor.methods({

  /**
   * Create new building 
   * @param {String} company - company's building
   * @param {String} name - name of the building
   * @param {String} address - address of the building
   * @param {String} floor - floor of the building
   * @returns 
   */
  'createBuilding'(company, name, address, floor) {
    check(company, String);
    check(name, String);
    check(address, String);
    check(floor, String);

    console.log("ciao", name)

    return Buildings.insert({
      company,
      name,
      address,
      floor,
    });
  },

  /**
   * Delete single building
   * @param {*} _id 
   */
  'deletebuilding'(id){
    Buildings.remove({'_id':id})
  },

  /**
   * Edit of a single building
   * @param {*} id - Id of building that we want to modify
   * @param {String} name - new name of building
   * @param {String} address - new address of buildin
   * @param {String} floor - new floor of building
   * @param {String} company - new company of building
   */
  'editBuilding' (id, company, name, address, floor) {

    // First we have to check if the fields are inserted in the right way 
    check(company, String);
    check(name, String);
    check(address, String);
    check(floor, String);

    // we have to update the database
    Buildings.update({"_id": id}, {
      'company': company,
      'name': name,
      'adress': address,
      'floor': floor
    })
  }
});

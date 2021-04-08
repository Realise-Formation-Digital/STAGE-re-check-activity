import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Buildings from '../collections/Buildings.js';

Meteor.methods({
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
});

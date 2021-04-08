import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Buildings from '../collections/Buildings.js';

Meteor.methods({
  'createBuilding'(name, adress, floor, company) {
    check(name, String);
    check(adress, String);
    check(floor, String);
    check(company, String);

    console.log("ciao", name)

    return Buildings.insert({
      name,
      adress,
      floor,
      company,
    });
  },
});

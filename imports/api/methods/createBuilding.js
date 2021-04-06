import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Histories from '../collections/Buildings.js';

Meteor.methods({
  'createBuilding'(name, adress, floor, manager) {
    check(name, String);
    check(adress, String);
    check(floor, String);
    check(manager, String);

    return Buildings.insert({
      name,
      adress,
      floor,
      manager,
      createdAt: new Date(),
    });
  },
});

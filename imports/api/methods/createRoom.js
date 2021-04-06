import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Links from '../collections/Rooms.js';

Meteor.methods({
  'createRoom'(name, floor, gender, building, accessibility) {
    check(name, String);
    check(floor, String);
    check(gender, String);
    check(building, String);
    check(accessibility, String);

    return Rooms.insert({
      name,
      floor,
      gender,
      building,
      accessibility,
      createdAt: new Date(),
    });
  },
});
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Histories from '../collections/Histories.js';

Meteor.methods({
  'createHistory'(timestamp, comment) {
    check(timestamp, String);
    check(comment, String);

    return Histories.insert({
      timestamp,
      comment,
      createdAt: new Date(),
    });
  },
});

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Confirms from '../collections/Confirms.js';

Meteor.methods({
  'createConfirm'(timestamp, comment) {
    check(timestamp, String);
    
    return Confirms.insert({
      timestamp,
    });
  },
});

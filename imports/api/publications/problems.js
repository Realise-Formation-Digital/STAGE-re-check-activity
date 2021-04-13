import { Meteor } from 'meteor/meteor';
import Problems from '../collections/Problems.js';

Meteor.publish('problems', function () {
  return Problems.find();
});

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Problems from '../collections/Problems.js';

Meteor.methods({
  'createProblem'(title, description) {
    check(title, String);
    check(description);

    return Problems.insert({
      title,
      description,
    });
  },
  'deleteproblem'(_id){
    Problems.remove(_id)
 },
});
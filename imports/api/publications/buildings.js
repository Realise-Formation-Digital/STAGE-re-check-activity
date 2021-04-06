import { Meteor } from 'meteor/meteor';
import Buildings from '../collections/Buildings.js';

Meteor.publish('buildings', function () {
  return Buildings.find();
});

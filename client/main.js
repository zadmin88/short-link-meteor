import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange } from '../imports/routes/routes';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';
import { Session } from 'meteor/session';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);

});

Meteor.startup(() => {
  Session.set('showVisible', false);
  // ReactDOM.render( <Signup/> , document.getElementById('app'));
  // Meteor.call('addNumbers','2',3,(err,res) => {
  //   console.log('argumentes',err,res);
  // })
  ReactDOM.render(routes, document.getElementById('app'));
});

import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';


Meteor.startup(() => {

WebApp.connectHandlers.use((req,res,next) => {
  const _id = req.url.slice(1);
  const link = Links.findOne({ _id });

  if (link) {
    res.statusCode = 302;
    res.setHeader( 'Location', link.url );
    res.end();
    Meteor.call('links.trackVisit', _id);
  } else{
    next();
  }

})
//   // const petSchema = new SimpleSchema({
//   //   name: {
//   //     type: String
//   //   }
//   // })
//   //
//   // petSchema.validate({
//   //   name: 12
//   //
//   //
//   // })
//
//   const employeeSchema = new SimpleSchema({
//     name: {
//       type: String,
//       max: 200,
//       min: 1
//     },
//
//     hourlyWage: {
//       type: Number,
//       min: 0
//     },
//
//     email: {
//       type: String,
//       regEx: SimpleSchema.RegEx.Email
//     }
//   });
//
//   employeeSchema.validate({
//     name: 'simon',
//     hourlyWage: 2,
//     email: 'zaimon@gmai.com'
//   })
//
//
  });

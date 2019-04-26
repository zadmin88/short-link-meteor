import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import '../startup/simple-schema-configuration';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    // this.userId
    return Links.find({userId: this.userId});
  });
}

Meteor.methods({
  // addNumbers(num1,num2){
  //   if ((typeof num1 != 'number') || (typeof num2 != 'number') ) {
  //     throw new Meteor.Error('parameters must be numbers');
  //   }else {
  //     return num1 + num2;
  //   }
  // }
  'links.insert'(url){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema ({
      url: {
        type:String,
        label: 'your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url })


    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount:0,
      lastVisitedAt: null
    });
  },
  'links.setVisibility'(_id, visible){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema ({
      _id: {
        type:String,
        min:1
      },
      visible: {
        type:Boolean
      }
    }).validate({ _id, visible })

    Links.update({
      _id,
      userId :this.userId
    }, {
      $set: { visible }
    });
  },

  'links.trackVisit'(_id){
    new SimpleSchema ({
      _id: {
        type:String,
        min:1
    }}).validate({ _id });

    Links.update({ _id }, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })

  }
});

import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';
import LinkListItem from './LinkListItem';
import { Session } from 'meteor/session';
// import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount(){
    this.linksTracker = Tracker.autorun(() => {
    Meteor.subscribe('links');
    let links = Links.find({
      visible: Session.get('showVisible')
    }).fetch();
    this.setState({ links });

    });
  }

  componentWillUnmount(){
    this.linksTracker.stop();
  }
  renderLinksListItems() {

    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No links Found</p>
        </div>
      )
    }
  return  this.state.links.map( (link) => {
    const shortUrl = Meteor.absoluteUrl(link._id);
    return <LinkListItem key={link._id}  shortUrl={shortUrl} {...link}/>;
      // return <p key={link._id}>{link.url}</p>
        });
  }

  render() {
    return (
      <div>
      <div>
          {this.renderLinksListItems()}
      </div>
      </div>
  );
  }
};

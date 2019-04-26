import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import Modal from 'react-modal';



export default class AddLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }
  onSubmit(e){
    // const url = this.refs.url.value.trim();
    const url = this.state.url;

    e.preventDefault();

    // if (url) {
      Meteor.call('links.insert', url, (err, res) =>{
        if (!err) {
          this.hadleModalClose.bind(this);
        } else {
          this.setState({error: err.reason});
        }
      });
      // Links.insert({ url, userId: Meteor.userId() });
      // this.refs.url.value = '';
    // };
  }
  onChange(e){
    this.setState({
      url: e.target.value.trim()
    });
  }
  hadleModalClose() {
    this.setState({isOpen: false, url: '', error: ''})
  }

  render(){
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal
        isOpen={this.state.isOpen}
        contentLabel="Add link"
        onAfterOpen={() => this.refs.url.focus()}
        onRequestClose={this.hadleModalClose.bind(this)}
        className="boxed-view__box"
        overlayClassName="boxed-view boxed-view--modal">
          <h1>add link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
            type="text"
            placeholder="URL"
            ref="url"
            value={this.state.url}
            onChange={this.onChange.bind(this)}/>
            <button className="button">add link</button>
            <button  type="button" className="button button--secondary" onClick={this.hadleModalClose.bind(this)}>Cancel</button>
          </form>

        </Modal>
      </div>
    );
  }
}
        // <Modal isOpen={true} contentLabel="Add link">
        //         </Modal>

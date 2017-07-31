// @flow
import React, { Component } from 'react';
import JSONPretty from 'react-json-pretty';

import Header from '../client/head';
import parseChat from '../client/parseChat';
import { colors } from '../constants/styles';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      chat: '',
      parsedChat: { mentions: [], emoticons: [], links: [] },
    };
  }

  handleKeyPress(e) {
    if(e.which === 13) {
      this.handleSubmit(e);
    }
  }

  handleChange(e) {
    this.setState({ chat: e.target.value });
  }

  handleCopyClick(e) {
    var copyTextarea = document.querySelector('.hidden-json');
    copyTextarea.style.display = 'inline';
    copyTextarea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    } finally {
      copyTextarea.style.display = 'none';
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const parsedChat = await parseChat(this.state.chat);
    this.setState({ parsedChat, chat: '' });
  }

  render() {
    const parsedChatString = JSON.stringify(this.state.parsedChat);

    return (
      <div>
        <Header />
        <div className="page-container">
          <form className="chat-form" onSubmit={this.handleSubmit}>
            <textarea placeholder="Enter chat text here then press submit" className="chat-input" type="text" value={this.state.chat} onChange={this.handleChange} onKeyPress={(e) => this.handleKeyPress(e)} />
            <input className="chat-submit" type="submit" value="Submit" />
          </form>
          <div className="json-container">
            <div className="copy-button" onClick={this.handleCopyClick} onTouchEnd={this.handleCopyClick}>
              <i className="fa fa-clipboard fa-2x" aria-hidden="true"></i>
            </div>
            <JSONPretty
              id="json-pretty"
              json={parsedChatString}
            />
          </div>
        </div>
        <textarea readOnly className="hidden-json" type="text" value={parsedChatString} />
        <style global jsx>{`
          .json-pretty {
            color: ${colors.contrast};
          }
          .json-key {
            color: ${colors.secondary};
          }
          .json-string {
            color: ${colors.tertiary};
          }
        `}</style>
        <style jsx>{`
          .json-container {
            position: relative;
            flex-grow: 1;
            overflow-y: auto;
            background: ${colors.primary};
            padding: 5px;
          }
          .copy-button {
            position: absolute;
            top: 10px;
            right: 10px;
            color: ${colors.secondary};
          }
          .copy-button:hover {
            color: ${colors.tertiary};
            cursor: pointer;
          }
          .hidden-json {
            display: none;
          }
          .page-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            position: fixed;
          }
          .chat-form {
            flex-shrink: 0;
            display: flex;
            background: ${colors.primaryDark};
            padding: 5px;
          }
          .chat-input {
            flex-grow: 1;
            border: 1px solid ${colors.primary};
          }
          .chat-submit {
            color: white;
            background: orange;
            border: 1px solid ${colors.primary};
          }
        `}</style>
      </div>
    );
  }
}

export default Chat;

// @flow
import React, { Component } from 'react';
import JSONPretty from 'react-json-pretty';

import Header from '../client/head';
import parseChat from '../client/parseChat';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      chat: '',
      parsedChat: { mentions: [], emoticons: [], links: [] },
    };
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
            <label>
              Chat:
              <input className="js-copytextarea" type="text" value={this.state.chat} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
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
            color: white;
          }
          .json-key {
            color: orange;
          }
          .json-string {
            color: pink;
          }
        `}</style>
        <style jsx>{`
          .json-container {
            position: relative;
            flex-grow: 1;
            overflow-y: auto;
            background: #272822;
          }
          .copy-button {
            position: absolute;
            top: 10px;
            right: 10px;
            color: orange;
          }
          .copy-button:hover {
            color: pink;
            cursor: pointer;
          }
          .hidden-json {
            display: none;
          }
          .page-container {
            display: flex;
            flex-direction: column;
            background: yellow;
            height: 100%;
            width: 100%;
            position: fixed;
          }
          .chat-form {
            flex-shrink: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default Chat;

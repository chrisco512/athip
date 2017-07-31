// @flow
import React, { Component } from 'react';
import JSONPretty from 'react-json-pretty';
//import 'react-json-pretty/JSONPretty.monikai.styl';

import parseChat from '../common/parseChat';

let chat = 'what if @john @chris (megusta)and @joe bought some (taco) (tacosaladreallylongstring) from www.tacobell.com?';
//let Test = ({name} : { name: string }) => (<div>Hello {name}!</div>);

class Chat extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      chat: '',
      parsedChat: { mentions: [], emoticons: [], links: [] },
    };
  }

  handleChange(e) {
    this.setState({ chat: e.target.value });
  }

  async handleClick(e) {
    e.preventDefault();
    const parsedChat = await parseChat(this.state.chat);
    this.setState({ parsedChat });
  }

  render() {
    console.log('rendering now');
    return (
      <div>
        <form onSubmit={this.handleClick}>
          <label>
            Chat:
            <input type="text" value={this.state.chat} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <JSONPretty id="json-pretty" json={this.state.parsedChat} />
      </div>
    );
  }
}

export default Chat;

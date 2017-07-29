// @flow
import React, { Component } from 'react';
import parseChat from '../common/parseChat';

let chat = 'what if @chris bought some (taco)?';
let Test = ({name} : { name: string }) => (<div>Hello {name}!</div>);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { chat: 'hello world' };
  }

  async handleClick() {
    const parsedChat = await parseChat(chat);
    const chatString = JSON.stringify(parsedChat);
    this.setState({ chat : 'chatyoString' });
  }

  render() {
    return (
      <div>
        <Test name={this.state.chat} />
        <button onClick={() => this.handleClick()}>Click Me</button>
      </div>
    );
  }
}

export default Chat;

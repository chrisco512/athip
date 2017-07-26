// @flow
import React, { Component } from 'react';

let name = 'George';
let Test = ({name} : { name: string }) => (<div>Hello {name}!</div>);

export default () => (
  <Test name={name} />
);

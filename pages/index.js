// @flow
import React, { Component } from 'react';

let name = 'jklj';
let Test = ({name} : { name: string }) => (<div>Hello {name}!</div>);

export default () => (
  <Test name={name} />
);

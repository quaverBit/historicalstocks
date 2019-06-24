import React, { Component } from 'react';
import { connect } from 'react-redux';
import Terminal from 'terminal-in-react';

class Terminal extends Component {
  constructor(){
    super();
    this.commands = {
      ...authCommands,
      ...stockCommands,
    }
    this.commandDescriptions = {
      ...authDescriptions,
      ...stockDescriptions,
    }
  }

  render() {
    <Terminal commands={this.commands} descriptions={this.commandDescriptions}></Terminal> 
  }
}

export default Terminal;
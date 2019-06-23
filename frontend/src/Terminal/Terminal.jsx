import React, { Component } from 'react';
import { Container, TextField } from '@material-ui/core';
import './Terminal.css';

class Terminal extends Component {
  render() {
    return (
      <Container className="terminalRoot">
        <div>Lines display</div>
        <footer><TextField fullWidth></TextField></footer>
      </Container>
    )
  }
}

export default Terminal;
import React, { Component } from 'react';

class Usuario extends Component {
  render() {
    return (
      <li>
        {this.props.name} - {this.props.email} - {this.props.password}
      </li>
    );
  }
}

export default Usuario;
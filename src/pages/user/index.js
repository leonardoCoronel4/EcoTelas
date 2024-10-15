import React, { Component } from 'react';
import Usuario from './[id]/index'

class UsuarioLista extends Component {
  render() {
    return (
      <ul>
        {this.props.usuarios.map(u => {
          return (
            <Usuario
              key={u.id}
              name={u.nombre}
              email={u.email}
              password={u.password}
            />
          );
        })}
      </ul>
    );
  }
}
export default UsuarioLista;
import React, { Component } from 'react'

export default class UsuarioForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.agregarUsuario}>
                <input type="text" placeholder="Nombre" name="name" />
                <input type="email" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <input type="submit" value="Guardar" />
            </form>
        );
    }
}
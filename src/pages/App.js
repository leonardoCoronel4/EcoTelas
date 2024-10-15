import { Component } from 'react';
import '../assets/styles/App.css';
import UsuarioForm from '../components/users/Register';
import UsuarioLista from './user';

class App extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: [
        { id: 1, nombre: "luis", email: "luisito@gmail.com", password: "luisito@gmail.com" },
        { id: 2, nombre: "edi", email: "edi@gmail.com", password: "edi@gmail.com" }
      ]
    };
  }
  handleAgregarUsuario(event) {
    event.preventDefault();
    let user = {
      nombre: event.target.nombre.value,
      email: event.target.email.value,
      password: event.target.password.value
    };
    this.setState({
      usuarios: this.state.usuarios.concat([user])
    });
  };
  render() {
    return (
      <div className="App">
        <div>
        <UsuarioLista usuarios={this.state.usuarios} />
          <p><strong>Añade usuarios</strong></p>
          <UsuarioForm agregarUsuario={this.handleAgregarUsuario.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;

import { Component } from 'react';
import '../assets/styles/App.css';
import NewUser from '../pages/user/new';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
      <Router>
        <div className="App">
          <Routes> 
            <Route
              path="/users/new"
              element={<NewUser/>}
            />

            {/* Ruta principal o listado de usuarios */}
            <Route
              path="/"
              element={<UsuarioLista usuarios={this.state.usuarios} />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;

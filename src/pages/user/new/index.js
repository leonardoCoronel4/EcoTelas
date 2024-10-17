import React from 'react';
import UsuarioForm from '../../../components/users/UsuarioForm';

const NewUser = () => {
  const agregarUsuario = async (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const domain = 'http://localhost:3001';
    console.log(JSON.stringify(nuevoUsuario))
    try {
      const response = await fetch(`${domain}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });
      if (response.ok) {
        const data = await response.json(); 
        e.target.reset();
        console.log(data)
      } else {
        console.error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Hubo un error:', error);
    }
    e.target.reset();
  };
  return (
    <div>
      <UsuarioForm agregarUsuario={agregarUsuario} />
    </div>
  );
};

export default NewUser;
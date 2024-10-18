import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/styles/navbar.css';

const NavBar = () => {
    return (
        <nav>
            <div className='logo-container'>
                <NavLink to="/"><img src={logo} alt="Logo Revistete" /></NavLink>
            </div>
            <ul>
                <li><NavLink to='/'>Inicio</NavLink></li>
                <li><NavLink to='/e'>Sobre Nosotros</NavLink></li>
                <li><NavLink to='/a'>Puntos de Reciclaje</NavLink></li>
                <li><NavLink to='/b'>Eventos</NavLink></li>
                <li><NavLink to='/c'>Empresas</NavLink></li>
                <li><NavLink to='/d'>Contacto</NavLink></li>
            </ul>
            <NavLink to="/" id='login'>Iniciar Sesion</NavLink>
        </nav>
    );
};

export default NavBar;
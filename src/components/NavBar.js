import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/styles/navbar.css';

const NavBar = () => {
    const location = useLocation();
    return (
        <nav>
            <div className='logo-container'>
                <NavLink to="/"><img src={logo} alt="Logo Revistete" /></NavLink>
            </div>
            {location.pathname == '/' && (
                <ul style={{ margin: 0 }}>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><a href='#seccionAbout'>Sobre Nosotros</a></li>
                    <li><a href='#seccionPoints'>Puntos de Reciclaje</a></li>
                    <li><a href='#seccionEvents'>Eventos</a></li>
                    <li><NavLink to='/c'>Empresas</NavLink></li>
                    <li><a href='#seccionAbout'>Contacto</a></li>
                </ul>
            )}
            {location.pathname != '/' && (
                <ul style={{ margin: 0 }}>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to='/'>Sobre Nosotros</NavLink></li>
                    <li><NavLink to='/'>Puntos de Reciclaje</NavLink></li>
                    <li><NavLink to='/'>Eventos</NavLink></li>
                    <li><NavLink to='/c'>Empresas</NavLink></li>
                    <li><NavLink to='/'>Contacto</NavLink></li>
                </ul>
            )}
            <NavLink to="/" id='login'>Iniciar Sesion</NavLink>
        </nav>
    );
};

export default NavBar;
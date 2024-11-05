import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import userLogo from "../assets/images/user.png";
import "../assets/styles/navbar.css";

const NavBar = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        name: "",
        role: "",
    });
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setRegisterData({
            email: "",
            password: "",
            name: "",
            role: "",
        });
        setErrorMessage("");
    };


    const getUserInfo = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch("http://localhost:3001/api/users/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        } catch (error) {
            setErrorMessage("Error en la solicitud.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                if (data.auth) {
                    localStorage.setItem("token", data.token);
                    setShowLoginModal(false);
                    window.location.href = "/";
                }
            } else {
                setErrorMessage(data.error || "Usuario o contraseña incorrectos");
            }
        } catch (error) {
            setErrorMessage("Error en la solicitud.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });

            const data = await response.json();
            if (response.ok) {
                const loginResponse = await fetch("http://localhost:3001/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: registerData.email,
                        password: registerData.password,
                    }),
                });

                const loginData = await loginResponse.json();
                if (loginResponse.ok) {
                    if (loginData.auth) {
                        localStorage.setItem("token", loginData.token);
                        setShowRegisterModal(false);
                        setShowLoginModal(false);
                        window.location.href = "/";
                    }
                } else {
                    setErrorMessage(loginData.error || "Error al iniciar sesión después del registro");
                }
            } else {
                setErrorMessage(data.error || "Error en el registro");
            }
        } catch (error) {
            setErrorMessage("Error en la solicitud de registro.");
        }
    };

    const Logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    useEffect(() => {
        getUserInfo();
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("modal")) {
            resetForm();
            setShowLoginModal(false);
            setShowRegisterModal(false);
        }
    };

    const handleLoginModalToggle = () => {
        resetForm();
        setShowLoginModal(!showLoginModal);
        setShowRegisterModal(false);
    };

    const handleRegisterModalToggle = () => {
        resetForm();
        setShowRegisterModal(!showRegisterModal);
        setShowLoginModal(false);
    };

    return (
        <>
            <nav>
                <div className="logo-container">
                    <NavLink to="/">
                        <img src={logo} alt="Logo Revistete" />
                    </NavLink>
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
                <div id="user-section">
                    {user ? (
                        <div className="dropdown navName profile-logo" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className={dropdownOpen ? "user-button-clicked user-button" : "user-button"}
                            >
                                <div className="logo-container">
                                    <img src={userLogo} alt="Logo Revistete" />
                                </div>
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <h5 className="text-center profile-name">{user.name}</h5>
                                    <NavLink
                                        to="/profile"
                                        className="dropdown-item"
                                    >
                                        Perfil
                                    </NavLink>
                                    <button
                                        onClick={Logout}
                                        className="dropdown-item"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowLoginModal(true)}
                            id="login"
                            className="login-button"
                        >
                            Iniciar Sesión
                        </button>
                    )}
                </div>
            </nav>

            {/* Modal Login */}
            {showLoginModal && (
                <div
                    className="modal show"
                    onClick={handleOutsideClick}
                    id="loginModal"
                    style={{ display: "block" }}
                    tabIndex="-1"
                    role="dialog"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="d-flex justify-content-center">
                                <img
                                    className="d-flex justify-content-center"
                                    src={userLogo}
                                ></img>
                            </div>
                            <h1 className="text-white">Inicio de sesión</h1>
                            <div className="loginInput userInput w-100 pb-3">
                                <input
                                    type="text"
                                    className="w-90"
                                    placeholder="Usuario"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="loginInput passInput w-100">
                                <input
                                    className="w-90"
                                    type="password"
                                    placeholder="Contraseña"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <span className="py-4">
                                ¿Aún no tienes una cuenta?
                                <a
                                    onClick={() => {
                                        setShowLoginModal(false);
                                        setShowRegisterModal(true);
                                    }}
                                    className="registerLink"
                                >
                                    Registrarse
                                </a>
                            </span>

                            <div className="loginButtonDiv">
                                <button
                                    id="loginButton"
                                    className="modal-button mb-4"
                                    onClick={handleLogin}
                                >
                                    Iniciar sesión
                                </button>
                            </div>
                            {errorMessage && <span className="error-message">{errorMessage}</span>}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Register */}
            {showRegisterModal && (
                <div
                    className="modal show"
                    onClick={handleOutsideClick}
                    id="registerModal"
                    style={{ display: "block" }}
                    tabIndex="-1"
                    role="dialog"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="d-flex justify-content-center">
                                <img
                                    className="d-flex justify-content-center"
                                    src={userLogo}
                                ></img>
                            </div>
                            <h1 className="text-white">Registro</h1>
                            <div className="loginInput nameInput w-100 pb-3">
                                <input
                                    type="text"
                                    className="w-90"
                                    placeholder="Nombre"
                                    id="registerName"
                                    name="Name"
                                    value={registerData.name}
                                    onChange={(e) =>
                                        setRegisterData({
                                            ...registerData,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="loginInput userInput w-100 pb-3">
                                <input
                                    type="email"
                                    className="w-90"
                                    placeholder="E-mail"
                                    id="registerEmail"
                                    name="email"
                                    value={registerData.email}
                                    onChange={(e) =>
                                        setRegisterData({
                                            ...registerData,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="loginInput passInput w-100 pb-3">
                                <input
                                    type="password"
                                    className="w-90"
                                    placeholder="Contraseña"
                                    id="registerPassword"
                                    name="password"
                                    value={registerData.password}
                                    onChange={(e) =>
                                        setRegisterData({
                                            ...registerData,
                                            password: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="loginInput roleInput d-flex ms-4">
                                <span>
                                    ¿Registrarte como empresa?{" "}
                                    <input
                                        type="checkbox"
                                        placeholder="Rol"
                                        id="registerRole"
                                        name="Role"
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                role: e.target.checked
                                                    ? "admin"
                                                    : "user",
                                            })
                                        }
                                    />
                                </span>
                            </div>

                            <a
                                className="registerLink"
                                onClick={() => {
                                    setShowRegisterModal(false);
                                    setShowLoginModal(true);
                                }}
                            >
                                Ya tengo cuenta
                            </a>

                            <div className="loginButtonDiv">
                                <button
                                    id="registerButton"
                                    className="modal-button mb-4 my-2"
                                    onClick={handleRegister}
                                >
                                    Registrarse
                                </button>
                            </div>
                            {errorMessage && <span className="error-message">{errorMessage}</span>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;

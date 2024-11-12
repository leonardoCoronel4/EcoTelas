import React, { useEffect, useState } from "react";
import user from "../../assets/images/user.png";
import "../../assets/styles/profile.css";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    const handleCreateCompany = () => {
        navigate('/companies/new');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    "http://localhost:3001/api/users/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const contentType = response.headers.get("content-type");
                console.log("Tipo de contenido:", contentType);

                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    const text = await response.text();
                    console.error("Respuesta no JSON:", text);
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) return null;

    return (
        <>
            <div className="profile-container">
                <div className="picture-container me-5">
                    <div className="profile-picture-container mb-2">
                        <img
                            src={user}
                            className="img-profile"
                            alt="Logo Revistete"
                        />
                    </div>
                    <div className="user-points d-flex flex-column">
                        <p>Puntos</p>
                        <span className="d-flex align-items-center justify-content-center">
                            {userData.points} Puntos
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="20"
                                fill="orange"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div className="user-data">
                    <div className="top-section">
                        <h1>Información de usuario</h1>
                        <button>Editar</button>
                    </div>
                    <div className="bottom-section">
                        <h5>Email</h5>
                        <p>{userData.email}</p>
                        <h5>Nombre</h5>
                        <p>{userData.name}</p>
                        <h5>Apellido</h5>
                        <p>{userData.surname}</p>
                        <h5>Celular</h5>
                        <p>{userData.phone}</p>
                        <h5>Dirección</h5>
                        <p>{userData.address}</p>
                    </div>
                </div>
                {userData.role === 'company' &&
                    (<div className="createCompany">
                        <button className='rounded-5 me-5 mt-2 fw-bold px-4 py-1' style={{ border: 'none', backgroundColor: '#c3d4db', color: '#1c4175' }}>Ver Mis Empresas</button>
                        <button className='rounded-5 me-5 mt-2 fw-bold px-4 py-1' style={{ border: 'none', backgroundColor: '#c3d4db', color: '#1c4175' }} onClick={handleCreateCompany}>Crear Empresa</button>
                    </div>)
                }
            </div>
        </>
    );
};

export default Profile;

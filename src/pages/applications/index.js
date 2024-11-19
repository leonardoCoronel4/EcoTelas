import React, { useCallback, useEffect, useState } from 'react';
import '../../assets/styles/events.css';
import '../../assets/styles/applications.css';
import 'leaflet/dist/leaflet.css';
import accept from "../../assets/images/tick.png";
import decline from "../../assets/images/cruz.png";

const Applications = () => {
    const [companies, setCompanies] = useState([]);
    const [applicactions, setApplicactions] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const fetchApplications = useCallback(async () => {
        try {
            const allApplications = await Promise.all(
                companies.map(async (company) => {
                    const response = await fetch(`http://localhost:3001/api/recolection/company/${company._id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        return await response.json();
                    } else {
                        const errorData = await response.json();
                        console.error("No se pudo traer las recolecciones: ", errorData.message);
                        return [];
                    }
                })
            );

            setApplicactions(allApplications.flat());
        } catch (error) {
            console.error("No se pudo traer las recolecciones: ", error);
        }
    }, [companies]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const userResponse = await fetch("http://localhost:3001/api/users/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (userResponse.ok) {
                    const user = await userResponse.json();
                    const response = await fetch('http://localhost:3001/api/company', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ owner: user._id }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setCompanies(Array.isArray(data) ? data : []);
                    } else {
                        console.error(`Error: ${response.status} - ${response.statusText}`);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (companies.length > 0) {
            fetchApplications();
        }
    }, [companies]);

    const handleViewApplication = (application) => {
        setSelectedApplication(application);
    };

    const handleAccept = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/recolection/${id}/accept`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "accepted": true })
            })
            if (response.ok) {
                alert("Recolección aceptada");
                fetchApplications();
                handleViewApplication(null)
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'No se pudo aceptar la recoleccion'}`);
            }
        } catch (error) {
            console.error("Error al aceptar la  Recolección: ", error);
            alert("Hubo un error al aceptar la Recolección");
        }
    };

    const handleDecline = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/recolection/${id}/accept`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "accepted": true })
            })
            if (response.ok) {
                alert("Recolección rechazada");
                fetchApplications();
                handleViewApplication(null)
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'No se pudo aceptar la recoleccion'}`);
            }
        } catch (error) {
            console.error("Error al aceptar la  Recolección: ", error);
            alert("Hubo un error al aceptar la Recolección");
        }
    };

    return (
        <div className='d-flex p-3 justify-content-center applicaciones-body'>
            <div className="w-75">
                <div>
                    <h1 className='fs-1 mb-3'>Mis Solicitudes</h1>
                    {applicactions.length === 0 && (
                        <p className='fs-5'>No tienes solicitudes</p>
                    )}
                </div>
                {applicactions.length !== 0 && (<div className='d-flex applicaciones justify-content-evenly'>
                    <div className='rounded-4 applicaciones-left px-5'>
                        {applicactions.length > 0 && (
                            applicactions.filter((a) => (a.accepted == null)).map(
                                (a) => (
                                    <div className='application-button rounded-5 p-2 m-4' key={a._id} onClick={() => handleViewApplication(a)}>
                                        {a.owner.name}
                                    </div>
                                )
                            )
                        )}
                    </div>
                    <div className='d-flex rounded-4 applicaciones-right p-4 justify-content-center'>
                        {selectedApplication ? (
                            <div className='w-100'>
                                <div className="application-details text-start p-5 rounded-4 mt-4">
                                    <h3>Detalles de la Solicitud</h3>
                                    <p><strong>Dirección:</strong> {selectedApplication.address}</p>
                                    <p><strong>Descripción:</strong> {selectedApplication.description}</p>
                                    <p><strong>Horario:</strong> {selectedApplication.schedule}</p>
                                    <p><strong>Fecha:</strong> {selectedApplication.date}</p>
                                    <p><strong>Propietario:</strong> {selectedApplication.owner.name}</p>
                                    <p><strong>Tipos de textiles:</strong> {selectedApplication.textileTypes.map((t) => t.name + ' ')}</p>
                                </div>
                                <div className='d-flex aplicaction-buttons m-5 justify-content-between'>
                                    <div className='d-flex flex-column align-items-center'>
                                        <img className='aplication-img' src={decline} alt="Rechazar" />
                                        <button className='aplication-button-decline p-3 m-3 rounded-5 px-5' onClick={() => handleDecline(selectedApplication._id)}>Rechazar</button>
                                    </div>
                                    <div className='d-flex flex-column align-items-center'>
                                        <img className='aplication-img' src={accept} alt="Acceptar" />
                                        <button className='aplication-button-acept p-3 m-3 rounded-5 px-5' onClick={() => handleAccept(selectedApplication._id)}>Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Selecciona una solicitud para ver los detalles</p>
                        )}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default Applications;

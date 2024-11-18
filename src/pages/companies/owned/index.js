import React, { useEffect, useState } from 'react';
import '../../../assets/styles/events.css';
import Modal from 'react-bootstrap/Modal';
import Carousel from '../../../components/Carousel';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import CloseButton from 'react-bootstrap/CloseButton';

const markerIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
});

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleClose = () => setShow(false);

    const handleOpenModal = (event) => {
        setSelectedCompany(event);
        setShow(true);
    };

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

    const items = companies.map((c) => ({
        title: c.name,
        location: c.location,
        services: c.recolectionService,
        servicesSchedule: c.recolectionSchedule,
        companySchedule: c.companySchedule,
        lat: c.lat,
        lng: c.lng,
    }));

    return (
        <>
            <div className='d-flex p-5 justify-content-center'>
                <div className="w-75">
                    <div>
                        <h1 className='fs-1'>Mis empresas</h1>
                        {companies.length === 0 && (
                            <p className='fs-5'>No tienes empresas</p>
                        )}
                    </div>
                    <Carousel items={items} slidesToShow={3} centerMode={true} handleEvent={handleOpenModal} viewMaerker={false} />
                </div>
            </div>
            <Modal show={show} size="lg" onHide={handleClose} centered>
                <div className='event-modal'>
                    <div className='text-left'>
                        <h1>Información de Empresa</h1>
                    </div>
                    <CloseButton className='closeButton' onClick={handleClose} />
                    {selectedCompany ? (
                        <div className='row'>
                            <div className='col-md-5'>
                                <p>Nombre<br /> <strong>{selectedCompany.title}</strong></p>
                                <p>Ubicación<br /> <strong>{selectedCompany.location}</strong></p>
                                <p>Servicio de Recolección<br /> 
                                    <strong className='px-3 py-1 rounded-5' 
                                            style={{ backgroundColor: selectedCompany.services ? 'green' : 'red', color: 'white' }}>
                                        {selectedCompany.services ? "SI" : "NO"}
                                    </strong>
                                </p>
                                {selectedCompany.services && (
                                    <p>Horarios de Recolección<br /> <strong>{selectedCompany.servicesSchedule}</strong></p>
                                )}
                                <p>Horarios del Local<br /> <strong>{selectedCompany.companySchedule}</strong></p>
                            </div>
                            <div className='col-md-6 rounded-4 py-4 px-3' style={{ backgroundColor: '#a8b4b9' }}>
                                <MapContainer
                                    className='rounded-4'
                                    center={[selectedCompany.lat, selectedCompany.lng]}
                                    zoom={15}
                                    style={{ height: '300px', width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; OpenStreetMap contributors'
                                    />
                                    <Marker position={[selectedCompany.lat, selectedCompany.lng]} icon={markerIcon}>
                                        <Popup>
                                            Ubicación actual: <br /> Lat: {selectedCompany.lat}, Lng: {selectedCompany.lng}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button className='rounded-5 me-5 mt-2 fw-bold px-4 py-1' style={{ border: 'none', backgroundColor: '#e9e3d0', color: '#1c4175' }}>
                                    Hacer Solicitud
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default Companies;

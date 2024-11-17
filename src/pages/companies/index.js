import React, { useEffect, useRef, useState } from 'react';
import '../../assets/styles/events.css';
import Modal from 'react-bootstrap/Modal';
import Carousel from '../../components/Carousel';
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

    const handleClose = () => setShow(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleOpenModal = (event) => {
        setSelectedCompany(event);
        setShow(true);
    };

    useEffect(() => {
        fetch('http://localhost:3001/api/company')
            .then((response) => response.json())
            .then(data => {
                setCompanies(data);
            });

    }, []);

    const items = [];

    companies.map((c) => (
        items.push({
            title: c.name,
            location: c.location,
            services: c.recolectionService,
            servicesSchedule: c.recolectionSchedule,
            companySchedule: c.companySchedule,
            lat: c.lat,
            lng: c.lng
        })
    ))

    return (
        <>
            <div className='d-flex p-5 justify-content-center'>
                <div className="w-75">
                    <div className=''>
                        <h1 className='fs-1'>
                            Seleccione una empresa
                        </h1>
                        <p className='fs-5 text-center'>
                            <span className='fs-5 fw-bold'>Seleccione</span> una empresa para ver su información y verificar si tiene o no
                            disponible el servicio de recolección. Luego, <span className='fs-5 fw-bold'>elija</span> si desea <span className='fs-5 fw-bold'>llevar la ropa
                                personalmente</span> o si la <span className='fs-5 fw-bold'>empresa pasará a recogerla</span>. Posteriormente, deberá <span className='fs-5 fw-bold'>seleccionar el horario</span> que mejor se ajuste a sus <span className='fs-5 fw-bold'>necesidades</span>.
                        </p>
                    </div>
                    <Carousel items={items} slidesToShow={3} centerMode={false} handleEvent={handleOpenModal} viewMaerker={false}/>
                </div>
            </div>
            <Modal
                show={show}
                size="lg"
                onHide={handleClose}
                centered

            >
                <div className='event-modal' >
                    <div className='text-left' closeButton>
                        <h1>Información de Empresa</h1>
                    </div>
                    <CloseButton className='closeButton' onClick={handleClose} />
                    {selectedCompany ? (
                        <div className='row'>
                            <div className='col-md-5'>
                                <p>Nombre<br /> <strong>{selectedCompany.title}</strong></p>
                                <p>Ubicación<br /> <strong>{selectedCompany.location}</strong></p>
                                <p>Servicio de Recolección<br /> <strong className='px-3 py-1 rounded-5' style={{ backgroundColor: selectedCompany.services ? 'green' : 'red', color: 'white' }}>{selectedCompany.services ? "SI" : "NO"}</strong></p>
                                {selectedCompany.services && (
                                    <p>Horarios de Recolección<br /> <strong>{selectedCompany.servicesSchedule}</strong></p>
                                )}
                                <p>Horarios del Local<br /> <strong>{selectedCompany.companySchedule}</strong></p>
                            </div>
                            <div className='col-md-6 rounded-4  py-4 px-3' style={{ backgroundColor: '#a8b4b9' }}>
                                <MapContainer
                                    className='rounded-4'
                                    center={[selectedCompany.lat, selectedCompany.lng]}
                                    zoom={15}
                                    style={{ height: '300px', width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[selectedCompany.lat, selectedCompany.lng]} icon={markerIcon}>
                                        <Popup>
                                            Ubicación actual: <br /> Lat: {selectedCompany.lat}, Lng: {selectedCompany.lng}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <div className='d-flex justify-content-end'>

                                <button className='rounded-5 me-5 mt-2 fw-bold px-4 py-1' style={{border:'none', backgroundColor:'#e9e3d0', color:'#1c4175'}}>
                                    Hacer Solicitud
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>
            </Modal >
        </>
    );
}
export default Companies;
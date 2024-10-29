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

const PointsMaps = () => {
    const [events, setEvents] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleOpenModal = (event) => { 
        setSelectedEvent(event);
        setShow(true);
    };

    useEffect(() => {
        fetch('http://localhost:3001/api/events')
            .then((response) => response.json())
            .then(data => {
                setEvents(data);
            });

    }, []);

    const items = [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-Es', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }) + ' ' + date.toLocaleTimeString('es-Es', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    events.map((event) => (
        items.push({
            title: event.name,
            content: formatDate(event.date),
            date: new Date(event.date),
            description: event.description,
            long: event.long,
            lat: event.lat
        })
    ))

    return (
        <>
            <div className='d-flex p-5 justify-content-center'>
                <div className="w-75">
                    <div className=''>
                        <h1 className='fs-1'>
                            Eventos
                        </h1>
                        <p className='fs-5 text-center'>
                            Aquí encontrarás todas las actividades relacionadas con el reciclaje de moda sostenible. Participa
                            en nuestros talleres, charlas y jornadas de recolección de prendas, donde podrás aprender más
                            sobre la importancia del reciclaje y cómo puedes contribuir a cuidar el planeta.
                            <br />
                            <span className='fs-5 fw-bold'>
                                ¡Mantente atento a las fechas y únete a la comunidad del cambio!
                            </span>
                        </p>
                    </div>
                    <Carousel items={items} slidesToShow={3} centerMode={false} handleEvent={handleOpenModal} />
                </div>
            </div>
            <Modal
                show={show}
                size="lg"
                onHide={handleClose}
                centered
                 
            > 
                <div className='event-modal' >
                    <div className='text-center' closeButton>
                        <h1>{selectedEvent ? selectedEvent.title : ''}</h1>
                    </div>
                    <CloseButton className='closeButton' onClick={handleClose} />
                    {selectedEvent ? (
                        <div className='row'>
                            <div className='col-md-6'>
                                <p><strong>Fecha:</strong> {selectedEvent.date.toLocaleDateString()}</p>
                                <p><strong>Hora:</strong> {selectedEvent.date.toLocaleTimeString()}</p>
                                <p><strong>Descripción:</strong> {selectedEvent.description}</p>
                            </div>
                            <div className='col-md-6 rounded-4'>
                                <MapContainer
                                    className='rounded-4'
                                    center={[selectedEvent.lat, selectedEvent.long]}
                                    zoom={15}
                                    style={{ height: '300px', width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[selectedEvent.lat, selectedEvent.long]} icon={markerIcon}>
                                        <Popup>
                                            Ubicación actual: <br /> Lat: {selectedEvent.lat}, Lon: {selectedEvent.long}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>
            </Modal>
        </>
    );
}
export default PointsMaps;
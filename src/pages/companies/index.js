import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, InputDate, MultipleSelect } from '../../components/FormComponents.ts';

const markerIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
});

function openModal() {
    const modal = document.getElementById("custom-modal");
    modal.classList.remove("hidden");
    modal.classList.add("visible");
}

function closeModal() {
    const modal = document.getElementById("custom-modal");
    modal.classList.remove("visible");
    modal.classList.add("hidden");
}

export const applicationSchema = z.object({
    textileTypes: z.array(z.string()).min(1, 'Debes seleccionar al menos un tipo de textil'),
    company: z.string().min(1, ''),
    owner: z.string().min(1, ''),
    address: z.string().min(5, "La dirección es necesaria"),
    description: z.string().optional(),
    schedule: z.string().min(1, "El Horario es obligatorio"),
    date: z.string().min(1, "La Fecha es obligatoria")
});

const Companies = () => {
    const formMethods = useForm({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            textileTypes: [],
        },
    });

    const { register, handleSubmit, formState: { errors } } = formMethods;
    const [textileTypes, setTextileTypes] = useState([]);
    const [companies, setCompanies] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        formMethods.reset();
        setShow(false);
    };

    const handleOpen = () => setShow(true);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleOpenModal = (event) => {
        setSelectedCompany(event);
        formMethods.reset();
        formMethods.setValue('company', event.id)
        openModal();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch('http://localhost:3001/api/users/me', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al obtener datos');
                    }
                    return response.json();
                })
                .then((data) => {
                    formMethods.setValue('owner', data._id);
                })
                .catch((error) => {
                    console.error('Error en la solicitud:', error);
                });
        } else {
            console.log('Token no encontrado');
        }
        fetch('http://localhost:3001/api/company')
            .then((response) => response.json())
            .then(data => {
                setCompanies(data);
            });

    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetch('http://localhost:3001/api/textiles')
                        .then((response) => response.json())
                        .then(data => {
                            setTextileTypes(data);
                        }),

                ]);
            } catch (error) {
                console.error("Error al obtener datos: ", error);
            }
        };
        fetchData();
    }, [formMethods]);
    const items = [];

    companies.map((c) => (
        items.push({
            id: c._id,
            title: c.name,
            location: c.location,
            services: c.recolectionService,
            servicesSchedule: c.recolectionSchedule,
            companySchedule: c.companySchedule,
            lat: c.lat,
            lng: c.lng
        })
    ))
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3001/api/recolection/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                alert("Recolección programada");
                closeModal();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'No se pudo crear la Recolección'}`);
            }
        } catch (error) {
            console.error("Error al crear Recolección: ", error);
            alert("Hubo un error al crear la Recolección");
        }
    };
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
                    <Carousel items={items} slidesToShow={3} centerMode={false} handleEvent={handleOpenModal} viewMaerker={false} />
                </div>
            </div>
            <div id="custom-modal" className="custom-modal hidden">
                <div className="custom-modal-overlay" onClick={closeModal}></div>
                <div className="custom-modal-content" >
                    <div className="custom-modal-overlay2" onClick={closeModal}></div>
                    <div className="d-flex flex-row justify-content-evenly align-items-center text-start" >
                        <div className='modalCompanie me-2'>
                            <div className='text-left'  >
                                <h1>Información de Empresa</h1>
                            </div>
                            <button type="button" className="closeButtonModal" onClick={closeModal}>x</button>
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
                                    <div className='col-md-6 rounded-4 py-4 px-3' style={{ backgroundColor: '#a8b4b9' }}>
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
                                        <button className='rounded-5 me-5 mt-2 fw-bold px-4 py-1' style={{ border: 'none', backgroundColor: '#e9e3d0', color: '#1c4175' }} onClick={show ? handleClose : handleOpen}>
                                            Hacer Solicitud
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p>Cargando...</p>
                            )}
                        </div>
                        {show && (
                            <div className='modalApplication'>
                                <div className='text-left'>
                                    <h3>Agendar Entrega</h3>
                                </div>
                                <button type="button" className="closeButtonModal" onClick={handleClose}>x</button>
                                {selectedCompany ? (
                                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                                        <MultipleSelect
                                            name="textileTypes"
                                            options={textileTypes.map((type) => { return { value: type._id, label: type.name } })}
                                            onChange={(selected) => formMethods.setValue('textileTypes', selected)}
                                            error={errors.textileTypes?.message}
                                            value={formMethods.watch('textileTypes') || []}
                                            className='mt-3'
                                        />
                                        <Input
                                            type="type"
                                            name="address"
                                            placeholder="Dirección"
                                            className="ml-3 mt-4"
                                            error={errors.address?.message}
                                            register={register}
                                        />
                                        <Input
                                            type="text"
                                            name="description"
                                            placeholder="Descripción:"
                                            className="ml-3 mt-4"
                                            error={errors.description?.message}
                                            register={register}
                                        />
                                        <InputDate
                                            type="time"
                                            name="schedule"
                                            placeholder="Fecha:"
                                            className="ml-3 mt-4"
                                            error={errors.schedule?.message}
                                            register={register}
                                        />
                                        <InputDate
                                            type="date"
                                            name="date"
                                            placeholder="Fecha:"
                                            className="ml-3 mt-4"
                                            error={errors.owner?.message}
                                            register={register}
                                        />
                                        <div className='mt-4 d-flex justify-content-between'>
                                            <Button type="button" className="btn btn-secundary cancel-company fw-bold px-4 py-2 " onClick={handleClose}>Cancelar</Button>
                                            <Button type="submit" className="btn btn-primary create-company fw-bold px-4 py-2 ">Enviar</Button>
                                        </div>
                                    </form>
                                ) : (
                                    <p>Cargando...</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Companies;
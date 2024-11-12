import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import "../../../assets/styles/companies.css";
import { Checkbox, Input } from '../../../components/FormComponents.ts';

export const createReportSchema = z.object({
    name: z.string().min(3, "Nombre debe tener al menos 3 caracteres").max(20, "Nombre debe tener máximo 20 caracteres"),
    location: z.string().min(3, "Ubicación debe tener al menos 3 caracteres").max(80, "Ubicación debe tener máximo 80 caracteres"),
    recolectionService: z.boolean().optional(),
    recolectionSchedule: z.string().optional(),
    companySchedule: z.string().min(1, "Horario de la compañía es obligatorio"),
    lat: z.number().min(-90, "Latitud debe estar entre -90 y 90").max(90, "Latitud debe estar entre -90 y 90"),
    lng: z.number().min(-180, "Longitud debe estar entre -180 y 180").max(180, "Longitud debe estar entre -180 y 180"),
    textileTypeIds: z.array(z.string()).min(1, 'Debes seleccionar al menos un tipo de textil'),
    ownerIds: z.array(z.string()),
});

const CreateCompany = () => {
    const formMethods = useForm({
        resolver: zodResolver(createReportSchema),
        defaultValues: {
            recolectionService: false,
            textileTypeIds: [],
            ownerIds: []
        },
    });

    const { register, handleSubmit, formState: { errors } } = formMethods;
    const [textileTypes, setTextileTypes] = useState([]);
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetch('http://localhost:3001/api/textiles')
                        .then((response) => response.json())
                        .then(data => {
                            setTextileTypes(data);
                        }),
                    fetch('http://localhost:3001/api/users')
                        .then((response) => response.json())
                        .then(data => {
                            setOwners(data);
                        })
                ]);
            } catch (error) {
                console.error("Error al obtener datos: ", error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        try {
            await fetch('http://localhost:3001/api/companies/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            alert("Compañía creada exitosamente");
            navigate('/companies');
        } catch (error) {
            console.error("Error al crear compañía: ", error);
            alert("Hubo un error al crear la compañía");
        }
    };


    return (
        <div className="container">
            <h2>Crear Nueva Compañía</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Nombre de la compañía"
                    className="m-3"
                    error={errors.name?.message}
                    register={register}
                />
                <Input
                    type="text"
                    name="location"
                    placeholder="Ubicación de la compañía"
                    className="m-3"
                    error={errors.location?.message}
                    register={register}
                />
                <div className="form-group">
                    <label>Servicio de Recolección:</label>
                    <input type="checkbox" {...register("recolectionService")} />
                </div>
                {register("recolectionService") &&
                    <Input
                        type="text"
                        name="recolectionSchedule"
                        placeholder="Horario de Recolección:"
                        className="m-3"
                        error={null}
                        register={register}
                    />
                }
                <Input
                    type="text"
                    name="companySchedule"
                    placeholder="Horario de la Compañía:"
                    className="m-3"
                    error={errors.companySchedule?.message}
                    register={register}
                />
                <Input
                    type="number"
                    step="0.0001"
                    name="lat"
                    placeholder="Latitud:"
                    className="m-3"
                    error={errors.lat?.message}
                    register={register}
                />
                <Input
                    type="number"
                    step="0.0001"
                    name="lng"
                    placeholder="Longitud:"
                    className="m-3"
                    error={errors.lng?.message}
                    register={register}
                />

                <div className="form-group">
                    <label>Tipos de Textiles:</label>
                    <select multiple className="form-control" {...register("textileTypeIds")}>
                        {textileTypes.map((textile) => (
                            <option key={textile._id} value={textile._id}>{textile.name}</option>
                        ))}
                    </select>
                    {errors.textileTypeIds && <span className='error'>{errors.textileTypeIds.message}</span>}
                </div>

                <div className="form-group">
                    <label>Dueños:</label>
                    <select multiple className="form-control" {...register("ownerIds")}>
                        {owners.map((owner) => (
                            <option key={owner._id} value={owner._id}>{owner.name}</option>
                        ))}
                    </select>
                    {errors.ownerIds && <span className='error'>{errors.ownerIds.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary">Crear Compañía</button>
            </form >
        </div >
    );
};

export default CreateCompany;
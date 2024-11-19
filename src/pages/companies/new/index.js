import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import "../../../assets/styles/companies.css";
import { Checkbox, Input, MultipleSelect } from '../../../components/FormComponents.ts';

export const createReportSchema = z.object({
    name: z.string().min(3, "Nombre debe tener al menos 3 caracteres").max(20, "Nombre debe tener máximo 20 caracteres"),
    location: z.string().min(3, "Ubicación debe tener al menos 3 caracteres").max(80, "Ubicación debe tener máximo 80 caracteres"),
    recolectionService: z.boolean().optional(),
    recolectionSchedule: z.string().min(1, "Horario de la recolección es obligatorio"),
    companySchedule: z.string().min(1, "Horario de la compañía es obligatorio"),
    lat: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val >= -90 && val <= 90, {
        message: "La Latitud debe estar entre -90 y 90",
    }),
    lng: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val >= -180 && val <= 180, {
        message: "La Longitud debe estar entre -180 y 180",
    }),
    textileTypeIds: z.array(z.string()).min(1, 'Debes seleccionar al menos un tipo de textil'),
    ownerIds: z.array(z.string()),
});

const CreateCompany = () => {
    const formMethods = useForm({
        resolver: zodResolver(createReportSchema),
        defaultValues: {
            recolectionService: false,
            recolectionSchedule: '09:00 - 18:00',
            textileTypeIds: [],
            ownerIds: []
        },
    });

    const { register, handleSubmit, watch, formState: { errors } } = formMethods;
    const [textileTypes, setTextileTypes] = useState([]);
    const navigate = useNavigate();

    const isRecolectionServiceEnabled = watch("recolectionService");
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
                    formMethods.setValue('ownerIds', [data._id]);
                })
                .catch((error) => {
                    console.error('Error en la solicitud:', error);
                });
        } else {
            console.log('Token no encontrado');
        }
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

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3001/api/company/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                alert("Compañía creada exitosamente");
                navigate('/companies');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'No se pudo crear la compañía'}`);
            }
        } catch (error) {
            console.error("Error al crear compañía: ", error);
            alert("Hubo un error al crear la compañía");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 ">
            <div className="mx-auto bg-white shadow-lg rounded-5 w-50  mt-5 p-5">
                <h2>Crea una nueva compañía</h2>
                <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nombre de la compañía"
                        className="ml-3 mt-4"
                        error={errors.name?.message}
                        register={register}
                    />
                    <Input
                        type="text"
                        name="location"
                        placeholder="Ubicación de la compañía"
                        className="ml-3 mt-4"
                        error={errors.location?.message}
                        register={register}
                    />
                    <div className='  justify-content-between mt-4'>
                        <Checkbox
                            label='Servicio de Recolección:'
                            name='recolectionService'
                            className='ms-2 mt-1'
                            register={register}
                        />
                        {isRecolectionServiceEnabled &&
                            <Input
                                type="text"
                                name="recolectionSchedule"
                                placeholder="Horario de Recolección:"
                                className=" "
                                error={errors.recolectionSchedule?.message}
                                register={register}
                            />
                        }
                    </div>
                    <Input
                        type="text"
                        name="companySchedule"
                        placeholder="Horario de la Compañía:"
                        className="ml-3 mt-4"
                        error={errors.companySchedule?.message}
                        register={register}
                    />
                    <Input
                        type="number"
                        step="0.000001"
                        name="lat"
                        placeholder="Latitud:"
                        className="ml-3 mt-4"
                        error={errors.lat?.message}
                        register={register}
                    />
                    <Input
                        type="number"
                        step="0.000001"
                        name="lng"
                        placeholder="Longitud:"
                        className="ml-3 mt-4"
                        error={errors.lng?.message}
                        register={register}
                    />

                    <MultipleSelect
                        name="textileTypeIds"
                        options={textileTypes.map((type) => { return { value: type._id, label: type.name } })}
                        register={register("textileTypeIds")}
                        onChange={(selected) => formMethods.setValue('textileTypeIds', selected)}
                        error={errors.textileTypeIds?.message}
                        className='mt-3'
                    />

                    <button type="submit" className="btn btn-primary create-company fw-bold px-4 py-2 ">Crear Compañía</button>
                </form >
            </div >
        </div >
    );
};

export default CreateCompany;
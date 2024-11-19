import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../../assets/styles/ownedCompanies.css";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "react-bootstrap/Modal";
import { createReportSchema } from "../../../schemas/companySchema.js";
import {
    Checkbox,
    Input,
    MultipleSelect,
} from "../../../components/FormComponents.ts";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [textileTypes, setTextileTypes] = useState([]);
    const formMethods = useForm({
        resolver: zodResolver(createReportSchema),
        defaultValues: {
            recolectionService: false,
            recolectionSchedule: "09:00 - 18:00",
            textileTypeIds: [],
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = formMethods;

    useEffect(() => {
        const fetchUserCompanies = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const userResponse = await fetch(
                    "http://localhost:3001/api/users/me",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (userResponse.ok) {
                    const user = await userResponse.json();

                    const response = await fetch(
                        "http://localhost:3001/api/company",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ owner: user._id }),
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        setCompanies(Array.isArray(data) ? data : []);
                    } else {
                        console.error(
                            `Error: ${response.status} - ${response.statusText}`
                        );
                    }
                }
            } catch (error) {
                console.error("Error fetching user companies:", error);
            }
        };

        const fetchTextileTypes = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/textiles"
                );
                if (response.ok) {
                    const data = await response.json();
                    setTextileTypes(data);
                }
            } catch (error) {
                console.error("Error fetching textile types:", error);
            }
        };

        fetchUserCompanies();
        fetchTextileTypes();
    }, []);

    const handleEdit = (company) => {
        setSelectedCompany(company);
        const textileIds = company.textileTypes || [];
        reset(company);
        formMethods.setValue("textileTypeIds", textileIds);
        formMethods.setValue("lat", company.lat.toString());
        formMethods.setValue("lng", company.lng.toString());
        setShowEditModal(true);
    };

    const handleUpdate = async (data) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                `http://localhost:3001/api/company/update/${selectedCompany._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                alert("Compañía actualizada exitosamente");
                setCompanies((prev) =>
                    prev.map((comp) =>
                        comp._id === selectedCompany._id
                            ? { ...comp, ...data }
                            : comp
                    )
                );
                setShowEditModal(false);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error updating company:", error);
            alert("No se pudo actualizar la compañía");
        }
    };

    const isRecolectionServiceEnabled = watch("recolectionService");

    return (
        <>
            <h1 className="title">Mis empresas</h1>
            <div className="d-flex flex-wrap ownedCompanies gap-4 p-5">
                {companies.map((company) => (
                    <div
                        key={company._id}
                        className="card p-3 companyCard shadow-sm"
                        style={{ width: "18rem" }}
                    >
                        <div>
                            <h5 className="card-title">{company.name}</h5>
                            <p className="card-text">
                                Ubicación: {company.location}
                            </p>
                            <p className="card-text">
                                Servicio de Recolección:{" "}
                                {company.recolectionService ? "Sí" : "No"}
                            </p>
                            <p className="card-text">
                                Horario de la empresa:{" "}
                                {company.companySchedule || "No especificado"}
                            </p>
                            {company.recolectionService && (
                                <p className="card-text">
                                    Horario de Recolección:{" "}
                                    {company.recolectionSchedule ||
                                        "No especificado"}
                                </p>
                            )}
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleEdit(company)}
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal de edición */}
            {selectedCompany && (
                <Modal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Compañía</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(handleUpdate)}
                        >
                            <label htmlFor="name">Nombre de la compañía</label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Nombre de la compañía"
                                error={errors.name?.message}
                                register={register}
                            />
                            <label htmlFor="location">
                                Ubicación de la compañía
                            </label>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                placeholder="Ubicación de la compañía"
                                error={errors.location?.message}
                                register={register}
                            />
                            <div className="mt-3">
                                <Checkbox
                                    label="Servicio de Recolección"
                                    name="recolectionService"
                                    register={register}
                                />
                                {isRecolectionServiceEnabled && (
                                    <>
                                        <label htmlFor="recolectionSchedule">
                                            Horario de Recolección
                                        </label>
                                        <Input
                                            id="recolectionSchedule"
                                            type="text"
                                            name="recolectionSchedule"
                                            placeholder="Horario de Recolección"
                                            error={
                                                errors.recolectionSchedule
                                                    ?.message
                                            }
                                            register={register}
                                        />
                                    </>
                                )}
                            </div>
                            <label htmlFor="companySchedule">
                                Horario de la compañía
                            </label>
                            <Input
                                id="companySchedule"
                                type="text"
                                name="companySchedule"
                                placeholder="Horario de la compañía"
                                error={errors.companySchedule?.message}
                                register={register}
                            />
                            <label htmlFor="lat">Latitud</label>
                            <Input
                                id="lat"
                                type="number"
                                step="0.000001"
                                name="lat"
                                placeholder="Latitud"
                                error={errors.lat?.message}
                                register={register}
                            />
                            <label htmlFor="lng">Longitud</label>
                            <Input
                                id="lng"
                                type="number"
                                step="0.000001"
                                name="lng"
                                placeholder="Longitud"
                                error={errors.lng?.message}
                                register={register}
                            />
                            <label htmlFor="textileTypeIds">
                                Tipos de Textiles
                            </label>
                            <MultipleSelect
                                name="textileTypeIds"
                                options={textileTypes
                                    .map((type) => ({
                                        value: type._id,
                                        label: type.name,
                                    }))}
                                register={register("textileTypeIds")}
                                onChange={(selected) =>
                                    formMethods.setValue(
                                        "textileTypeIds",
                                        selected
                                    )
                                }
                                value={textileTypes
                                    .filter((type) =>
                                        formMethods.getValues(
                                            "textileTypeIds"
                                        ).includes(type._id)
                                    )
                                    .map((type) => ({
                                        value: type._id,
                                        label: type.name,
                                    }))}
                                error={errors.textileTypeIds?.message}
                                className="mt-3"
                            />
                            <button
                                type="submit"
                                className="btn btn-success mt-3"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default Companies;

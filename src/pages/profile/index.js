import React, { useEffect, useState } from "react";
import user from "../../assets/images/user.png";
import "../../assets/styles/profile.css";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        surname: "",
        phone: "",
        address: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState({});

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

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setFormValues({
                        name: data.name,
                        surname: data.surname,
                        phone: data.phone || "",
                        address: data.address || "",
                        email: data.email
                    });
                } else {
                    console.error("Error al obtener los datos del usuario");
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, []);

    const validateForm = () => {
        const errors = {};
        
        if (!formValues.name || formValues.name.length < 3 || formValues.name.length > 20) {
            errors.name = "El nombre debe tener entre 3 y 20 caracteres.";
        }
        if (!formValues.surname || formValues.surname.length < 3 || formValues.surname.length > 20) {
            errors.surname = "El apellido debe tener entre 3 y 20 caracteres.";
        }
        if (formValues.phone && (!/^\d{9}$/.test(formValues.phone))) {
            errors.phone = "El celular debe contener exactamente 9 dígitos.";
        }
        if (formValues.address && (formValues.address.length < 3 || formValues.address.length > 20)) {
            errors.address = "La dirección debe tener entre 3 y 20 caracteres.";
        }
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(formValues.email)) {
            errors.email = "El correo electrónico no tiene un formato válido.";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3001/api/users/update", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUserData(updatedUser);
                setEditMode(false);
            } else {
                console.error("Error al actualizar los datos del usuario.");
            }
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
        }
    };

    if (!userData) return null;

    return (
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
                    {!editMode ? (
                        <button onClick={handleEdit}>Editar</button>
                    ) : (
                        <button onClick={handleSave}>Guardar</button>
                    )}
                </div>
                <div className="bottom-section">
                <div className="field">
                        <h5>Email</h5>
                        <p>{userData.email}</p>
                    </div>

                    <div className="field">
                        <h5>Nombre</h5>
                        {editMode ? (
                            <input
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{userData.name}</p>
                        )}
                        {formErrors.name && <p className="error">{formErrors.name}</p>}
                    </div>

                    <div className="field">
                        <h5>Apellido</h5>
                        {editMode ? (
                            <input
                                type="text"
                                name="surname"
                                value={formValues.surname}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{userData.surname}</p>
                        )}
                        {formErrors.surname && <p className="error">{formErrors.surname}</p>}
                    </div>

                    <div className="field">
                        <h5>Celular</h5>
                        {editMode ? (
                            <input
                                type="text"
                                name="phone"
                                value={formValues.phone}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{userData.phone}</p>
                        )}
                        {formErrors.phone && <p className="error">{formErrors.phone}</p>}
                    </div>

                    <div className="field">
                        <h5>Dirección</h5>
                        {editMode ? (
                            <input
                                type="text"
                                name="address"
                                value={formValues.address}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{userData.address}</p>
                        )}
                        {formErrors.address && <p className="error">{formErrors.address}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

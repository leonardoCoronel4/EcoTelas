import React, { Component } from "react";
import user from "../../assets/images/user.png";
import "../../assets/styles/contact.css";

class Profile extends Component {
    render() {
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
                                90 Puntos
                                <svg
                                    className=""
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="20"
                                    fill="orange"
                                    class="bi bi-star-fill"
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
                            <h5>Nombre</h5>
                            <p>Adriano</p>
                            <h5>Email</h5>
                            <p>adriano@example.com</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Profile;

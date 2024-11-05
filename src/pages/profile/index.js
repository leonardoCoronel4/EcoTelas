import React, { Component } from "react";
import user from "../../assets/images/user.png";
import "../../assets/styles/profile.css";

class Profile extends Component {
    render() {
        return (
            <>
                <div className="profile-container">
                    <div className="picture-container me-5">
                        <div className="profile-picture-container mb-2">
                                <img src={user} alt="Logo Revistete" />
                        </div>
                        <div className="user-points">
                            <p>Puntos</p>
                            <span>90 Puntos *estrella*</span>
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


import React, { useState } from 'react';
import '../../assets/styles/contact.css';

const Contact = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();

    const sendMail = async () => {
        const response = await fetch("http://localhost:3001/api/sendEmail",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    subject,
                    message,
                }),
            }
        );

        if (response.ok) {
            setEmail('')
            setSubject("")
            setMessage('')
            setName('')
            window.location.reload();
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    };
    return (
        <div className="contact-form mt-5 pt-5">
            <div className="form-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                </svg>
                <h2 className='ms-4'>Información de Contacto</h2>
            </div>
            <hr className="header-line" />

            <div className="row">
                <div className='col-md-4'>
                    <div className="form-group">
                        <input type="text" className='w-100' required placeholder='Nombre Completo*'
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="email" className='w-100' required placeholder='E-mail*'
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="text" className='w-100' required placeholder='Asunto*'
                            onChange={(e) => setSubject(e.target.value)} />
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className="form-group">
                        <textarea type="text" className='w-100' required placeholder='Descripción*' rows={5}
                            onChange={(e) => setMessage(e.target.value)} />
                    </div>
                </div>
                <button onClick={sendMail} className="submit-button">Enviar</button>
            </div>
        </div>
    );
}
export default Contact;
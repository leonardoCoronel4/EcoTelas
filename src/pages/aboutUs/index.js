import React from 'react';
import '../../assets/styles/aboutUs.css';
import Accordion from 'react-bootstrap/Accordion';

const AboutUs = () => {

    return (
        <div className='d-flex p-5 justify-content-center'>
            <div className="row"> 
                <div className='col-md-12 about-us-text rounded-4 pt-4'>
                    <h1 className='text-start fs-3'>
                        Qué es Re-Vístete
                    </h1>
                    <p className='fs-5'>Nuestra aplicación de reciclaje y reutilización de ropa permite a los usuarios
                        donar o intercambiar prendas en buen estado, promoviendo una moda
                        sostenible y evitando desperdicios. También conecta con talleres locales para
                        reciclar textiles y fomentar la economía circular.
                    </p>
                    <p className='fs-5'>
                        Con una interfaz sencilla, los usuarios pueden gestionar donaciones y buscar
                        ropa reutilizable desde casa, contribuyendo al medio ambiente y reduciendo el
                        impacto de la industria textil. Así, ayudamos a crear una comunidad más
                        consciente y comprometida con un estilo de vida sostenible.
                    </p>
                </div>
                <div className='col-md-2'></div>
                <div className='col-md-8 about-us-text rounded-4 mt-4 py-3'>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Preguntas frecuentes</Accordion.Header>
                            <Accordion.Body>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Pregrunta #1</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Pregrunta #2</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
export default AboutUs;
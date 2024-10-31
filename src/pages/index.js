import React, { useEffect, useState } from 'react';
import logo from '../assets/images/re-vistete.png';
import footer from '../assets/images/footer.jpg';
import '../assets/styles/index.css';
import AboutUs from './aboutUs';
import Contact from './contact';
import RecyclingPoints from '../pages/recyclingPoints';
import Events from '../pages/events';

const AppMain = () => {
    const [showButton, setShowButton] = useState(false);
 
    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
 
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className='container'>
            <section id='seccionIndex'>
                <div className="content">
                    <img src={logo} alt="Logo Revistete" />
                </div>
                <div className='clothing-footer'>
                    <img src={footer} alt="Logo Revistete" />
                </div>
            </section>
            <section id='seccionAbout'>
                <AboutUs />
                <Contact />
            </section>
            <section id='seccionPoints'>
                <RecyclingPoints />
            </section>
            <section id='seccionEvents'>
                <Events />
            </section>{showButton && (
                <button onClick={scrollToTop} className="back-to-top">
                    ↑
                </button>
            )}
        </div>
    );
}
export default AppMain;
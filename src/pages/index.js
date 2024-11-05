import React, { useEffect, useState } from "react";
import logo from "../assets/images/re-vistete.png";
import footer from "../assets/images/footer.jpg";
import "../assets/styles/index.css";
import AboutUs from "./aboutUs";
import Contact from "./contact";
import RecyclingPoints from "../pages/recyclingPoints";
import Events from "../pages/events";

const AppMain = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="d-flex flex-column align-items-center">
            <section id="seccionIndex">
                <div className="content">
                    <img src={logo} alt="Logo Revistete" />
                </div>
                <div className="clothing-footer position-relative">
                    <div class="shape-divider-top">
                        <svg
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                                class="shape-fill"
                            ></path>
                        </svg>
                    </div>
                    <img src={footer} alt="Logo Revistete" />
                </div>
            </section>
            <section id="seccionAbout" className="w-75">
                <AboutUs />
                <Contact />
            </section>
            <section id="seccionPoints" className="w-75">
                <RecyclingPoints />
            </section>
            <section id="seccionEvents" className="w-75">
                <Events />
            </section>
            {showButton && (
                <button onClick={scrollToTop} className="back-to-top">
                    ↑
                </button>
            )}
        </div>
    );
};
export default AppMain;

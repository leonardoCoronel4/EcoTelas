import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const Carousel = ({ items, slidesToShow = 3, centerMode = true, centerPadding = '0', handleEvent }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        centerMode,
        centerPadding,
    };

    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        key={index}
                    >
                        <div className="row justify-content-center m-2" >
                            <div className="col-md-10 m-3 p-5 carta text-end" key={index} onClick={() => handleEvent(item)}>
                                <div className='text-center'>
                                    <div className="fw-bold">{item.title}</div>
                                    <div className="fw-bold">{item.content}</div>
                                </div>
                                <img className='ubicacion-carta' src={markerIconPng} alt="Ubicacion" />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider >
        </div>
    );
};

export default Carousel;

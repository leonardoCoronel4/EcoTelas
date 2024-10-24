
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const PointsMaps = () => {
    const [points, setPoints] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const mapRef = useRef(null);
    const markersGroupRef = useRef(null);
    const myIcon = L.icon({
        iconUrl: markerIconPng,
    });

    useEffect(() => {
        fetch('http://localhost:3001/api/recycling-points')
            .then((response) => response.json())
            .then(data => {
                setPoints(data);
            });
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error al obtener la ubicación del usuario:", error);
                }
            );
        } else {
            console.error("La geolocalización no es compatible con este navegador.");
        }
    }, []);
    console.log(userLocation)
    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([userLocation?.lat || 0, userLocation?.lng || 0], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapRef.current);

            markersGroupRef.current = L.featureGroup().addTo(mapRef.current);
        }

        if (markersGroupRef.current && userLocation) {
            markersGroupRef.current.clearLayers();

            const nearbyPoints = points.filter(point => {
                const distance = L.latLng(userLocation.lat, userLocation.lng).distanceTo([point.lat, point.lng]);
                return distance <= 10000;
            });

            if (nearbyPoints.length === 0) {
                const nearbyPoints2 = points.filter(point => {
                    const distance = L.latLng(userLocation.lat, userLocation.lng).distanceTo([point.lat, point.lng]);
                    return distance <= 1000000;
                });
                nearbyPoints2.forEach(point => {
                    const marker = L.marker([point.lat, point.lng], { icon: myIcon })
                        .bindPopup(`<b>${point.name}</b>`);
                    markersGroupRef.current.addLayer(marker);
                });
                if (nearbyPoints2.length > 0) {
                    const bounds = markersGroupRef.current.getBounds();
                    mapRef.current.fitBounds(bounds, { padding: [50, 50] });
                }
            }

            nearbyPoints.forEach(point => {
                const marker = L.marker([point.lat, point.lng], { icon: myIcon })
                    .bindPopup(`<b>${point.name}</b>`);
                markersGroupRef.current.addLayer(marker);
            });


            if (nearbyPoints.length > 0) {
                const bounds = markersGroupRef.current.getBounds();
                mapRef.current.fitBounds(bounds, { padding: [50, 50] });
            }
        }
        points.forEach(point => {
            const marker = L.marker([point.lat, point.lng], { icon: myIcon })
                .bindPopup(`<b>${point.name}</b>`);
            markersGroupRef.current.addLayer(marker);
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [points]);

    return (
        <>
            <div className='d-flex p-5 justify-content-center'>
                <div className="w-50">
                    <div className=''>
                        <h1 className='fs-1'>¿Dónde dejar la ropa?</h1>
                        <p className='text-start'>
                            ¿Dónde dejar la ropa ?

                            Ayúdanos a darle una segunda vida a tus prendas.En
                            nuestro mapa interactivo, puedes ubicar los puntos
                            de reciclaje disponibles en tu ciudad.Deja tus
                            prendas usadas y contribuye a un mundo más
                            sostenible.
                            <br />
                            <span className='fw-bold'>¡Cada acción cuenta!</span>
                        </p>
                    </div>
                    <div id="map" className='rounded-4' style={{ height: '500px', width: '100%' }}></div>
                </div>
            </div>
        </>
    );
}
export default PointsMaps;
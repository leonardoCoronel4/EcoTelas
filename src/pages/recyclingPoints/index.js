
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const PointsMaps = () => {
    const [points, setPoints] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const mapRef = useRef(null);
    const markersGroupRef = useRef(null);
    const [pass, setPass] = useState(null);

    const myIcon = L.icon({
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });

    useEffect(() => {
        fetch('http://localhost:3001/api/recycling-points')
            .then((response) => response.json())
            .then(data => {
                setPoints(data);
            });
    }, []);

    useEffect(() => {
        const storedLocation = localStorage.getItem("coordenadas");

        if (storedLocation) {
            const parsedLocation = JSON.parse(storedLocation);
            if (parsedLocation && parsedLocation.lat && parsedLocation.lng) {
                setUserLocation(parsedLocation);
            }
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = { lat: latitude, lng: longitude };

                    setUserLocation(location);
                    localStorage.setItem("coordenadas", JSON.stringify(location));
                },
                (error) => {
                    console.error("Error al obtener la ubicación del usuario:", error);
                }
            );
        } else {
            console.error("La geolocalización no es compatible con este navegador.");
        }
    }, []);

    setTimeout(() => {
        setPass(true);
    }, 300);

    useEffect(() => {
        if (userLocation && userLocation.lat !== undefined && userLocation.lng !== undefined) {
            mapRef.current = L.map('map').setView([userLocation.lat, userLocation.lng], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapRef.current);

            markersGroupRef.current = L.featureGroup().addTo(mapRef.current);
        }

        if (mapRef.current && markersGroupRef.current && userLocation) {
            markersGroupRef.current.clearLayers();

            const nearbyPoints = points.filter(point => {
                const distance = L.latLng(userLocation.lat, userLocation.lng).distanceTo([point.lat, point.lng]);
                return distance <= 10000;
            });

            const pointsToShow = nearbyPoints.length > 0 ? nearbyPoints : points;

            pointsToShow.forEach(point => {
                const marker = L.marker([point.lat, point.lng], { icon: myIcon })
                    .bindPopup(`<b>${point.name}</b>`);
                markersGroupRef.current.addLayer(marker);
            });

            if (markersGroupRef.current.getLayers().length > 0) {
                const bounds = markersGroupRef.current.getBounds();
                mapRef.current.fitBounds(bounds, { padding: [50, 50] });
            } else {
                mapRef.current.setView([userLocation.lat, userLocation.lng], 12);
            }
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.off();
                mapRef.current.remove();
                mapRef.current = null;
            }
            if (markersGroupRef.current) {
                markersGroupRef.current.clearLayers();
            }
        };
    }, [userLocation, pass]);

    return (
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
    );
}
export default PointsMaps;
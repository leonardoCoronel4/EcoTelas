import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ element: Component, requiredRole }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsAuthorized(false);
                    return;
                }

                const response = await fetch('http://localhost:3001/api/users/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    if (requiredRole && userData.role !== requiredRole) {
                        setIsAuthorized(false);
                    } else {
                        setIsAuthorized(true);
                    }
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error('Error al verificar el usuario:', error);
                setIsAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, [requiredRole]);

    if (loading) {
        return <div>Cargando...</div>;
    }
    return isAuthorized ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;

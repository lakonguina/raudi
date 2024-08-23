import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cars = () => {
    const [message, setMessage] = useState('Loading...');
	const [cars, setcars] = useState([]);

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                const response = await axios.get('http://localhost:3000/cars', {
                    headers: {
                        Authorization: `${token}` // Include the token in the Authorization header
                    }
                });
				setcars(response.data.car);
				console.log(response.data);
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    setMessage('Forbidden: You do not have access to this resource.');
                } else {
                    setMessage('An error occurred: ' + error.message);
                }
            }
        };
        fetchProtectedData();
    }, []);

    return (
        <div>
            <h2>Liste des voitures</h2>
            {cars?.length > 0 && (
                <ul>
                    {cars.map((car) => (
                        <li key={car.id}>
                            {car.name} - ${car.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cars;


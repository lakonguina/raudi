import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                const response = await axios.get('http://localhost:3000/cars', {
                    headers: {
                        Authorization: `${token}` // Include the token in the Authorization header
                    }
                });
                setCars(response.data.car);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCars();
    }, []);

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    {cars?.length > 0 && (
                        cars.map((car) => (
                            <div className="col-md-4 mb-4" key={car.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{car.name}</h5>
                                        <p className="card-text">
                                            Prix: ${car.price.toFixed(2)}<br />
                                            Carburant: {car.gas}<br />
                                            Portes: {car.doors}<br />
                                            Places: {car.places}<br />
                                            Hauteur: {car.height}m<br />
                                            Longueur: {car.length}m
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cars;


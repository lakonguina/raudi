import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Cars from './Cars';

function App() {
    const [role, setRole] = useState();

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:3000/info', {
                        headers: {
                            Authorization: `${token}`, // Inclure le token dans l'en-tête Authorization
                        },
                    });
                    setRole(response?.data?.user?.role)
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <BrowserRouter>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container">
                    <a class="navbar-brand" href="/">Raudi</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ms-auto" id="navbarNavAltMarkup">
                        {localStorage.getItem('token') ? (
                            <div className="navbar-nav">
                                {
                                    role == "admin" ? 
                                    <a className="nav-link" href="/admin">Admin</a>
                                    : <div></div>
                                }
                                <a className="nav-link" href="/admin">Voir le panier</a>
                                <button className="btn btn-primary btn-sm" onClick={logout}>Se déconnecter</button>
                            </div>
                        ) : (
                            <div className="navbar-nav">
                                <a className="nav-link" href="/login">Connexion</a>
                                <a className="nav-link" href="/register">S'enregistrer</a>
                            </div>
                        )}
                    </div>

                </div>
            </nav>
            <div class="container">
                <Routes>
                    {/* Render the component by passing it as a JSX element */}
                    <Route index element={<Cars />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

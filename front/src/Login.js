import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Raudi</h2>
            <form onSubmit={handleLogin} className="w-50 mx-auto bg-light p-4">
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4 w-100">Connexion</button>
                <div>Pas de compte? <a href="/register">Enregistrez-vous</a></div>
            </form>
            {message && <p className="text-danger text-center mt-3">{message}</p>}
        </div>

    );
};

export default Login;

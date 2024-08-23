import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/register', {
                username,
                email,
                password
            });
            setMessage('Vous vous êtes enregistré.');
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Raudi</h2>
            <form onSubmit={handleRegister} className="w-50 mx-auto bg-light p-4">
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
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit" className="btn btn-primary mt-4 w-100">S'enregistrer</button>

                {message &&
                    <div class="alert alert-success mt-2" role="alert">
                        {message}
                    </div>}
                {errorMessage && 
                    <div class="alert alert-danger mt-2" role="alert">
                        {errorMessage}
                    </div>}
            </form>
        </div>

    );
};

export default Register;

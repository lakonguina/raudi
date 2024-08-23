import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Cars from './Cars';

function App() {
    return (
        <BrowserRouter>
            <h1>Authentication Example</h1>
            <a href="/">Cars</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            <Routes>
              {/* Render the component by passing it as a JSX element */}
              <Route index element={<Cars/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

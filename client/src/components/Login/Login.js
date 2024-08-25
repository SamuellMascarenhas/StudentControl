// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // autenticação
        if (username === 'admin' && password === '1234') {
            navigate('/formulario'); // redireciona para a página do formulário
        } else {
            setError('Usuário ou senha incorretos.');
        }
    };

    return (

        <div className="login-container">
            <header className="header-login">
                <div className="logo">
                    <span>Student Control</span>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>

                    </ul>
                </nav>
            </header>



            <section class="main-login">
                <div class="card-login">
                    <div class="title">
                        <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/c5ffbc/enter-2.png" alt="enter-2" />

                        <p>Faça seu Login utilizando seu usuário e senha!</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="input-group">

                            <input
                                placeholder='Usuário'
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">

                            <input
                                placeholder='Senha'
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button className='btn_login_entrar' type="submit">Entrar</button>
                    </form>
                </div>
            </section>

            <footer className="login-footer">
                <p>&copy; 2024 Sistema de Controle de Alunos</p>
            </footer>
        </div>
    );
}

export default Login;

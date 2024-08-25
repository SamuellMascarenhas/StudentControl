import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

    return (
        <div className="home-container">
            <header className="home-header">
                <div className='logo'>
                    <span>Student Control</span>
                </div>
             
            </header>
            <main className="home-main">
                <section className='conteudo'>
                    <div className='intro'>
                        <span>Student Control</span>
                        <p>Seu Sistema de Controle de Alunos.</p>
                    </div>
                    <div className='btn-entrar'>
                        <Link className="button" to="/login">
                            Entrar
                            <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                                <path
                                    clipRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </section>
            </main>
            <footer className="home-footer">
                <p>&copy; 2024 Sistema de Controle de Alunos</p>
            </footer>
        </div>
    );
}

export default Home;

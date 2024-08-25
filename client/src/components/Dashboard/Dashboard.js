import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [mediaNotas, setMediaNotas] = useState([]);
  const [mediaFrequencia, setMediaFrequencia] = useState(0);
  const [alunosAcimaMedia, setAlunosAcimaMedia] = useState([]);
  const [alunosBaixaFrequencia, setAlunosBaixaFrequencia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // função para buscar os dados do servidor
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const mediaNotasRes = await axios.get('http://localhost:5000/api/media-notas');
      setMediaNotas(mediaNotasRes.data);

      const mediaFrequenciaRes = await axios.get('http://localhost:5000/api/media-frequencia');
      setMediaFrequencia(mediaFrequenciaRes.data);

      const alunosAcimaMediaRes = await axios.get('http://localhost:5000/api/alunos-acima-media');
      setAlunosAcimaMedia(alunosAcimaMediaRes.data);

      const alunosBaixaFrequenciaRes = await axios.get('http://localhost:5000/api/alunos-baixa-frequencia');
      setAlunosBaixaFrequencia(alunosBaixaFrequenciaRes.data);
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
      setError('Erro ao buscar dados do servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="logo">
          <span>Student Control</span>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Formulario">Formulário</Link></li>


          </ul>
        </nav>
      </header>

      <div className='title-dashboard'>
        <img width="48" height="48" src="https://img.icons8.com/color/48/dashboard-layout.png" alt="dashboard-layout" />
        <h1>Dashboard</h1>
      </div>


      {loading ? (
        <p>Carregando dados...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div class="box-cards">
            <section className="card resumo-geral">

              <div class="sub-titulo">
                <h2>Resumo Geral</h2>
              </div>
              <div class="container_box_media">

                <div className='box_media'>
                  <h3>Média Geral das Notas por Disciplina</h3>
                  <ul>
                    {mediaNotas.map((media, index) => (
                      <li key={`media-${index}`}>Disciplina {index + 1}: {media.toFixed(2)}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </section>

            <section className="card alunos">
              <div class="sub-titulo">
                <h2>Alunos</h2>
              </div>

              <div class="container_box_media">
                <div className='box-media'>
                  <h3>Alunos com Média Acima da Média da Turma</h3>
                  <ul>
                    {alunosAcimaMedia.map(aluno => (
                      <li key={`aluno-acima-media-${aluno.id}`}>{aluno.nome}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='container_box_media'>
                <h3>Alunos com Frequência Abaixo de 75%</h3>
                <ul>
                  {alunosBaixaFrequencia.map(aluno => (
                    <li key={`aluno-baixa-frequencia-${aluno.id}`}>{aluno.nome}</li>
                  ))}
                </ul>
              </div>

              <div class="container_box_media">
                <div className='box-frequencia'>
                  <h3>Frequência Média da Turma</h3>
                  <p>{mediaFrequencia.toFixed(2)}%</p>
                </div>
              </div>
            </section>
          </div>

        </>
      )}
      <footer className="dashboard-footer">
        <p>&copy; 2024 Sistema de Controle de Alunos</p>
      </footer>
    </div>
  );
}

export default Dashboard;

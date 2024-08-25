import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FormularioAluno.css';
import AlunoModal from '../JanelaModal/AlunoModal';

function FormularioAluno() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [disciplinas, setDisciplinas] = useState({
    disciplina1: '',
    disciplina2: '',
    disciplina3: '',
    disciplina4: '',
    disciplina5: '',
  });
  const [frequencia, setFrequencia] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // novo estado para a mensagem de sucesso

  const handleNotaChange = (e) => {
    const { name, value } = e.target;
    setDisciplinas((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const adicionarAluno = async (e) => {
    e.preventDefault();
    const novoAluno = {
      nome,
      notas: Object.values(disciplinas).map(Number),
      frequencia: parseFloat(frequencia),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/alunos', novoAluno);
      console.log('Resposta do servidor:', response.data); // debug
      setAlunos((prevAlunos) => [...prevAlunos, response.data]);
      setNome('');
      setDisciplinas({
        disciplina1: '',
        disciplina2: '',
        disciplina3: '',
        disciplina4: '',
        disciplina5: '',
      });
      setFrequencia('');
      setError(null);
      setSuccessMessage('Aluno adicionado com sucesso! Clique em "Ver Alunos" e Confira.'); // mensagem de sucesso
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
      setError('Erro ao adicionar aluno');
      setSuccessMessage(''); // reseta a mensagem de sucesso em caso de erro
    }
  };

  return (
    <div className="formulario-container">
      <header className="home-form">
        <div className="logo">
          <span>Student Control</span>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button className="btn_verAlunos" onClick={() => setModalIsOpen(true)}>Ver Alunos</button></li>
          </ul>
        </nav>
      </header>

      <section className="box-forms">
        <div className="main">
          <div className="box-1"></div>
          <form onSubmit={adicionarAluno}>
            <div className="intro-form">
              <span>Formulário Aluno</span>
            </div>
            <div className="inputs_labels">
              <div className="label_nome_aluno">
                <label htmlFor="nome">Aluno:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              {Object.keys(disciplinas).map((disciplina, index) => (
                <div className="inputs_notas" key={index}>
                  <label htmlFor={disciplina}>Nota - Disciplina {index + 1}:</label>
                  <input
                    type="number"
                    id={disciplina}
                    name={disciplina}
                    value={disciplinas[disciplina]}
                    onChange={handleNotaChange}
                    min="0"
                    max="10"
                    required
                  />
                </div>
              ))}
              <div className="inputs_notas">
                <label htmlFor="frequencia">Frequência (%):</label>
                <input
                  type="number"
                  id="frequencia"
                  name="frequencia"
                  value={frequencia}
                  onChange={(e) => setFrequencia(e.target.value)}
                  min="0"
                  max="100"
                  required
                />
              </div>
              <button className="btn_adicionar" type="submit">Adicionar Aluno</button>
            </div>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>} {/*mensagem de sucesso */}
          {error && <p className="error-message">{error}</p>}
        </div>
      </section>

      <footer className="form-footer">
        <p>&copy; 2024 Sistema de Controle de Alunos</p>
      </footer>

      {/* Modal para exibir a lista de alunos */}
      {modalIsOpen && (
        <AlunoModal
          onClose={() => setModalIsOpen(false)}
          alunos={alunos}
        />
      )}
    </div>
  );
}

export default FormularioAluno;

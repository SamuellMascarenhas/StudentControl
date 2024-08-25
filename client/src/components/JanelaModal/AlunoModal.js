import React from 'react';
import './AlunoModal.css';

function AlunoModal({ alunos, onClose }) {
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">

        <div className="header_modal">
          <button className="close-button" onClick={onClose}>
            X
          </button>

          <div class="sub-title-modal">
            <img width="30" height="30" src="https://img.icons8.com/sf-black/64/FFFFFF/list.png" alt="list" />
            <span>Lista de Alunos</span>
          </div>

        </div>
        <table className="aluno-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Disciplina 1</th>
              <th>Disciplina 2</th>
              <th>Disciplina 3</th>
              <th>Disciplina 4</th>
              <th>Disciplina 5</th>
              <th>Frequência (%)</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno, index) => (
              <tr key={index}>
                <td>{aluno.nome}</td>
                {/* acessar as notas pelo índice do array */}
                <td>{aluno.notas[0]}</td>
                <td>{aluno.notas[1]}</td>
                <td>{aluno.notas[2]}</td>
                <td>{aluno.notas[3]}</td>
                <td>{aluno.notas[4]}</td>
                <td>{aluno.frequencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AlunoModal;

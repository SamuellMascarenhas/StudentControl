const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao SQLite com sucesso');
  }
});

// Criação das tabelas, se não existirem
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    notas TEXT,
    frequencia REAL
  )`);
});

// Endpoint para adicionar um novo aluno
app.post('/api/alunos', (req, res) => {
  const { nome, notas, frequencia } = req.body;

  console.log('Dados recebidos para adicionar aluno:', req.body);

  db.run('INSERT INTO alunos (nome, notas, frequencia) VALUES (?, ?, ?)', [nome, JSON.stringify(notas), frequencia], function (err) {
    if (err) {
      console.error('Erro ao adicionar aluno:', err.message);
      res.status(500).json({ error: 'Erro ao adicionar aluno' });
    } else {
      console.log('Aluno adicionado com sucesso:', { id: this.lastID, nome, notas, frequencia });
      res.status(201).json({ id: this.lastID, nome, notas, frequencia });
    }
  });
});

// Endpoint para obter a média das notas por disciplina
app.get('/api/media-notas', (req, res) => {
  db.all('SELECT notas FROM alunos', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar dados de notas:', err.message);
      res.status(500).json({ error: 'Erro ao buscar dados' });
      return;
    }

    const notas = rows.map(row => JSON.parse(row.notas));
    if (notas.length === 0) {
      return res.json([]);
    }

    const numDisciplinas = notas[0].length;
    const medias = Array(numDisciplinas).fill(0);

    notas.forEach(notasAluno => {
      notasAluno.forEach((nota, index) => {
        medias[index] += nota;
      });
    });

    const mediaFinal = medias.map(media => media / notas.length);
    res.json(mediaFinal);
  });
});

// Endpoint para obter a média da frequência
app.get('/api/media-frequencia', (req, res) => {
  db.all('SELECT frequencia FROM alunos', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar dados de frequência:', err.message);
      res.status(500).json({ error: 'Erro ao buscar dados' });
      return;
    }

    const frequencias = rows.map(row => row.frequencia);
    if (frequencias.length === 0) {
      return res.json(0);
    }

    const mediaFrequencia = frequencias.reduce((acc, frequencia) => acc + frequencia, 0) / frequencias.length;
    res.json(mediaFrequencia);
  });
});

// Endpoint para obter a lista de alunos com média acima da média da turma
app.get('/api/alunos-acima-media', (req, res) => {
  db.all('SELECT id, nome, notas FROM alunos', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar dados de alunos:', err.message);
      res.status(500).json({ error: 'Erro ao buscar dados' });
      return;
    }

    const alunos = rows.map(row => ({
      id: row.id, // Incluindo o ID para chave única
      nome: row.nome,
      notas: JSON.parse(row.notas),
    }));

    db.all('SELECT notas FROM alunos', [], (err, rows) => {
      if (err) {
        console.error('Erro ao buscar dados para cálculo da média:', err.message);
        res.status(500).json({ error: 'Erro ao buscar dados' });
        return;
      }

      const notas = rows.map(row => JSON.parse(row.notas));
      if (notas.length === 0) {
        return res.json([]);
      }

      const numDisciplinas = notas[0].length;
      const medias = Array(numDisciplinas).fill(0);

      notas.forEach(notasAluno => {
        notasAluno.forEach((nota, index) => {
          medias[index] += nota;
        });
      });

      const mediaFinal = medias.map(media => media / notas.length);

      const alunosAcimaMedia = alunos.filter(aluno => {
        return aluno.notas.every((nota, index) => nota > mediaFinal[index]);
      });

      res.json(alunosAcimaMedia);
    });
  });
});

// Endpoint para obter a lista de alunos com frequência abaixo de 75%
app.get('/api/alunos-baixa-frequencia', (req, res) => {
  db.all('SELECT id, nome, frequencia FROM alunos', [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar dados de frequência:', err.message);
      res.status(500).json({ error: 'Erro ao buscar dados' });
      return;
    }

    const alunos = rows.filter(row => row.frequencia < 75);
    res.json(alunos);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

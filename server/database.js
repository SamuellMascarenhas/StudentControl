// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');  //':memory:' para um banco de dados em memória, ou especifique um nome de arquivo para um banco de dados baseado em arquivo.
db.serialize(() => {
  // Criar tabela
  db.run(`CREATE TABLE alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    notas TEXT,
    frequencia REAL
  )`);
});

module.exports = db;

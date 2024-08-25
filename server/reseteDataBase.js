const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    return;
  }
  console.log('Conectado ao SQLite com sucesso');
});

db.serialize(() => {
  db.run('DELETE FROM alunos', (err) => {
    if (err) {
      console.error('Erro ao limpar dados:', err.message);
    } else {
      console.log('Dados limpos com sucesso');
    }
    db.close();
  });
});

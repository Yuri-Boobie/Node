const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco de dados
const dbPath = path.join(__dirname, 'banco_dados.db');

// Criar conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('✓ Conectado ao banco de dados SQLite');
  }
});

// Criar tabela de usuários (exemplo)
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Erro ao criar tabela:', err.message);
  } else {
    console.log('✓ Tabela de usuários pronta');
  }
});

// Funções para operações do banco de dados
module.exports = {
  db,

  // Inserir um usuário
  inserirUsuario: (nome, email, callback) => {
    db.run(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email],
      function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id: this.lastID, nome, email });
        }
      }
    );
  },

  // Obter todos os usuários
  obterUsuarios: (callback) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },

  // Obter usuário por ID
  obterUsuarioPorId: (id, callback) => {
    db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  },

  // Atualizar usuário
  atualizarUsuario: (id, nome, email, callback) => {
    db.run(
      'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id],
      function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { changes: this.changes });
        }
      }
    );
  },

  // Deletar usuário
  deletarUsuario: (id, callback) => {
    db.run('DELETE FROM usuarios WHERE id = ?', [id], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { deleted: this.changes });
      }
    });
  },

  // Fechar banco de dados
  fecharBanco: () => {
    db.close((err) => {
      if (err) {
        console.error('Erro ao fechar banco:', err.message);
      } else {
        console.log('✓ Conexão com banco de dados encerrada');
      }
    });
  }
};

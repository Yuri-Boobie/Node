const { 
  db, 
  inserirTarefa, 
  obterTarefas, 
  concluirTarefa, 
  deletarTarefa, 
  fecharBanco 
} = require('./database');

const tarefas = [
    {id: 1, titulo: "Estudar JavaScript", concluida: false},
    {id: 2, titulo: "Fazer compras", concluida: true},
]; //Array = Valor

function listarTarefas() {
    tarefas.forEach(function (tarefa) {
        console.log(
            "#" + tarefa.id +
             " - " +
              tarefa.titulo +
              " - Concluido: " +
               tarefa.concluida
        );
    });
}

function criarTarefa(titulo) {
    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: titulo,
        concluida: false,
    };
    tarefas.push(novaTarefa);
    console.log("Tarefa adicionada com sucesso!");
}

console.log("=== LISTA DE TAREFAS (Array) ===");
listarTarefas();

console.log("\n=== ADICIONANDO NOVA TAREFA (Array) ===");
criarTarefa("Planejar Figma TCC");

console.log("\n=== LISTA DE TAREFAS ATUALIZADA (Array) ===");
listarTarefas();

// ===== OPERAÇÕES COM BANCO DE DADOS =====
console.log("\n\n=== TESTANDO BANCO DE DADOS ===\n");

// Inserir algumas tarefas no banco de dados
inserirTarefa("Aprender Node.js", (err, tarefa) => {
    if (err) {
        console.error("Erro ao inserir tarefa:", err);
    } else {
        console.log("✓ Tarefa inserida no BD:", tarefa);
    }
});

inserirTarefa("Criar API REST", (err, tarefa) => {
    if (err) {
        console.error("Erro ao inserir tarefa:", err);
    } else {
        console.log("✓ Tarefa inserida no BD:", tarefa);
    }
});

inserirTarefa("Fazer deploy no servidor", (err, tarefa) => {
    if (err) {
        console.error("Erro ao inserir tarefa:", err);
    } else {
        console.log("✓ Tarefa inserida no BD:", tarefa);
    }
});

// Aguardar um tempo para as inserções serem concluídas, depois listar
setTimeout(() => {
    console.log("\n=== LISTANDO TAREFAS DO BANCO DE DADOS ===\n");
    obterTarefas((err, tarefasDB) => {
        if (err) {
            console.error("Erro ao obter tarefas:", err);
        } else {
            tarefasDB.forEach(tarefa => {
                const status = tarefa.concluida ? "✓ Concluída" : "✗ Pendente";
                console.log(`#${tarefa.id} - ${tarefa.titulo} - ${status}`);
            });
        }
    });

    // Concluir uma tarefa
    console.log("\n=== CONCLUINDO UMA TAREFA ===\n");
    concluirTarefa(1, (err, resultado) => {
        if (err) {
            console.error("Erro ao concluir tarefa:", err);
        } else {
            console.log("✓ Tarefa concluída!");
        }
    });

    // Listar novamente após concluir
    setTimeout(() => {
        console.log("\n=== TAREFAS APÓS CONCLUSÃO ===\n");
        obterTarefas((err, tarefasDB) => {
            if (err) {
                console.error("Erro ao obter tarefas:", err);
            } else {
                tarefasDB.forEach(tarefa => {
                    const status = tarefa.concluida ? "✓ Concluída" : "✗ Pendente";
                    console.log(`#${tarefa.id} - ${tarefa.titulo} - ${status}`);
                });
            }

            // Fechar banco de dados
            console.log("\n");
            fecharBanco();
        });
    }, 500);
}, 500);




























































































































































































































































































































































































































































































































































































































































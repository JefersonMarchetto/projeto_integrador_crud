const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Coloque sua senha do MySQL aqui
    database: 'projeto_integrador'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// CRUD de Mães

// Rota GET para listar todas as mães com seus filhos
app.get('/maes', (req, res) => {
    const query = `
    SELECT Mae.id_mae, Mae.nome_mae, Mae.cpf, 
           Aluno.nome_aluno, Aluno.id_aluno 
    FROM Mae 
    LEFT JOIN Aluno ON Mae.id_mae = Aluno.id_mae
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        // Organizar os dados para agrupar os filhos por mãe
        const maes = [];
        const maesMap = new Map();

        results.forEach((row) => {
            if (!maesMap.has(row.id_mae)) {
                maesMap.set(row.id_mae, {
                    id_mae: row.id_mae,
                    nome_mae: row.nome_mae,
                    cpf: row.cpf,
                    filhos: []
                });
                maes.push(maesMap.get(row.id_mae));
            }

            // Adicionar o filho à lista de filhos da mãe
            if (row.nome_aluno) {
                maesMap.get(row.id_mae).filhos.push({
                    id_aluno: row.id_aluno,
                    nome_aluno: row.nome_aluno
                });
            }
        });

        res.json(maes);
    });
});

// Rota GET para obter uma mãe pelo ID
app.get('/maes/:id', (req, res) => {
    const id_mae = req.params.id;
    const query = 'SELECT * FROM Mae WHERE id_mae = ?';
    connection.query(query, [id_mae], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Mãe não encontrada' });
        }
    });
});

// Rota POST para adicionar uma nova mãe
app.post('/maes', (req, res) => {
    const { nome_mae, cpf, trabalha_fora, trabalha_deixa_filhos, trabalha_deixa_filhos_quem, projetos_participar, autorizacao_buscar, cadastro_nf, tipo_residencia, numero_pecas, possui_banheiro, agua, luz } = req.body;

    const query = `INSERT INTO Mae (nome_mae, cpf, trabalha_fora, trabalha_deixa_filhos, trabalha_deixa_filhos_quem, projetos_participar, autorizacao_buscar, cadastro_nf, tipo_residencia, numero_pecas, possui_banheiro, agua, luz) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [nome_mae, cpf, trabalha_fora, trabalha_deixa_filhos, trabalha_deixa_filhos_quem, projetos_participar, autorizacao_buscar, cadastro_nf, tipo_residencia, numero_pecas, possui_banheiro, agua, luz], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ message: 'Mãe criada com sucesso!', id_mae: results.insertId });
    });
});

// Rota PUT para editar uma mãe
app.put('/maes/:id', (req, res) => {
    const id_mae = req.params.id;
    const { nome_mae, cpf, trabalha_fora, trabalha_deixa_filhos, trabalha_deixa_filhos_quem, projetos_participar, autorizacao_buscar, cadastro_nf, tipo_residencia, numero_pecas, possui_banheiro, agua, luz } = req.body;

    const query = `UPDATE Mae SET nome_mae = ?, cpf = ?, trabalha_fora = ?, trabalha_deixa_filhos = ?, trabalha_deixa_filhos_quem = ?, projetos_participar = ?, autorizacao_buscar = ?, cadastro_nf = ?, tipo_residencia = ?, numero_pecas = ?, possui_banheiro = ?, agua = ?, luz = ? WHERE id_mae = ?`;

    connection.query(query, [nome_mae, cpf, trabalha_fora, trabalha_deixa_filhos, trabalha_deixa_filhos_quem, projetos_participar, autorizacao_buscar, cadastro_nf, tipo_residencia, numero_pecas, possui_banheiro, agua, luz, id_mae], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Mãe atualizada com sucesso!' });
    });
});

// Rota DELETE para deletar uma mãe
app.delete('/maes/:id', (req, res) => {
    const id_mae = req.params.id;
    const query = 'DELETE FROM Mae WHERE id_mae = ?';

    connection.query(query, [id_mae], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Mãe deletada com sucesso!' });
    });
});

// CRUD de Alunos (somente com o nome)

// Rota POST para adicionar um novo aluno
app.post('/alunos', (req, res) => {
    const { nome_aluno, id_mae } = req.body;

    const query = `INSERT INTO Aluno (nome_aluno, id_mae) VALUES (?, ?)`;

    connection.query(query, [nome_aluno, id_mae], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ message: 'Aluno criado com sucesso!', id_aluno: results.insertId });
    });
});

// Iniciar o servidor
app.listen(5000, () => {
    console.log('Servidor backend rodando na porta 5000');
});

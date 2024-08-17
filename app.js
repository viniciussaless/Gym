// server.js
const express = require('express');
const app = express();
const path = require('path');
const connection = require('./models/db'); // Arquivo de conexão MySQL
var idUtilizador;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsing de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Adiciona suporte para form data

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Rota para a página home
app.get('/home', (req, res) => {
    res.render('home');
});

// Rota para login
app.post('/index', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Consulta ao banco de dados
    connection.query(
        "SELECT idUtilizadores, Email, Password FROM utilizadores WHERE Email = ? AND Password = ?",
        [email, password],
        function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).send("Erro na consulta");
            } else {
                if (results.length > 0) {
                    const dbidUtilizador = results[0].idUtilizadores;
                    idUtilizador = dbidUtilizador;
                    console.log(idUtilizador);
                    // Dados de usuário encontrados, redireciona para a página home
                    res.redirect('/home');
                } else {
                    // Dados de usuário não encontrados, envia resposta de erro
                    res.status(401).send("Email ou senha incorretos");
                }
            }
        }
    );
});

// Rotas para os dias da semana
app.get('/segunda', (req, res) => {
    console.log(idUtilizador);
    // Consulta os exercícios do banco de dados
    connection.query("SELECT * FROM exercicios WHERE DiaSemana = 'Segunda-Feira' AND idUtilizadores = ?", [idUtilizador], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro ao consultar exercícios");
        } else {
            res.render('segunda', { exercicios: results });
        }
    });
});

// Rota para adicionar exercício
app.post('/addExercise', (req, res) => {
    console.log(idUtilizador);
    const { nome, musculo, peso, repeticao, diaPorExtenso } = req.body;
    const query = "INSERT INTO exercicios (idUtilizadores, NomeExercicio, Musculo, Peso, Reps, DiaSemana) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(query, [idUtilizador, nome, musculo, peso, repeticao, diaPorExtenso], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erro ao adicionar exercício" });
        } else {
            res.json({ success: true, message: "Exercício adicionado com sucesso" });
        }
    });
});


// Rota para remover exercício
app.delete('/removeExercise/:id', (req, res) => {
    const exerciseId = req.params.id;

    const query = "DELETE FROM exercicios WHERE idExercicios = ?";
    connection.query(query, [exerciseId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erro ao remover exercício" });
        } else {
            res.json({ success: true, message: "Exercício removido com sucesso" });
        }
    });
});

// Rotas para os dias da semana
app.get('/terca', (req, res) => {
    // Consulta os exercícios do banco de dados
    connection.query("SELECT * FROM exercicios WHERE DiaSemana = 'Terca-Feira'", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro ao consultar exercícios");
        } else {
            res.render('terca', { exercicios: results });
        }
    });
});

// Rota para adicionar exercício
app.post('/addExercise', (req, res) => {
    const { nome, musculo, peso, repeticao, diaPorExtenso } = req.body;
    const query = "INSERT INTO exercicios (NomeExercicio, Musculo, Peso, Reps, DiaSemana) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [nome, musculo, peso, repeticao, diaPorExtenso], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erro ao adicionar exercício" });
        } else {
            res.json({ success: true, message: "Exercício adicionado com sucesso" });
        }
    });
});


// Rota para remover exercício
app.delete('/removeExercise/:id', (req, res) => {
    const exerciseId = req.params.id;

    const query = "DELETE FROM exercicios WHERE idExercicios = ?";
    connection.query(query, [exerciseId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erro ao remover exercício" });
        } else {
            res.json({ success: true, message: "Exercício removido com sucesso" });
        }
    });
});

// Rotas para os dias da semana
app.get('/quarta', (req, res) => {
    // Consulta os exercícios do banco de dados
    connection.query("SELECT * FROM exercicios WHERE DiaSemana = 'Quarta-Feira'", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro ao consultar exercícios");
        } else {
            res.render('quarta', { exercicios: results });
        }
    });
});

// Rota para adicionar exercício
app.post('/addExercise', (req, res) => {
    const { nome, musculo, peso, repeticao, diaPorExtenso } = req.body;
    const query = "INSERT INTO exercicios (NomeExercicio, Musculo, Peso, Reps, DiaSemana) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [nome, musculo, peso, repeticao, diaPorExtenso], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erro ao adicionar exercício" });
        } else {
            res.json({ success: true, message: "Exercício adicionado com sucesso" });
        }
    });
});


// Rota para remover exercício
app.delete('/removeExercise/:id', (req, res) => {
    const exerciseId = req.params.id;

    const query = "DELETE FROM exercicios WHERE idExercicios = ?";
    connection.query(query, [exerciseId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erro ao remover exercício" });
        } else {
            res.json({ success: true, message: "Exercício removido com sucesso" });
        }
    });
});

// Rotas para os dias da semana
app.get('/quinta', (req, res) => {
    // Consulta os exercícios do banco de dados
    connection.query("SELECT * FROM exercicios WHERE DiaSemana = 'Quinta-Feira'", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro ao consultar exercícios");
        } else {
            res.render('quinta', { exercicios: results });
        }
    });
});

// Rota para adicionar exercício
app.post('/addExercise', (req, res) => {
    const { nome, musculo, peso, repeticao, diaPorExtenso } = req.body;
    const query = "INSERT INTO exercicios (NomeExercicio, Musculo, Peso, Reps, DiaSemana) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [nome, musculo, peso, repeticao, diaPorExtenso], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erro ao adicionar exercício" });
        } else {
            res.json({ success: true, message: "Exercício adicionado com sucesso" });
        }
    });
});


// Rota para remover exercício
app.delete('/removeExercise/:id', (req, res) => {
    const exerciseId = req.params.id;

    const query = "DELETE FROM exercicios WHERE idExercicios = ?";
    connection.query(query, [exerciseId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erro ao remover exercício" });
        } else {
            res.json({ success: true, message: "Exercício removido com sucesso" });
        }
    });
});

// Rotas para os dias da semana
app.get('/sexta', (req, res) => {
    // Consulta os exercícios do banco de dados
    connection.query("SELECT * FROM exercicios WHERE DiaSemana = 'Sexta-Feira'", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro ao consultar exercícios");
        } else {
            res.render('sexta', { exercicios: results });
        }
    });
});
// Rota para adicionar exercício
app.post('/addExercise', (req, res) => {
    const { nome, musculo, peso, repeticao, diaPorExtenso } = req.body;
    const query = "INSERT INTO exercicios (NomeExercicio, Musculo, Peso, Reps, DiaSemana) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [nome, musculo, peso, repeticao, diaPorExtenso], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erro ao adicionar exercício" });
        } else {
            res.json({ success: true, message: "Exercício adicionado com sucesso" });
        }
    });
});



// Rota para remover exercício
app.delete('/removeExercise/:id', (req, res) => {
    const exerciseId = req.params.id;

    const query = "DELETE FROM exercicios WHERE idExercicios = ?";
    connection.query(query, [exerciseId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erro ao remover exercício" });
        } else {
            res.json({ success: true, message: "Exercício removido com sucesso" });
        }
    });
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

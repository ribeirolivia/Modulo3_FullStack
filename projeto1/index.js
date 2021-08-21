const express = require ('express');
const app = express();

const port = 3000;

app.use(express.json()); 

const filmes = [
    "Carlota Joaquina, Princesa do Brazil",
    "Tropa de Elite",
    "Vidas Secas",
    "Do começo ao fim",
    "O Auto da Compadecida",
    "Bacurau",
    "O Palhaço",
    "Flores Raras",
    "Serra Pelada",
    "Meu nome não é Johnny",
];


app.get('/', (req, res) =>{
    res.send('Bem vindo ao CineBrasil!');
});


app.get('/filmes', (req, res) => {
    res.send(filmes)
});


app.get('/filmes/:id', (req, res) => {
    const id = req. params.id -1;
    const filme = filmes[id];
    
    if (!filme) {
        res.send('Filme não encontrado')
    }
    res.send(filme);
});

// rota para cadastro de filmes
// lista - get (read)
//criar - post (create)
//atualizar - put (update)
//deletar - delete (delete)

app.post('/filmes', (req, res) => {
    const filme = req.body.filme;
    const id = filmes.length;
    filmes.push(filme);

    res.send(`Filme adicionado com sucesso: ${filme}. O ID do filme é ${id}`);
});

app.put('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    const filme = req.body.filme;
    const nomeAnterior = filmes[id]
    filmes[id] = filme;
    res.send(`Filme anterior: ${nomeAnterior}, atualizado com sucesso para: ${filme}.`)
});


app.delete('/filmes/:id', (req, res) =>{
    const id = req.params.id -1;
    const filme = filmes[id];
    if(!filme) {
        res.send("Filme não encontrado. Tente novamente.");
    }    
    filmes.splice(id, 1);
    res.send(`O filme ${filme} foi excluído com sucesso`)
});




app.listen(port, function(){
    console.info(`App rodando na porta http://localhost:${port}/`)
});

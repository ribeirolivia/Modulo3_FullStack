const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

const games = [
  "PAC-MAN",
  "Mario Bros",
  "Sonic",
  "Alex Kidd",
  "FIFA",
  "Carmagedon",
  "Resident Evil",
  "Mortal Kombat",
  "Street Fighter",
  "Final Fantasy",
  "Crash Bandcoot",
];

games.forEach(function (item, indice) {
  console.log(indice, item);
});

function randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function jogoAl(num) {
  return games[num];
}

app.get("/", (req, res) => {
  res.send(`<h1>Seja Bem vindo ao Nostalgia Games!</h1>`);
});

app.get("/ngames", (req, res) => {
  res.send(games);
});


app.get("/ngames/:id", (req, res) => {
  const id = req.params.id;
  const jogo = games[id - 1];
  if (id > games.length || id < 1) {
    res.send("ID não encontrado, tente novamente!");
  } else {
    res.send(jogo);
  }
});

app.get("/sugestao", (res, req) => {
  req.send(
    `<h3>Nossa sugestão de jogo é: "${jogoAl(randomMinMax(0, 12))}"!</h3>`
  );
});

app.post("/ngames", (req, res) => {
  const jogo = req.body.jogo;
  const id = games.length;
  games.push(jogo);
  res.send(`O  id ${id + 1} do ${jogo} foi adicionado com sucesso!`);
});

app.put("/ngames/:id", (req, res) => {
  const id = req.params.id - 1;
  const jogo = req.body.jogo;
  const jogoAnterior = games[id];
  if (!games[id]) {
    res.send("ID nao encontrado, tente novamente");
  }
  games[id] = jogo;
  res.send(`O jogo "${jogoAnterior}" atualizado com sucesso para: ${jogo}`);
});

app.delete("/ngames/:id", (req, res) => {
  const id = req.params.id - 1;
  const jogo = games[id];

  if (!games[id]) {
    res.send("O item selecionado não foi encontrado.");
  }
  games.splice(id, 1);
  res.send(`O "${jogo}" foi excluído com sucesso!`);
});

app.listen(port, () => {
  console.info(`App rodando em: http://localhost:${port}/ `);
});

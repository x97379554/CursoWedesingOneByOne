const quiz = {
  perguntas: [
    {
      pergunta: 'Qual é o nome do Ben10?',
      respostas: ['Ben Vindo', 'Ben Tennyson', 'Benjamin Kirby Tennyson', 'Benjamin'],
      respostaCorreta: 'Benjamin Kirby Tennyson',
      comentario: 'Benjamin é o nome do Ben10',
    },
    {
      pergunta: 'Quantos anos tem o Ben10?',
      respostas: ['10 anos', '20 anos', '30 anos', '40 anos'],
      respostaCorreta: '10 anos',
      comentario: 'O Ben10 tem 10 anos',
    },
    {
      pergunta: 'Qual é o nome da prima do Ben10?',
      respostas: ['Mario', 'Luigi', 'Gwen', 'Toad'],
      respostaCorreta: 'Gwen',
      comentario: 'Gwen é o nome da prima do Ben10',
    },
    {
      pergunta: 'Qual é o nome do avô do Ben?',
      respostas: ['Max Tennyson', 'Jack Kirby', 'Kevin Levin', 'Carl Tennyson'],
      respostaCorreta: 'Max Tennyson',
      comentario: 'Max Tennyson é o avô do Ben e um encanador experiente.',
    },
    {
      pergunta: 'Qual o nome do dispositivo usado pelo Ben?',
      respostas: ['Omnitrix', 'Ultimatrix', 'Chronos', 'Alientrix'],
      respostaCorreta: 'Omnitrix',
      comentario: 'Omnitrix é o relógio que permite ao Ben se transformar em alienígenas.',
    },
    {
      pergunta: 'Quem é o arqui-inimigo do Ben?',
      respostas: ['Vilgax', 'Hex', 'Dr. Animo', 'Zombozo'],
      respostaCorreta: 'Vilgax',
      comentario: 'Vilgax é o principal vilão e busca o Omnitrix para dominar o universo.',
    },
    {
      pergunta: 'Qual é o nome do alienígena veloz do Omnitrix?',
      respostas: ['XLR8', 'Quatro Braços', 'Fogo Fátuo', 'Diamante'],
      respostaCorreta: 'XLR8',
      comentario: 'XLR8 é conhecido por sua velocidade incrível.',
    },
    {
      pergunta: 'Quantos alienígenas o Omnitrix original possui?',
      respostas: ['10', '20', '100', '5'],
      respostaCorreta: '10',
      comentario: 'O Omnitrix original possui 10 formas alienígenas diferentes.',
    },
    {
      pergunta: 'Qual é o nome da vilã que também é uma encanadora?',
      respostas: ['Charmcaster', 'Hex', 'Vilgax', 'Eon'],
      respostaCorreta: 'Charmcaster',
      comentario: 'Charmcaster é uma vilã poderosa e sobrinha de Hex.',
    },
    {
      pergunta: 'Quem é o amigo do Ben que vira inimigo e depois aliado?',
      respostas: ['Kevin Levin', 'Hex', 'Rook Blonko', 'Kai Green'],
      respostaCorreta: 'Kevin Levin',
      comentario: 'Kevin Levin começa como inimigo, mas acaba se tornando um grande aliado do Ben.',
    },
  ],
};

let resqpos = 0;
let respostasCorretas = 0;
let respostasErradas = 0;

const pertg = document.getElementById("questons");
const respostas = document.getElementById("resp");
const comentarios = document.getElementById("coment");
const comentariosAdicional = document.getElementById("coment-add");
const estatisticas = document.getElementById("stats");

function mostrarPergunta() {
  const perguntaAtual = quiz.perguntas[resqpos];
  pertg.textContent = perguntaAtual.pergunta;
  respostas.innerHTML = '';
  comentarios.textContent = '';
  comentariosAdicional.textContent = '';

  perguntaAtual.respostas.forEach((resposta, index) => {
    const btn = document.createElement("div");
    btn.textContent = resposta;
    btn.className = "btn";
    btn.addEventListener("click", () => checkResp(index));
    respostas.appendChild(btn);
  });
}

function checkResp(selected) {
  const perguntaAtual = quiz.perguntas[resqpos];
  const respostaCorreta = perguntaAtual.respostaCorreta;
  const comentario = perguntaAtual.comentario;

  if (perguntaAtual.respostas[selected] === respostaCorreta) {
    comentarios.textContent = "A resposta está correta";
    comentarios.className = "comentC";
    respostasCorretas++;
  } else {
    comentarios.textContent = "A resposta está errada";
    comentarios.className = "comentI";
    comentariosAdicional.textContent = `A resposta correta é: ${respostaCorreta}`;
    respostasErradas++;
  }
  
  
  comentariosAdicional.textContent += `${comentario}`;

  
  Array.from(respostas.children).forEach((btn) => {
    btn.style.pointerEvents = "none";
  });

  setTimeout(() => {
    resqpos++;
    if (resqpos < quiz.perguntas.length) {
      mostrarPergunta();
    } else {
      mostrarEstatisticas();
    }
  }, 4000);
}


function mostrarEstatisticas() {
  const totalPerguntas = quiz.perguntas.length;
  const percentualAcertos = ((respostasCorretas / totalPerguntas) * 100).toFixed(2);
  pertg.textContent = "Estatísticas do Quiz";
  respostas.innerHTML = '';
  comentarios.textContent = '';
  comentariosAdicional.textContent = '';

  estatisticas.innerHTML = `
    <p>Total de perguntas: ${totalPerguntas}</p>
    <p>Respostas corretas: ${respostasCorretas}</p>
    <p>Respostas erradas: ${respostasErradas}</p>
    <p>Percentual de acertos: ${percentualAcertos}%</p>
    <p>${gerarComentarioDesempenho(percentualAcertos)}</p>
  `;

  resqpos = 0;
  respostasCorretas = 0;
  respostasErradas = 0;
}

function gerarComentarioDesempenho(percentual) {
  if (percentual === 100) {
    return "Parabéns! Você acertou todas as perguntas!";
  } else if (percentual >= 70) {
    return "Bom trabalho! Você foi muito bem.";
  } else if (percentual >= 50) {
    return "Você foi razoável, mas pode melhorar.";
  } else {
    return "Continue tentando! Você pode melhorar com prática.";
  }
}

mostrarPergunta();

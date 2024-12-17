const quiz = {
  perguntas: [
    {
      pergunta: 'Qual é o propósito da tag <header> no HTML?',
      respostas: ['Incluir conteúdo de rodapé', 'Incluir links de navegação', 'Incluir informações de cabeçalho', 'Incluir scripts'],
      respostaCorreta: 'Incluir informações de cabeçalho',
      comentario: 'A tag <header> é usada para agrupar conteúdo introdutório ou links de navegação.',
    },
    {
      pergunta: 'Qual propriedade CSS é usada para alterar a cor de fundo?',
      respostas: ['color', 'background-color', 'font-color', 'bgcolor'],
      respostaCorreta: 'background-color',
      comentario: 'A propriedade background-color é usada para definir a cor de fundo de um elemento.',
    },
    {
      pergunta: 'Qual é o método usado para adicionar um item ao final de um array em JavaScript?',
      respostas: ['push()', 'pop()', 'shift()', 'unshift()'],
      respostaCorreta: 'push()',
      comentario: 'O método push() adiciona um ou mais elementos ao final de um array e retorna o novo comprimento do array.',
    },
    {
      pergunta: 'Qual é a função de <link> no HTML?',
      respostas: ['Incluir scripts', 'Ligar ao conteúdo externo', 'Aplicar estilos CSS', 'Incluir imagens'],
      respostaCorreta: 'Aplicar estilos CSS',
      comentario: 'A tag <link> é usada para vincular um documento HTML a recursos externos, como arquivos de estilo CSS.',
    },
    {
      pergunta: 'Como você seleciona um elemento com o id "main" no CSS?',
      respostas: ['#main', '.main', 'main', '*main'],
      respostaCorreta: '#main',
      comentario: 'Para selecionar um elemento pelo id no CSS, use o símbolo # seguido pelo id do elemento.',
    },
    {
      pergunta: 'Qual é o operador de igualdade estrita em JavaScript?',
      respostas: ['==', '===', '=', '!='],
      respostaCorreta: '===',
      comentario: 'O operador === verifica a igualdade tanto do valor quanto do tipo.',
    },
    {
      pergunta: 'O que significa CSS?',
      respostas: ['Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets', 'Creative Style Sheets'],
      respostaCorreta: 'Cascading Style Sheets',
      comentario: 'CSS significa Cascading Style Sheets, e é usado para estilizar elementos HTML.',
    },
    {
      pergunta: 'Qual é o método usado para remover o último item de um array em JavaScript?',
      respostas: ['pop()', 'push()', 'shift()', 'unshift()'],
      respostaCorreta: 'pop()',
      comentario: 'O método pop() remove o último elemento de um array e retorna esse elemento.',
    },
    {
      pergunta: 'Qual é a tag HTML para criar um link?',
      respostas: ['<link>', '<a>', '<href>', '<url>'],
      respostaCorreta: '<a>',
      comentario: 'A tag <a> (anchor) é usada para criar hyperlinks em um documento HTML.',
    },
    {
      pergunta: 'Qual propriedade CSS é usada para mudar a cor do texto?',
      respostas: ['text-color', 'font-color', 'color', 'text-style'],
      respostaCorreta: 'color',
      comentario: 'A propriedade color no CSS é usada para definir a cor do texto de um elemento.',
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

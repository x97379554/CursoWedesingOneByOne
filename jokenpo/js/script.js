
const botoes = document.querySelectorAll('#opcoes button');
const btnJogar = document.getElementById('jogar');
const resultado = document.getElementById('resultado');
const tabela = document.querySelector('tbody');
let jogadorEscolheu = '';
let vitoriasJogador = 0;
let vitoriasComputador = 0;

//* Função para verificar qual opção o jogador escolheu
function verificaEscolha() {
  botoes.forEach(btn => {
    if (btn.classList.contains('selecionado')) {
      jogadorEscolheu = btn.id;
    }
  });
}
botoes.forEach(btn => {
  btn.addEventListener('click', () => {
    botoes.forEach(b => b.classList.remove('selecionado'));
    btn.classList.add('selecionado');

    verificaEscolha();

    if (jogadorEscolheu !== '') {
      btnJogar.disabled = false;
    }
  });
});
btnJogar.addEventListener('click', () => {
  if (jogadorEscolheu === '') {
    console.log("Selecione uma opção!");
    return;
  }

  const escolhaComputador = sorteiaComputador();
  const resultadoRodada = comparaJogadas(jogadorEscolheu, escolhaComputador);
  resultado.textContent = resultadoRodada;

  //! Atualizar a tabela com as jogadas e o resultado
  const novaLinha = document.createElement('tr');
  novaLinha.innerHTML = `
    <td>${tabela.rows.length + 1}</td>
    <td>${jogadorEscolheu}</td>
    <td>${escolhaComputador}</td>
    <td>${resultadoRodada}</td>
  `;
  tabela.appendChild(novaLinha);

  //* Atlza as vitórias do jogador ou do computador
  if (resultadoRodada === 'Você venceu!') {
    vitoriasJogador++;
  } else if (resultadoRodada === 'Computador venceu!') {
    vitoriasComputador++;
  }

  //? Verificar se alguém venceu 3 vezes
  if (vitoriasJogador >= 3 || vitoriasComputador >= 3) {
    const fimDeJogoMensagem = vitoriasJogador === 3 ? 'Parabéns, você venceu!' : 'O computador venceu!';
    alert(`Fim do jogo! ${fimDeJogoMensagem}`);
    vitoriasJogador = 0;
    vitoriasComputador = 0;
    tabela.innerHTML = ''; 
  }

  // Desabilitar o botão "Jogar" após a rodada
  btnJogar.disabled = true;
});

//* sortear a jogada do computador
function sorteiaComputador() {
  const opcoes = ['pedra', 'papel', 'tesoura'];
  const indexAleatorio = Math.floor(Math.random() * opcoes.length);
  return opcoes[indexAleatorio];
}

// Função para comparar as jogadas do jogador e do computador
function comparaJogadas(escolhaJogador, escolhaComputador) {
  if (escolhaJogador === escolhaComputador) {
    return 'Empate!';
  }
  if (
    (escolhaJogador === 'pedra' && escolhaComputador === 'tesoura') ||
    (escolhaJogador === 'papel' && escolhaComputador === 'pedra') ||
    (escolhaJogador === 'tesoura' && escolhaComputador === 'papel')
  ) {
    return 'Você venceu!';
  }
  return 'Computador venceu!';
}

const nomeInput = document.getElementById('nome-input');
const salvarNomeBtn = document.getElementById('salvar-nome');
const fecharPopupBtn = document.getElementById('fechar-popup');
const popupContainer = document.getElementById('popup-container');

//* Mostrar o popup ao carregar a página
window.onload = mostrarPopup;

//* Função para exibir o popup
function mostrarPopup() {
  popupContainer.style.display = 'flex'; // Torna o popup visível
}

//* Função para esconder o popup
function esconderPopup() {
  popupContainer.style.display = 'none'; // Esconde o popup
}

//* Evento de clique para fechar o popup
fecharPopupBtn.addEventListener('click', esconderPopup);

//* Fechar o popup ao clicar fora dele
popupContainer.addEventListener('click', function(event) {
  if (event.target === popupContainer) { // Fecha se clicar fora do popup
    esconderPopup();
  }
});

//* Evento para salvar o nome do jogador
salvarNomeBtn.addEventListener('click', function() {
  const nome = nomeInput.value;
  if (nome.length >= 3) {
    const h1 = document.querySelector('h1');
    h1.textContent = `opa, ${nome}! Escolha Pedra, Papel ou Tesoura.`;
    esconderPopup();
  } else {
    alert("O nome deve ter pelo menos 3 caracteres");
  }
});

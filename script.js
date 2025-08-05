const form = document.getElementById('form-produto');
const nomeInput = document.getElementById('nome-produto');
const quantidadeInput = document.getElementById('quantidade-produto');
const tabelaBody = document.querySelector('#tabela-estoque tbody');

let estoque = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const quantidade = parseInt(quantidadeInput.value.trim());

  if (nome && quantidade > 0) {
    const itemExistente = estoque.find(item => item.nome === nome);

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      estoque.push({ nome, quantidade });
    }

    atualizarTabela();
    form.reset();
  }
});

function atualizarTabela() {
  tabelaBody.innerHTML = '';

  estoque.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.quantidade}</td>
      <td><button onclick="removerItem(${index})">Remover</button></td>
    `;
    tabelaBody.appendChild(tr);
  });
}

function removerItem(index) {
  estoque.splice(index, 1);
  atualizarTabela();
}

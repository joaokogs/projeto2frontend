let popUp = document.querySelector('.containerPopUp');
let btnPopUp = document.querySelector('.header--menu');

function abrePopUp(){
    if(popUp.classList.contains('containerPopUp')){
        popUp.classList.add('containerPopUpAberto');
        popUp.classList.remove('containerPopUp');
    } else{
        popUp.classList.add('containerPopUp');
        popUp.classList.remove('containerPopUpAberto');  
    }
}








//array para armazenar as postagens
let postagens = [];

//funçao para cadastrar uma nova postagem
function cadastrarPost() {

//valores dos campos de entrada
  const titulo = document.getElementById('inputTitulo').value;
  const conteudo = document.getElementById('inputConteudo').value;
  
//verificar se os campos n estao vazios
  if (titulo.trim() !== '' && conteudo.trim() !== '') {

    const postagem = {
      titulo: titulo,
      conteudo: conteudo
    };
    
//adicionar postagem ao array
    postagens.push(postagem);
    
//limpar campos de entrada
    document.getElementById('inputTitulo').value = '';
    document.getElementById('inputConteudo').value = '';
    
    atualizarListaPostagens();
  }
}

//funçao para buscar postagens por titulo ou conteúdo
function buscarPostagens() {

//palavra de busca
  const palavraBusca = document.getElementById('inputBuscar').value.toLowerCase();
  
//filtro da palavra para busca
  const postagensFiltradas = postagens.filter(postagem => {
    //colocando titulo e conteudo em minusculo para n bugar a busca
    const tituloLowerCase = postagem.titulo.toLowerCase();
    const conteudoLowerCase = postagem.conteudo.toLowerCase();
    
    return tituloLowerCase.includes(palavraBusca) || conteudoLowerCase.includes(palavraBusca);
  });
  
  atualizarListaPostagens(postagensFiltradas);
}

//funçao para excluir uma postagem
function excluirPostagem(num) {
//remover a postagem do array
  postagens.splice(num, 1);
  
  atualizarListaPostagens();
}

//funçao para editar uma postagem
function editarPostagem(num) {
  const postagem = postagens[num];
  
//alterar valor das postagens criadas
  document.getElementById('inputTitulo').value = postagem.titulo;
  document.getElementById('inputConteudo').value = postagem.conteudo;
  
  //alterar o botao de postar para salvar
  const btnCadastrar = document.getElementById('btnCadastrar');
  btnCadastrar.innerHTML = 'Salvar';
  btnCadastrar.onclick = function() {
    salvarEdicaoPostagem(num);
  };
}

//função para salvar a ediçao de uma postagem
function salvarEdicaoPostagem(num) {
//valores atualizados dos campos de entrada
  const titulo = document.getElementById('inputTitulo').value;
  const conteudo = document.getElementById('inputConteudo').value;
  
  //verificar se os campos n estao vazios
  if (titulo.trim() !== '' && conteudo.trim() !== '') {
    //atualizar os valores da postagem no array
    postagens[num].titulo = titulo;
    postagens[num].conteudo = conteudo;

    document.getElementById('inputTitulo').value = '';
    document.getElementById('inputConteudo').value = '';
    
    //alterar o botao de salvar para cadastrar
    const btnCadastrar = document.getElementById('btnCadastrar');
    btnCadastrar.innerHTML = 'Postar';
    btnCadastrar.onclick = cadastrarPost;
    
    atualizarListaPostagens();
  }
}

//funçao para atualizar a lista de postagens no html
function atualizarListaPostagens(postagensArray = postagens) {
  const listaPostagens = document.getElementById('listaPostagens');
  
  //limpar lista de postagens existentes
  listaPostagens.innerHTML = '';
  
  //adicionar cada postagem à lista
  postagensArray.forEach((postagem, num) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${postagem.titulo}</strong>
      <p>${postagem.conteudo}</p>
      <button onclick="editarPostagem(${num})">Editar</button>
      <button onclick="excluirPostagem(${num})">Excluir</button>
    `;
    listaPostagens.appendChild(listItem);
  });
}

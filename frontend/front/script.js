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

function getPostsStorage() {
    var postsJson = localStorage.getItem('posts');
    if (postsJson) {
      return JSON.parse(postsJson);
    } else {
      return [];
    }
}


function getPostsStorage() {
  var postsJson = localStorage.getItem('posts');
  if (postsJson) {
    return JSON.parse(postsJson);
  } else {
    return [];
  }
}

function salvarPostStorage() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

var posts = getPostsStorage();

function renderPostList() {
  var postList = document.getElementById('postList');
  postList.innerHTML = '';

  posts.forEach(function (post) {
    var postContainer = document.createElement('div');
    postContainer.className = 'post-container';

    var titleElement = document.createElement('h2');
    titleElement.textContent = post.title;

    var textElement = document.createElement('p');
    textElement.textContent = post.text;

    var imageElement = document.createElement('img');
    imageElement.src = post.image;

    var editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'edit-button';
    editBtn.addEventListener('click', function () {
      editPost(post);
    });

    var delBtn = document.createElement('button');
    delBtn.textContent = 'Deletar';
    delBtn.className = 'delete-button';
    delBtn.addEventListener('click', function () {
      deletePost(post);
    });

    postContainer.appendChild(titleElement);
    postContainer.appendChild(textElement);
    postContainer.appendChild(imageElement);
    postContainer.appendChild(editBtn);
    postContainer.appendChild(delBtn);

    postList.appendChild(postContainer);
  });
}

function addPost(title, text, image) {
  var newPost = {
    title: title,
    text: text,
    image: image
  };

  posts.push(newPost);
  salvarPostStorage();
  renderPostList();
}

function editPost(post) {
  var titleInput = document.getElementById('titleInput');
  var textInput = document.getElementById('textInput');
  var imageInput = document.getElementById('imageInput');
  
  titleInput.value = post.title;
  textInput.value = post.text;
  imageInput.value = ""; // Limpa o valor do input de imagem

  var saveBtn = document.createElement('button');
  saveBtn.textContent = 'Salvar';
  saveBtn.className = 'save-button';

  saveBtn.addEventListener('click', function () {
    post.title = titleInput.value;
    post.text = textInput.value;
    
    var newImage = imageInput.files[0];
    if (newImage) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        post.image = reader.result;
        salvarPostStorage();
        renderPostList();
      });
      reader.readAsDataURL(newImage);
    } else {
      salvarPostStorage();
      renderPostList();
    }
  });

  var postList = document.getElementById('postList');
  postList.appendChild(saveBtn);
}

function deletePost(post) {
  var confirmDelete = confirm('Tem certeza que deseja deletar este post?');

  if (confirmDelete) {
    var index = posts.indexOf(post);
    posts.splice(index, 1);
    salvarPostStorage();
    renderPostList();
  }
}

function buscarPost(keyword) {
  var filteredPosts = posts.filter(function (post) {
    var titleMatch = post.title.toLowerCase().includes(keyword.toLowerCase());
    var textMatch = post.text.toLowerCase().includes(keyword.toLowerCase());
    return titleMatch || textMatch;
  });

  var postList = document.getElementById('postList');
  postList.innerHTML = '';

  filteredPosts.forEach(function (post) {
    var postContainer = document.createElement('div');
    postContainer.className = 'post-container';

    var titleElement = document.createElement('h2');
    titleElement.textContent = post.title;

    var textElement = document.createElement('p');
    textElement.textContent = post.text;

    var imageElement = document.createElement('img');
    imageElement.src = post.image;

    var editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'edit-button';
    editBtn.addEventListener('click', function () {
      editPost(post);
    });

    var delBtn = document.createElement('button');
    delBtn.textContent = 'Deletar';
    delBtn.className = 'delete-button';
    delBtn.addEventListener('click', function () {
      deletePost(post);
    });

    postContainer.appendChild(titleElement);
    postContainer.appendChild(textElement);
    postContainer.appendChild(imageElement);
    postContainer.appendChild(editBtn);
    postContainer.appendChild(delBtn);

    postList.appendChild(postContainer);
  });
}

var postForm = document.getElementById('postForm');
postForm.addEventListener('submit', function (event) {
  event.preventDefault();

  var title = document.getElementById('titleInput').value;
  var text = document.getElementById('textInput').value;
  var imageInput = document.getElementById('imageInput');
  var image = imageInput.files[0];

  var reader = new FileReader();

  reader.addEventListener('load', function () {
    var imageUrl = reader.result;
    addPost(title, text, imageUrl);
  });

  if (image) {
    reader.readAsDataURL(image);
  } else {
    addPost(title, text, '');
  }

  postForm.reset();
});

var searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
  var keyword = searchInput.value;
  buscarPost(keyword);
});

function previewImage(event) {
  var imagePreview = document.getElementById('imagePreview');
  imagePreview.innerHTML = '';

  var image = document.createElement('img');
  image.src = URL.createObjectURL(event.target.files[0]);
  image.style.maxWidth = '100%';
  image.style.maxHeight = '200px';

  imagePreview.appendChild(image);
}

function tituloValidador(){
  if(document.getElementById('titleInput').value.length < 3){
    document.getElementById('avisoTitulo').style.display = 'block'
  } else{
    document.getElementById('avisoTitulo').style.display = 'none'
  }
}

function descValidador(){
  if(document.getElementById('textInput').value.length < 10){
    document.getElementById('avisoDesc').style.display = 'block'
  } else{
    document.getElementById('avisoDesc').style.display = 'none'
  }
}

renderPostList();

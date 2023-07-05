class PopUp {
  constructor() {
    this.popUp = document.querySelector('.containerPopUp');
    this.btnPopUp = document.querySelector('.header--menu');
    this.initialize();
  }

  initialize() {
    this.btnPopUp.addEventListener('click', this.togglePopUp.bind(this));
  }

  togglePopUp() {
    if (this.popUp.classList.contains('containerPopUp')) {
      this.popUp.classList.add('containerPopUpAberto');
      this.popUp.classList.remove('containerPopUp');
    } else {
      this.popUp.classList.add('containerPopUp');
      this.popUp.classList.remove('containerPopUpAberto');
    }
  }
}

class PostManager {
  constructor() {
    this.posts = this.getPostsStorage();
    this.postList = document.getElementById('postList');
    this.postForm = document.getElementById('postForm');
    this.searchInput = document.getElementById('searchInput');

    this.postForm.addEventListener('submit', this.handlePostSubmit.bind(this));
    this.searchInput.addEventListener('input', this.handleSearchInput.bind(this));

    this.renderPostList();
  }

  getPostsStorage() {
    var postsJson = localStorage.getItem('posts');
    if (postsJson) {
      return JSON.parse(postsJson);
    } else {
      return [];
    }
  }

  salvarPostStorage() {
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  renderPostList() {
    this.postList.innerHTML = '';

    this.posts.forEach((post) => {
      const postContainer = document.createElement('div');
      postContainer.className = 'post-container';

      const titleElement = document.createElement('h2');
      titleElement.textContent = post.title;

      const textElement = document.createElement('p');
      textElement.textContent = post.text;

      const imageElement = document.createElement('img');
      imageElement.src = post.image;

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.className = 'edit-button';
      editBtn.addEventListener('click', () => {
        this.editPost(post);
      });

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Deletar';
      delBtn.className = 'delete-button';
      delBtn.addEventListener('click', () => {
        this.deletePost(post);
      });

      postContainer.appendChild(titleElement);
      postContainer.appendChild(textElement);
      postContainer.appendChild(imageElement);
      postContainer.appendChild(editBtn);
      postContainer.appendChild(delBtn);

      this.postList.appendChild(postContainer);
    });
  }

  addPost(title, text, image) {
    const newPost = {
      title: title,
      text: text,
      image: image,
    };

    this.posts.push(newPost);
    this.salvarPostStorage();
    this.renderPostList();
  }

  editPost(post) {
    const titleInput = document.getElementById('titleInput');
    const textInput = document.getElementById('textInput');
    const imageInput = document.getElementById('imageInput');

    titleInput.value = post.title;
    textInput.value = post.text;
    imageInput.value = ''; // Limpa o valor do input de imagem

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Salvar';
    saveBtn.className = 'save-button';

    saveBtn.addEventListener('click', () => {
      post.title = titleInput.value;
      post.text = textInput.value;

      const newImage = imageInput.files[0];
      if (newImage) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          post.image = reader.result;
          this.salvarPostStorage();
          this.renderPostList();
        });
        reader.readAsDataURL(newImage);
      } else {
        this.salvarPostStorage();
        this.renderPostList();
      }
    });

    this.postList.appendChild(saveBtn);
  }

  deletePost(post) {
    const confirmDelete = confirm('Tem certeza que deseja deletar este post?');

    if (confirmDelete) {
      const index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      this.salvarPostStorage();
      this.renderPostList();
    }
  }

  buscarPost(keyword) {
    const filteredPosts = this.posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(keyword.toLowerCase());
      const textMatch = post.text.toLowerCase().includes(keyword.toLowerCase());
      return titleMatch || textMatch;
    });

    this.postList.innerHTML = '';

    filteredPosts.forEach((post) => {
      const postContainer = document.createElement('div');
      postContainer.className = 'post-container';

      const titleElement = document.createElement('h2');
      titleElement.textContent = post.title;

      const textElement = document.createElement('p');
      textElement.textContent = post.text;

      const imageElement = document.createElement('img');
      imageElement.src = post.image;

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.className = 'edit-button';
      editBtn.addEventListener('click', () => {
        this.editPost(post);
      });

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Deletar';
      delBtn.className = 'delete-button';
      delBtn.addEventListener('click', () => {
        this.deletePost(post);
      });

      postContainer.appendChild(titleElement);
      postContainer.appendChild(textElement);
      postContainer.appendChild(imageElement);
      postContainer.appendChild(editBtn);
      postContainer.appendChild(delBtn);

      this.postList.appendChild(postContainer);
    });
  }

  handlePostSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('titleInput').value;
    const text = document.getElementById('textInput').value;
    const imageInput = document.getElementById('imageInput');
    const image = imageInput.files[0];

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const imageUrl = reader.result;
      this.addPost(title, text, imageUrl);
    });

    if (image) {
      reader.readAsDataURL(image);
    } else {
      this.addPost(title, text, '');
    }

    this.postForm.reset();
  }

  handleSearchInput() {
    const keyword = this.searchInput.value;
    this.buscarPost(keyword);
  }
}

class ImagePreview {
  constructor() {
    this.imagePreview = document.getElementById('imagePreview');
    this.imageInput = document.getElementById('imageInput');
    this.imageInput.addEventListener('change', this.previewImage.bind(this));
  }

  previewImage(event) {
    this.imagePreview.innerHTML = '';

    const image = document.createElement('img');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.maxWidth = '100%';
    image.style.maxHeight = '200px';

    this.imagePreview.appendChild(image);
  }
}

class InputValidator {
  constructor() {
    this.titleInput = document.getElementById('titleInput');
    this.textInput = document.getElementById('textInput');

    this.titleInput.addEventListener('input', this.validateTitle.bind(this));
    this.textInput.addEventListener('input', this.validateDescription.bind(this));
  }

  validateTitle() {
    if (this.titleInput.value.length < 3) {
      document.getElementById('avisoTitulo').style.display = 'block';
    } else {
      document.getElementById('avisoTitulo').style.display = 'none';
    }
  }

  validateDescription() {
    if (this.textInput.value.length < 10) {
      document.getElementById('avisoDesc').style.display = 'block';
    } else {
      document.getElementById('avisoDesc').style.display = 'none';
    }
  }
}

const popUp = new PopUp();
const postManager = new PostManager();
const imagePreview = new ImagePreview();
const inputValidator = new InputValidator();

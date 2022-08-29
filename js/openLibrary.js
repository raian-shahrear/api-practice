const searchField = () => {
  const inputField = document.getElementById('input-field');
  const inputValue = inputField.value;
  inputField.value = '';

  const url= `http://openlibrary.org/search.json?q=${inputValue}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayBook(data.docs))
  .catch(err => alert(err))
}

const displayBook = books => {
  const displayBookContainer = document.getElementById('display-book-container');
  const authorContainer = document.getElementById('author-container');
  authorContainer.innerHTML = '';
  displayBookContainer.innerHTML = '';
  books.forEach(book => {
    console.log(book)
    const {author_name, publish_year, title, publish_place, publisher, cover_i, author_key} = book;
    const imgURL = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
    const altImgURL = './img/not-found-img.png'

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col');
    cardDiv.innerHTML = `
      <div class="card h-100">
        <img src=${cover_i == undefined ? altImgURL : imgURL} class="card-img-top h-100 w-100" alt=${title}>
        <div class="card-body">
          <h5 class="card-title">Title: ${title}</h5>
          <h6 class="card-text">Author: ${author_name[0]}</h6>
          <h6 class="card-text">Publish Year: ${publish_year ? publish_year[0] : 'Not Found'}</h6>
          <h6 class="card-text">Publish Place: ${publish_place ? publish_place[0] : 'Not Found'}</h6>
          <h6 class="card-text">Publisher: ${publisher ? publisher[0] : 'Not Found'}</h6>
          <div class="mt-4">
            <button onclick="authorDetails('${author_key[0]}')" class="btn btn-outline-success">Author Details</button>
          </div>
        </div>
      </div>
    `
    displayBookContainer.appendChild(cardDiv);
  });
}



const authorDetails = (authorKey) => {
  const url = `https://openlibrary.org/authors/${authorKey}.json`
  fetch(url)
  .then(res => res.json())
  .then(data => displayAuthor(data, authorKey))
  .catch(error => alert(error))
}

const displayAuthor = (author, key) => {
  console.log(author)
  const authorContainer = document.getElementById('author-container');

  const {name, birth_date, bio} = author;
  const imgURL = `https://covers.openlibrary.org/a/olid/${key}-L.jpg`
  // const altImgURL = './img/not-found-img.png'

  authorContainer.innerHTML = `
    <div  class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-6">
          <img src=${imgURL} class="img-fluid h-100 rounded-start" alt=${name}>
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h5 class="card-title">Author: ${name}</h5>
            <h6 class="card-text">BOD: ${birth_date ? birth_date : 'Not Found'}</h6>
            <p class="card-text"><b>Biography:</b> ${bio ? bio.value.slice(0, 100) : 'Not Found'}</p>
          </div>
        </div>
      </div> 
    </div>
  `
}
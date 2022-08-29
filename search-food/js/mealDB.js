const searchBtn = () => {
  const searchField = document.getElementById('search-field');
  const searchValue =  searchField.value.toLowerCase();
  console.log(searchValue)
  searchField.value = '';

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displaySearchItems(data.meals))
  .catch(error => alert(error))
}


const displaySearchItems = (foods) =>{
  const itemContainer = document.getElementById('item-container');
  itemContainer.innerHTML = '';

  foods.slice(0, 10).forEach(food => {
    const {strMealThumb, strMeal, strInstructions, idMeal} = food;
    const displayContainer = document.getElementById('display-container');
    displayContainer.innerHTML = '';
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col');
    cardDiv.innerHTML = `
      <div class="card h-100">
        <img src=${strMealThumb} class="card-img-top" alt="...">
        <div class="card-body">
          <h3 class="card-title">Title: ${strMeal}</h3>
          <p class="card-text"><b>Details:</b> ${strInstructions.slice(0, 200)}</p>
          <div class="card-footer">
            <button onclick="moreDetails(${idMeal})" class="btn btn-outline-success">More Details</button>
          </div>
        </div>
      </div>
  `
  itemContainer.appendChild(cardDiv);
})
}


const moreDetails = (itemId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    const displayContainer = document.getElementById('display-container');
    data.meals.forEach(meal =>{
      const {strMealThumb, strMeal, strCategory, strArea, strYoutube} = meal;

      displayContainer.innerHTML = `
      <div class="card">
        <img src=${strMealThumb} class="card-img-top" alt="...">
        <div class="card-body">
          <h3 class="card-title">${strMeal}</h3>
          <p class="card-text"><b>Category:</b> ${strCategory}</p>
          <p class="card-text"><b>Area of Origin:</b> ${strArea}</p>
          <a href=${strYoutube}>See Video</a>
        </div>
      </div>
      `
    })
  }) 
  .catch(error => alert(error))
}






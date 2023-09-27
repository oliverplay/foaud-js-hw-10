const endpoint = 'https://api.thecatapi.com/v1/breeds';
const api_key =
  'live_C734cUl9G5vw5WzWkJkOr3wfXpv4bMjqpzlgBZgAf1GvLf86HN3vBSmf0KHTcwPu';

const breedSelect = document.querySelector('.breed-select');
const pError = document.querySelector('.error');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
// testing
pError.style.display = "none"

breedSelect.addEventListener('change', () => {
  const selectedBreed = breedSelect.value;
  fetchBreeds()
    .then(breeds => renderBreedList(breeds, selectedBreed))
    .catch(error => console.error(error.message));
});

// Function to fetch breeds from the Cat API based on a query
function getBreeds(query) {
  return fetch(`${endpoint}?apiKey=${api_key}&q=${query}`)
    .then(res => res.json())
    .catch(error => console.error(error.message));
}

function fetchBreeds() {
  return fetch(endpoint).then(response => {
    if (!response.ok) {
      throw new Error(response.message);
    }
    return response.json();
  });
}

function renderBreedList(breeds, selectedBreed) {
  const breedOptions = breeds.map(breed => {
    return `
          <option value="${breed.id}" 
          ${breed.id === selectedBreed ? 'selected' : ''}>
          ${breed.name}
          </option>
        `;
  });

  breedSelect.innerHTML = breedOptions.join('');
}

// fetch and render the initial breed list when the page loads
fetchBreeds()
  .then(breeds => renderBreedList(breeds))
  .catch(error => console.error(error.message));

breedSelect.addEventListener('change', fetchCatByBreed);

function fetchCatByBreed(breedId) {
    breedId = breedSelect.value;
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    loader.style.display = 'block';

    return fetch(url, {
        headers:
        {
            'x-api-key': api_key,
        },
    })
    .then(response => {
        if (!response.ok){
            throw new Error(response.message);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const catImagesMarkup = data.map(cat => 
            createMarkup(cat)).join('');
        
        loader.style.display = 'none';
        updateCatInfo(catImagesMarkup);
    })
    .catch(onError);
}

function createMarkup(cat) {
    
  return `
        <div class='breed-card'>
          <div><h2 class="breed-name">${cat.breeds[0].name}</h2>
          <p class="breed-description">${cat.breeds[0].description}</p>
          <p class="breed-temperament">${cat.breeds[0].temperament}</p></div>
          <img class="breed-image" height = ${Number(cat.height)} width = ${Number(cat.width)} src=${cat.url}>
        </div>
      `;
} 

function updateCatInfo(markup) {
  catInfo.innerHTML = markup;
}

function onError() {
  return pError.style.display="block";
}
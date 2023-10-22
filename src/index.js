import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import refs from './refs';
//<------------------------------------------------------------
refs.select.addEventListener('change', createMarkup);
//<------------------------------------------------------------
fetchBreeds()
  .then(data => {
    return data.map(({ id, name }) => ({ text: name, value: id }));
  })
  .then(data => {
    const select = new SlimSelect({ select: '#single', text: '', value: '' });

    select.setData(data);
  })
  .catch(error => {
    throw error;
  });

//<------------------------------------------------------------
async function createMarkup() {
  const breedId = this.value;

  try {
    const data = await fetchCatByBreed(breedId);
    data.map(({ url }) => {
      const catInfoMarkup = ` <div class="container">
   <div class="cat-info" style="--clr: #009688">
     <div class="img-box">
       <img src="${url}" alt="${data[0].breeds[0].breed}" width="350" height="300" />
     </div>
     <div class="content">
       <h2>${data[0].breeds[0].name}</h2>
       <p class="description"><span>Description</span>: ${data[0].breeds[0].description}</p>
       <p class="temperament"><span>Temperament</span>: ${data[0].breeds[0].temperament}</p>
     </div>
   </div>
 </div>`;
      refs.catInfo.innerHTML = catInfoMarkup;
    });
  } catch (error) {
    console.error(error);
  }
}
//<------------------------------------------------------------

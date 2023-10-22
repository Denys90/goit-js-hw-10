import axios from 'axios';
import Notiflix from 'notiflix';
//<------------------------------------------------------------
axios.defaults.headers.common['x-api-key'] =
  'live_zn4mxamLGIocCCSAADmV7x3Yvy7xts23IvYdJJi7EXQdFwFKuSr1JLb7z0zxCiEd';
//<------------------------------------------------------------
function fetchBreeds() {
  Notiflix.Loading.standard('Loading data, please wait...');
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(response => {
      if (!response.status === 200) {
        console.error('Error:', response.status);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      }
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      Notiflix.Loading.remove();
    });
}
//<------------------------------------------------------------

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          return response.data;
        } else {
          Notiflix.Notify.failure(
            'Oops! Something went wrong! Try to choose a different kitten!'
          );
        }
      }

      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

//<------------------------------------------------------------
export { fetchBreeds, fetchCatByBreed };

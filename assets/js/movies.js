import {
  addMovieToList,
  clearMoviesMarkup,
  createMarkup,
  createStyles,
  inputSearch,
  moviesList,
  triggerMode
} from './dom.js';

let siteUrl = null;
let searchLast = null;

const debounce = (() =>{
  let timer = null;

 return (callback,ms) => {
  if (timer !== null) clearTimeout(timer);
   timer = setTimeout( callback, ms);
 };  
})();

const getData = (url) => fetch(url)
.then((res) => res.json())
.then((json) => { if(!json||!json.Search) throw Error('Cервер вернул неправильный обьект');

  return json.Search;
});
 const inputSearchHandler =(e) => {
  debounce(() => {
    const searchString = e.target.value.trim();

    if(searchString && searchString.length > 3 && searchString !== searchLast) {
      if(!triggerMode)clearMoviesMarkup();

      getData(`${siteUrl}?i=tt3896198&apikey=b3bd98b7&s=${searchString}`)
      .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
      .catch((err) => console.error(err));      
    }
    searchLast = searchString;
  },2000);
};

export const appInit = (url) => {
createStyles()
createMarkup()
siteUrl = url ||'https://www.omdbapi.com/';

inputSearch.addEventListener('keyup',inputSearchHandler);
};
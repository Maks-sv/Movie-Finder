// es5// const getData = (url) => new Promise((resolve, reject) => {
//   const xhr = new XMLHttpRequest();
  
//   xhr.open('GET',url);
//   xhr.send();
//   xhr.onload = () => {
//     if(xhr.status === 200){
//       const json = JSON.parse(xhr.response);
//       resolve(json.Search);
//     }
//     else reject(xhr.statusText,xhr.status);
//   };
//   xhr.onerror = (err) => reject(err);
// });
let moviesList = null;
let inputSearch = null;
let triggerMode = false;

const createElement = ({
  type,
  attrs,
  container = null,
  evt = null,
  handler = null,
  position ='append'
}) => {
  const el = document.createElement(type);

 Object.keys(attrs).forEach((key) => {
   if(key !== 'innerText') el.setAttribute(key,attrs[key]);
   else el.innerHTML = attrs[key];
});

if(evt && handler && typeof handler === 'function')el.addEventListener(evt,handler);
if (container && position === 'append')container.append(el); 
if (container && position === 'prepend')container.prepend(el); 

return el;
};

const createStyles = () => {
  createElement({
    type: 'style',
    attrs: {
      innerText:`
  * {
   box-sizing: border-box;
 }
 body {
 margin: 0;
 font-family: Arial, Helvetica, sans-serif;
}
.container {
 padding: 20px;
 max-width: 1280px;
 margin: 0 auto;
}
.movies {
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
 gap: 20px;
}
.movie {
 display: flex;
 align-content: center;
 justify-content: center;
}
.movie__image {
 width: 100%;
 object-fit: cover;
}
.search {
 margin-bottom: 40px;
}
.search__label-input {
 display: block;
 margin-bottom: 0.5em;
}
.search__input {
 display: block;
 padding: 0.75em 1em;
 max-width: 400px;
 width: 100%;
 border-radius: 4px;
 border: 1px solid lightgrey;
 margin-bottom: 0.75em;
}
.search__label-checkbox {
 font-size: 0.75em;
 display: block;
 margin-top: 2px;
}
.search__group--checkbox {
 display: flex;
 gap: 0.5em;
 align-items: center;
}`
 },
 container : document.head  
});
};
 const createMarkup = () => {
   const container = createElement({
     type:'div',
     attrs: {class : 'container'},
     container: document.body,
     position: 'prepend'
    });

    createElement ({
      type:'h1',
      attrs:{innerText: 'Приложение для поиска фильмов'},container});
    const searchBox = createElement ({
      type:'div',
      attrs:{class: 'search'},container})
    const inputBox = createElement ({
      type:'div',
      attrs: { class: 'search__group search__group--input '},
      container: searchBox});
    const checkBox = createElement ({
      type:'div',
      attrs:{ class: 'search__group search__group--checkbox '},
      container: searchBox});
   
     // const searchBox = document.createElement('div');
   
     // searchBox.setAttribute('class','search');
     // container.append(searchBox);
     createElement({
       type:'label',
       attrs:{
       for: 'search',
       id:' search',
       innerText: 'Поиск фильмов ',
       class: 'search__label-input'
     },
     container: inputBox});
   
     inputSearch = createElement({
     type:'input',
     attrs:{
     type: 'search',
     id:'search',
     placeholder: 'Начните вводить текст...',
     class: 'search__input'
   },
   container: inputBox});
   
   createElement({
     type:'input',
     attrs: {
     type: 'checkbox',
     id:'checkbox',
     class: 'search__checkbox'
   },
   container: checkBox,
   evt: 'click',
   handler: () =>  triggerMode = !triggerMode});
   
   createElement({
     type:'label',
     attrs:{
     for: 'checkbox',
     innerText: 'Добавлять фильмы к существующим  спискам',
     class: 'search__label-checkbox'
   },
   container: checkBox});

   moviesList = createElement({
   type : 'div',
   attrs:{class :'movies'}, container});
 };

const addMovieToList = (movie) => {
const item  = createElement({
  type:'div',
  attrs:{class: 'movie'},
  container: moviesList});

createElement({
  type : 'img',
  attrs:{class: 'movie__image',
  src: /^(http|https):\/\//.test(movie.Poster) ? movie.Poster:'assets/img/missing-picture.jpg',
  alt: movie.Title,
  title: movie.Title
},
container: item});

};
const debounce = (() =>{
  let timer = null;

 return (callback,ms) => {
  if (timer !== null) clearTimeout(timer)
   timer = setTimeout( callback, ms);
 };  
})();
const clearMoviesMarkup = () => moviesList &&(moviesList.innerHTML = '');

createStyles()
createMarkup()
const getData = (url) => fetch(url)
.then((res) => res.json())
.then((json) => { if(!json||!json.Search) throw Error('Cервер вернул неправильный обьект');

  return json.Search;
});
const search = 'Iron man';
 let searchLast = ' ';
 
const inputSearchHandler = (e) => {
  debounce(() => {
    const searchString = e.target.value.trim();

    if(searchString && searchString.length > 3 && searchString !== searchLast) {
      if(!triggerMode)clearMoviesMarkup();

      getData(`https://www.omdbapi.com/?i=tt3896198&apikey=b3bd98b7&s=${searchString}`)
      .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
      .catch((err) => console.error(err));      
    }
    searchLast = searchString;
  },2000);
}

inputSearch.addEventListener('keyup',inputSearchHandler);

// const ironMan = getData(`http://www.omdbapi.com/?i=tt3896198&apikey=b3bd98b7&s=Iron%20Man`);
// 2.// Promise.all([ironMan])
// .then((res) => res.forEach((movies) => movies.forEach((movie) =>console.log(movie))));

// 1.// ironMan.then((movies) => console.log(movies))
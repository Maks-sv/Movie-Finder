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

// const ironMan = getData(`http://www.omdbapi.com/?i=tt3896198&apikey=b3bd98b7&s=Iron%20Man`);
// 2.// Promise.all([ironMan])
// .then((res) => res.forEach((movies) => movies.forEach((movie) =>console.log(movie))));

// 1.// ironMan.then((movies) => console.log(movies))
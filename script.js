'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  // let flag = Object.keys(data.flags)[0];
  let flag = Object.values(data.flags)[0];
  // console.log(flag);
  let name = Object.values(data.name)[0];

  // console.log(name);
  let languages = Object.values(data.languages)[0];
  // console.log(languages);
  let currencies = Object.values(data.currencies)[0];
  //  console.log(currencies.name);
  const html = `<article class="country ${className}">
 <img class="country__img" src="${flag}" />
 <div class="country__data">
   <h3 class="country__name">${name}</h3>
   <h4 class="country__region">${data.region}</h4>
   <p class="country__row"><span>👫</span>${(
     +data.population / 1000000
   ).toFixed(1)} people</p>
   <p class="country__row"><span>🗣️</span>${languages}</p>
   <p class="country__row"><span>💰</span>${currencies.name}</p>  
 </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
/*const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    //   console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // let flag = Object.keys(data.flags)[0];
    let flag = Object.values(data.flags)[0];
    // console.log(flag);
    let name = Object.values(data.name)[0];

    // console.log(name);
    let languages = Object.values(data.languages)[0];
    // console.log(languages);
    let currencies = Object.values(data.currencies)[0];
    //  console.log(currencies.name);
    const html = `<article class="country">
  <img class="country__img" src="${flag}" />
  <div class="country__data">
    <h3 class="country__name">${name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${languages}</p>
    <p class="country__row"><span>💰</span>${currencies.name}</p>  
  </div>
</article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('india');
// getCountryData('usa');
*/

// Callback hell

/*
const getCountryAndNeighbour = function (country) {
  // Ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    //   console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Render country 1
    renderCountry(data);
    // Get neighbour country 2
    const [neighbour] = data.borders;
    console.log(neighbour);
    if (!neighbour) return;

    // Ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      //   console.log(this.responseText);
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('india');
// getCountryAndNeighbour('usa');
*/

// // Promises
// const request = fetch(`https://restcountries.com/v3.1/name/india`);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
// getCountryData('india');

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'addfd';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err}`);
//       renderError(`Something went wrong  ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      // console.log(response);
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      // const neighbour = 'addfd';

      // It is not print to the console
      console.log(neighbour);

      if (!neighbour) throw new Error('No neighbour found');

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('india');
});
getCountryData('australia');

// coding challenge #1
const whereAmI = function (lat, lan) {
  fetch(`https://geocode.xyz/${lat},${lan}?geoit=json`)
    .then(res => {
      console.log(res);
      res.json();
    })
    .then(data => {
      console.log(data);
    });
};
whereAmI(52.508, 13.381);

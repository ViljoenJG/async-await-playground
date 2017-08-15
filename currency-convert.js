const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const resp = await axios.get(`http://api.fixer.io/latest?base=${from.toUpperCase()}`);
    return resp.data.rates[to.toUpperCase()] || Promise.reject(`No exchange rate for ${from} and ${to}`)
  } catch (e) {
    return Promise.reject(`Unable to get exchange rate for ${from} and ${to}`)
  }
}

const getCountries = async (code) => {
  try {
    const resp = await axios.get(`https://restcountries.eu/rest/v2/currency/${code}`);
    return resp.data.map(country => country.name);
  } catch (e) {
    return Promise.reject(`Unable to find countries that use ${code}`)
  }
}

const convertCurrency = (from, to, amt) => {
  return getCountries(to).then((countries) => {
    return getExchangeRate(from, to).then((rate) => {
      return `${amt} ${from} is worth ${rate * amt} ${to}. ${to} ` +
             `can be used in the following countries: ${countries.join(', ')}`
    })
  })
}

const convertCurrencyAsync = async (from, to, amt) => {
  const rate = await getExchangeRate(from, to)
  const countries = await getCountries(to);

  return `${amt} ${from} is worth ${rate * amt} ${to}. ${to} ` +
         `can be used in the following countries: ${countries.join(', ')}`
}

// getExchangeRate('usd', 'zar').then(console.log);
// getCountries('zar').then(console.log)

convertCurrencyAsync('USD', 'ZAR', 10)
  .then(console.log)
  .catch(console.log)

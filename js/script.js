"use strict";

const quoteContainer = document.querySelector('.js-quote-container');
const quoteText = document.querySelector('.js-quote-text');
const authorText = document.querySelector('.js-quote-author');
const twitterBtn = document.querySelector('.js-twitter-button');
const newQuoteBtn = document.querySelector('.js-new-quote');
const loader = document.querySelector('.js-loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner();

  const proxyUrl = 'https://nameless-brook-23035.herokuapp.com/'
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // If Author is blank, add 'Unknown'
    authorText.textContent = (!data.quoteAuthor) ? 'Unknown' : data.quoteAuthor;

    // Reduce font size for long quotes
    quoteText.classList.toggle('quote__text--long', data.quoteText.length > 120);

    quoteText.textContent = data.quoteText;

    // Stop loader, show quote
    hideLoadingSpinner();

  } catch (error) {
    getQuote();
  }
}

function tweetQuote() {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" ~ ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();

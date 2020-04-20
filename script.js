'use strict';

const apiKey = 'c6c58fc18dfcd4b28afe5ea40e6681be';
 

const searchURL ='https://api.spoonacular.com/recipes/complexSearch?apiKey=a5c669f607f64ac897d9beca01046cf0&includeIngredients=chicken&instructionsRequired=true';


function getRecipe(searchTerm) {
    const params = {
        q: searchTerm,
        language: "en",
    };
    fetch(searchURL)

        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getRecipe(searchTerm);
    });
}

$(watchForm);
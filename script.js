'use strict';

const apiKey = 'c6c58fc18dfcd4b28afe5ea40e6681be';
 

const url ='https://api.spoonacular.com/recipes/';

//const searchURL = url+'?'+apiKey& searchTerm;


function getRecipe(searchTerm) {
   const searchURL = url+'?'+apiKey&searchTerm;


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
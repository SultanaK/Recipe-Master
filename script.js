'use strict';

//const apiKey = 'c6c58fc18dfcd4b28afe5ea40e6681be';
 
function getRecipe(searchTerm) {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${searchTerm}`;
    //const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?diet=vegetarian&query=${searchTerm}`;
    console.log(url);
     fetch(url, 
    {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "LgHxMTYKPpmshwhb6BYsVrPRtpvXp1pbPh5jsnDRyaXptvxh43"
        }
    })
         
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayRecipes(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}
function displayRecipes(responseJson){
    console.log(responseJson);
    const results= responseJson.results;
    $('#results-list').empty();
   $('#results').removeClass('hidden'); 

    for(let i =0; i<results.length; i++){
        let imageUrl = 'https://spoonacular.com/recipeImages/';
        console.log(imageUrl+results[i].image);
        console.log(results[i].title);
        console.log(results[i].sourceUrl);
        
        const entry= `<li>
               <h3> ${results[i].title}</h3>
               <a href=" ${results[i].sourceUrl}"target="_blank"> 
               <img src="${imageUrl + results[i].image}" alt="${results[i].title}">
               </a>
        </li> `
        $('#results-list').append(entry);

        
    }


}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getRecipe(searchTerm    );
    });
}

$(watchForm);
'use strict';

function getRecipeVideo(searchTerm) {
    const url = `https://yummly2.p.rapidapi.com/feeds/search?maxTotalTimeInSeconds=7200&q=${searchTerm}%20soup&start=0&maxResult=8`;
    console.log(url);
    fetch(url,
        {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "yummly2.p.rapidapi.com",
                "x-rapidapi-key": "LgHxMTYKPpmshwhb6BYsVrPRtpvXp1pbPh5jsnDRyaXptvxh43"
            }
        })

        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayVideo(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
    } 
function getRecipe(searchTerm) {
     const url1 =
            `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${searchTerm}`;
    fetch(url1, {
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
function displayRecipes(responseJson) {
    console.log(responseJson);
    const results = responseJson.results;
    $('#results-list').empty();
    $('#results').removeClass('hidden');

    for (let i = 0; i < results.length; i++) {
        let imageUrl = 'https://spoonacular.com/recipeImages/';
        console.log(imageUrl + results[i].image);
        console.log(results[i].title);
        console.log(results[i].sourceUrl);

        const entry = `<li>
               <h3> ${results[i].title}</h3>
               <a href=" ${results[i].sourceUrl}"target="_blank"> 
               <img src="${imageUrl + results[i].image}" alt="${results[i].title}">
               </a>
        </li> `
        $('#results-list').append(entry);

    }

}
function displayVideo(responseJson){
    const feed = responseJson.feed[0];
    const title = feed.display.displayName;
    const video = feed.content.videos.originalVideoUrl;
    const steps = feed.content.preparationSteps;

   $('#video').empty();
     $('#video').removeClass('hidden');

   console.log(title);
   console.log(video);
   console.log(steps);

   const name = `<h3>${title}<h3>`
   const embed = `<video controls width = "400px"
                    src = '${video}'
                     type = "video/mp4" >
                 </video>`
    const recipeSteps = steps.map( step => `<p>${step}<p>` );
     $("#video").append(name);
   /*  $('#results-video').append(embed);  */
       $('#video').append(embed); 
      $('#video').append(recipeSteps);   
   /*  $('#preparation').append(recipeSteps);  */
 
}


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getRecipeVideo(searchTerm);
        getRecipe(searchTerm);
    });
}

$(watchForm);
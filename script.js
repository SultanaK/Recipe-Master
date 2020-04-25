'use strict';
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
               <h4> ${results[i].title}</h4>
               <a href=" ${results[i].sourceUrl}"target="_blank"> 
               <img src="${imageUrl + results[i].image}" alt="${results[i].title}">
               </a>
        </li> `
        $('#results-list').append(entry);

    }

}
function getRecipeVideo(searchTerm) {
    const url = `https://yummly2.p.rapidapi.com/feeds/search?&q=${searchTerm}&start=0&maxResult=8`;
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
        .done
        .catch(err => {
            $('#js-error-message').html(`Something went wrong: ${err.message}`);
        });
} 
function displayVideo(responseJson){
    const feed = responseJson.feed[0];
    const title = feed.display.displayName;
    const video = feed.content.videos.originalVideoUrl;
    const steps = feed.content.preparationSteps;

   $('#video').empty();
    $('#video').removeClass('hidden');
    console.log(feed);
   console.log(title);
   console.log(video);
   console.log(steps);

   const name = `<h3>${title}<h3>`
    const embed = `<video controls="controls" loop="loop" 
                    src = '${video}'
                     type = "video/mp4" >
                 </video>`
    const recipeSteps = steps.map( step => `<p>${step}<p>`);
     
    $("#video").append(name);
       $('#video').append(embed); 
      $('#video').append(recipeSteps);   
   
 
}


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getRecipe(searchTerm); 
        getRecipeVideo(searchTerm);
       
    });
}

$(watchForm);
// ---------------------- //
///// GLOBAL VARIABLES /////
// ---------------------- //
// These variables hold the JSON data.
var recipeData; var randomData; var cityData; var restaurantData;

// These variables apply to the searches.
var keywordSearch; var entityID; var entityType; var recipeList = []; var recipeIndex;

// These variables are just for testing functionality until the event listeners are fully operational.
var testPic = "pizza";
var testFood = "pizza";
var testCity = "sacramento";
var testCityID = "499";


//------------------ //
///// API QUERIES /////
//------------------ //
// Query the MealDB database for a recipe from user search.
function getRecipes() {
    return $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + keywordSearch,
        method: "GET",
        cors: true,
        success: function(data) {
            var recipeSTR = JSON.stringify(data);
            recipeData = JSON.parse(recipeSTR);
            console.log("---- Recipe Data ----")
            console.log(recipeData);
        }
    })
}

// Query the MealDB database for a random recipe.
function getRandom() {
    return $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/random.php",
        method: "GET",
        cors: true,
        success: function(data) {
            var randomSTR = JSON.stringify(data);
            randomData = JSON.parse(randomSTR);
            console.log("---- RandomData ----")
            console.log(randomData);
        }
    })
}

// Query the Zomato database to get location details.
function getCityInfo() {
    return $.ajax({
        url: "https://developers.zomato.com/api/v2.1/locations?query=" + testCity,
        headers: {"Accept": "application/json", "user-key": "19196cd7a5838aa26e070b8a475ef856"},
        method: "GET",
        cors: true,
        success: function(data) {
            var citySTR = JSON.stringify(data);
            cityData = JSON.parse(citySTR);
            entityID = cityData.location_suggestions[0].entity_id;
            entityType = cityData.location_suggestions[0].entity_type;
            console.log("---- City Data ----")
            console.log(cityData);
        }
    })
}

// Query the Zomato database to get top rated restaurants.
function getRestaurants() {
    return $.ajax({
        url: "https://developers.zomato.com/api/v2.1/location_details?entity_id=" + entityID + "&entity_type=" + entityType,
        headers: {"Accept": "application/json", "user-key": "19196cd7a5838aa26e070b8a475ef856"},
        method: "GET",
        cors: true,
        success: function(data) {
            var restaurantSTR = JSON.stringify(data);
            restaurantData = JSON.parse(restaurantSTR);
            console.log("---- Restaurant Data ----")
            console.log(restaurantData);
        }
    })
}



//---------------- //
///// FUNCTIONS /////
//---------------- //

// Display a list of recipes based on keyword search.
function listRecipes() {
    $("#recipe-list").empty();
    if (recipeData.meals === null) {
        $("#recipe-list").append('<h3>Sorry, no results found. Please try again.</h3>');
    } else {
        for (var i = 0; i < 25; i++) {
            // Add image and title.
            recipeList.push(recipeData.meals[i]);
            var index = recipeList.indexOf(recipeData.meals[i]);
            $("#recipe-list").append(`
                <div class="recipe-card">
                    <div class="card-thumbnail">
                        <img id="recipe-img" src=${recipeData.meals[i].strMealThumb} height="300" width="300" alt="mealImg">
                    </div>
                    <h2 class="card-title">${recipeData.meals[i].strMeal}</h2>
                    <button class="recipe-button" value=${index}>Select</button>
                </div>
            `) 
        }
    }
}

// Display keyword recipe.
function displayKeywordRecipe(recipeIndex) {
    $("#recipe").empty();
    $("#recipe").append(`<img src=${recipeData.meals[recipeIndex].strMealThumb} height="300" width="300" alt="mealImg">`);
    $("#recipe").append(`<h1>${recipeData.meals[recipeIndex].strMeal}</h1>`);
    $("#recipe").append(`<button class= "button"> Save this recipe </button>`);
    $("#recipe").append(`<h3>Ingredients:</h3>`);
    var ingredList = $(`<ul id="ingredient-list"></ul>`);
    $("#recipe").append(ingredList);
    for (var i = 0; i < 20; i++) {
        if (recipeData.meals[recipeIndex]["strIngredient" + (i+1)] === "" || null) {
            continue;
        } else {
            $("#ingredient-list").append(`<li>${recipeData.meals[recipeIndex]["strIngredient" + (i+1)] + " - " + recipeData.meals[recipeIndex]["strMeasure" + (i+1)]}</li>`);
        }
    }
    // Add a line break after each step in the directions.
    var oldRecipeSTR = recipeData.meals[recipeIndex].strInstructions;
    var newRecipeSTR;
    var marker = 0;
    for (var i = 0; i < oldRecipeSTR.length; i++) {
        if (oldRecipeSTR[i] === ".") { 
            newRecipeSTR += oldRecipeSTR.slice(marker, i+1) + "<br>";
            marker = i+1;
        }
    }
    // Remove pesky 'undefined' occurences from directions string.
    newRecipeSTR = newRecipeSTR.replace("undefined1", "1");
    newRecipeSTR = newRecipeSTR.replace("undefined", "");
    $("#recipe").append(`<h3>Directions: </h3><p>${newRecipeSTR}</p>`);
};

// Display random recipe.
function displayRandomRecipe() {
    console.log("displayRandomRecipe: " + randomData)
    $("#recipe").empty();
    $("#recipe").append(`<img src=${randomData.meals[0].strMealThumb} height="300" width="300" alt="mealImg" >`);
    $("#recipe").append(`<h1>${randomData.meals[0].strMeal}</h1>`);
    $("#recipe").append(`<button class= "button"> Save this recipe </button>`);
    $("#recipe").append(`<h3>Ingredients:</h3>`);
    var ingredList = $(`<ul id="ingredient-list"></ul>`);
    $("#recipe").append(ingredList);
    for (var i = 0; i < 20; i++) {
        if (randomData.meals[0]["strIngredient" + (i+1)] === "" || null) {
            continue;
        } else {
            $("#ingredient-list").append(`<li>${randomData.meals[0]["strIngredient" + (i+1)] + " - " + randomData.meals[0]["strMeasure" + (i+1)]}</li>`);
        }
    }
    // Add a line break after each step in the directions.
    var oldRecipeSTR = randomData.meals[0].strInstructions;
    var newRecipeSTR;
    var marker = 0;
    for (var i = 0; i < oldRecipeSTR.length; i++) {
        if (oldRecipeSTR[i] === ".") { 
            newRecipeSTR += oldRecipeSTR.slice(marker, i+1) + "<br>";
            marker = i+1;
        }
    }
    // Remove pesky 'undefined' occurences from directions string.
    newRecipeSTR = newRecipeSTR.replace("undefined1", "1");
    newRecipeSTR = newRecipeSTR.replace("undefined", "");
    $("#recipe").append(`<h3>Directions: </h3><p>${newRecipeSTR}</p>`);
};

///// DISPLAY RESTAURANT INFO
// List local restaurants.
function listRestaurants() {
    $("#restaurant-list").empty();
    for (var i = 0; i < 10; i++) {
        $("#restaurant-list").append(`
        <div class="restaurant-card">
            <h2 class="card-title">${restaurantData.best_rated_restaurant[i].restaurant.name}</h2><br>
            <p class="card-desc">Cuisine: ${restaurantData.best_rated_restaurant[i].restaurant.cuisines}</p>
            <p class="card-desc">Avg cost for 2: $${restaurantData.best_rated_restaurant[i].restaurant.average_cost_for_two}</p>
            <p class="card-desc">Address: ${restaurantData.best_rated_restaurant[i].restaurant.location.address}</p>
            <p class="card-desc">Phone #: ${restaurantData.best_rated_restaurant[i].restaurant.phone_numbers}</p>
            <div class="card-link">
                <a href="${restaurantData.best_rated_restaurant[i].restaurant.url}">View Restaurant</a>
            </div>
        </div>
        `)
    }

}

//---------------------- //
///// EVENT LISTENERS /////
//---------------------- //

// Return list of all recipes.
$(".search-button").on("click", function (event) {
    event.preventDefault();
    $(".grid-x").empty();
    keywordSearch = $("#search-field").val();
    getRecipes().then(listRecipes);
    $("#search-field").val("");
});

// Get the recipe info for the user's choice.
$(document.body).on("click", ".recipe-button", function(event) {
    $("#recipe-list").empty();
    event.preventDefault();
    recipeIndex = $(this).attr("value");
    displayKeywordRecipe(recipeIndex);
});
  
// I can't decide/random meals button 
$(".random-button").on("click", function (event) {
    $(".grid-x").empty();
    event.preventDefault();
    getRandom().then(displayRandomRecipe);
});


// search restaurant button (I am feeling lazy)
$(".restaurant-button").on("click", function (event) {
    event.preventDefault();
    $(".grid-x").empty();
    $("#recipe").empty();
    getCityInfo().then(getRestaurants).then(listRestaurants);

    // getRecipes().then(function () {
    //     listRestaurants();
    // });
});


// Save recipe button ()
// $(".save-button").on("click", function (event) {
//     event.preventDefault(); 
//     function saveRecipe ();
// });



// Jessny styling recipe 

// function styleRecipe ( 
//     $("#recipe").append(`<img src=${randomData.meals[0].strMealThumb} height="300" width="300" alt="mealImg" >`);
//     $("#recipe").append(`<h1>${randomData.meals[0].strMeal}</h1>`);
//     $("#recipe").append(`<button class= "button"> Save this recipe </button>`);
//     $("#recipe").append(`<h3>Ingredients:</h3>`);
//     var ingredList = $(`<ul id="ingredient-list"></ul>`);
//     $("#recipe").append(ingredList);
//     for (var i = 0; i < 20; i++) {
//         if (randomData.meals[0]["strIngredient" + (i+1)] === "" || null) {
//             continue;
//         } else {
//             $("#ingredient-list").append(`<li>${randomData.meals[0]["strIngredient" + (i+1)] + " - " + randomData.meals[0]["strMeasure" + (i+1)]}</li>`);
//         }
//     }
//     var oldRecipeSTR = randomData.meals[0].strInstructions;
//     var newRecipeSTR;
//     var marker = 0;
//     for (var i = 0; i < oldRecipeSTR.length; i++) {
//         if (oldRecipeSTR[i] === ".") { 
//             newRecipeSTR += oldRecipeSTR.slice(marker, i+1) + "<br>";
//             marker = i+1;
//         }
//     }
//     newRecipeSTR = newRecipeSTR.replace("undefined1", "1");
//     $("#recipe").append(`<h3>Directions: </h3><p>${newRecipeSTR}</p>`)
// )

// });

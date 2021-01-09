// ---------------------- //
///// GLOBAL VARIABLES /////
// ---------------------- //
// These variables hold the JSON data.
var recipeData; var pictureData; var randomData; var cityData;
var keywordSearch; var ingredSearch; var citySearch;

// These variables apply to the restaurant search.
var entityID; var entityType;

// These variables are just for testing functionality until the event listeners are fully operational.
var testPic = "pizza";
var testFood = "pizza";
var testIngred = "potato";
var testCity = "sacramento";
var testCityID = "499";


//------------------ //
///// API QUERIES /////
//------------------ //
// Query the MealDB database for a recipe from user search.
function getRecipe() {
    return $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + testFood,
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

// Display keyword recipe.
function recipeKeywordInfo() {
    $("#recipe").empty();
    $("#recipe").append(`<img src=${recipeData.meals[0].strMealThumb} height="300" width="300" alt="mealImg" >`);
    $("#recipe").append(`<h1>${recipeData.meals[0].strMeal}</h1>`);
    $("#recipe").append(`<h3>Ingredients:</h3>`);
    var ingredList = $(`<ul id="ingredient-list"></ul>`);
    $("#recipe").append(ingredList);
    for (var i = 0; i < 20; i++) {
        if (recipeData.meals[0]["strIngredient" + (i+1)] === "" || null) {
            continue;
        } else {
            $("#ingredient-list").append(`<li>${recipeData.meals[0]["strIngredient" + (i+1)] + " - " + recipeData.meals[0]["strMeasure" + (i+1)]}</li>`);
        }
    }
    $("#recipe").append(`<h3>Directions: </h3><p>${recipeData.meals[0].strInstructions}</p>`);
};

// Display random recipe.
function recipeRandomInfo() {
    $("#recipe").empty();
    $("#recipe").append(`<img src=${randomData.meals[0].strMealThumb} height="300" width="300" alt="mealImg" >`);
    $("#recipe").append(`<h1>${randomData.meals[0].strMeal}</h1>`);
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
    $("#recipe").append(`<h3>Directions: </h3><p>${randomData.meals[0].strInstructions}</p>`);
};

///// DISPLAY RESTAURANT INFO
// Display name, cuisine type, address, and phone number.
function displayRestInfo() {
    $("#restaurant").empty();
    $("#restaurant").append(`<h2>${restaurantData.best_rated_restaurant[0].restaurant.name}</h2>`);
    $("#restaurant").append(`<p>Cuisine: ${restaurantData.best_rated_restaurant[0].restaurant.cuisines}</p>`);
    $("#restaurant").append(`<p>Address :${restaurantData.best_rated_restaurant[0].restaurant.location.address}</p>`)
    $("#restaurant").append(`<p>Phone #: ${restaurantData.best_rated_restaurant[0].restaurant.phone_numbers}</p>`)
}

// List local restaurants.
function listRestaurants() {

}

//---------------------- //
///// EVENT LISTENERS /////
//---------------------- //
// button 
$(".search-button").on("click", function (event) {
event.preventDefault();
// this function is made underneath 
randomRecipe();
});


$(".random-btn").on("click", function (event){
event.preventDefault();
})


//-------------- //
///// EXECUTE /////
//-------------- //
// The functions below are temporary until the event listeners are operational. Just un-comment them to test functionality.

///// Get and display keyword recipe:
// getRecipe().then(function() {
//     recipeKeywordInfo();
// })

///// Get and display random recipe:
// getRandom().then(function() {
//     recipeRandomInfo();
// });

///// Get and display city restaurants:
getCityInfo().then(getRestaurants).then(function() {
    displayRestInfo();
})
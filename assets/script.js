// ---------------------- //
///// GLOBAL VARIABLES /////
// ---------------------- //

var APIKey = "563492ad6f91700001000001f270577a46c942ff96c8a4e60398816d";
var recipeData;
var pictureData;
var randomData;
var cityData;
var keywordSearch;
var ingredSearch;
var citySearch;

// These variables apply to the restaurant search.
var entityID;
var entityType;

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

///// DISPLAY RECIPES
// Display image.
function showMealImg() {
    $("#picture").empty();
    var mealImg = `<img src=${recipeData.meals[0].strMealThumb} height="300" width="300" alt="mealImg" >`
    $("#picture").append(mealImg);
};
function showRandomMealImg() {
    $("#picture").empty();
    var randomMealImg = `<img src=${randomData.meals[0].strMealThumb} height="300" width="300" alt="mealImg" >`
    $("#picture").append(randomMealImg)
};

// Display title.
function showTitle (){
    $("#title").empty();
    var title =`<h1>${recipeData.meals[0].strMeal}</h1>`
    $("#title").append(title);
  };
function showRandomTitle(){
    $("#title").empty();
    var randomRT=`<h1 class="title">${randomData.meals[0].strMeal}</h1>`
    $("#title").append(randomRT);
};

// Display ingredients.
function populateIngred() {
    $("#ingredients").empty();
    $("#ingredients").append(`<h3>Ingredients:</h3>`);
    var ingredList = $(`<ul id="ingredient-list"></ul>`);
    $("#ingredients").append(ingredList);
    for (var i = 0; i < 20; i++) {
        if (recipeData.meals[0]["strIngredient" + (i+1)] === "" || null) {
            return;
        } else {
            $("#ingredient-list").append(`<li>${recipeData.meals[0]["strIngredient" + (i+1)] + " - " + recipeData.meals[0]["strMeasure" + (i+1)]}</li>`);
        }
    }
}
function populateRandomIngred() {
    $("#ingredients").empty();
    $("#ingredients").append(`<h3>Ingredients:</h3>`);
    var ingredList = $(`<ul id="ingredient-list"></ul>`);
    $("#ingredients").append(ingredList);
    for (var i = 0; i < 20; i++) {
        if (randomData.meals[0]["strIngredient" + (i+1)] === "" || null) {
            return;
        } else {
            $("#ingredient-list").append(`<li>${randomData.meals[0]["strIngredient" + (i+1)] + " - " + randomData.meals[0]["strMeasure" + (i+1)]}</li>`);
        }
    }
}  

// Display directions.
function showInstruction() {
    $("#directions").empty();
    var instruction = `<h1> Instruction: </h1><p class="iDetails"> ${recipeData.meals[0].strInstructions} </p>`
    $("#directions").append(instruction);
}; 

function displayDirections() {
    $("#directions").empty();
    var randomInstruction = `<h1> Instruction: </h1><p class="iDetails"> ${randomData.meals[0].strInstructions} </p>`
    $("#directions").append(randomInstruction);
};

///// DISPLAY RESTAURANTS


//---------------------- //
///// EVENT LISTENERS /////
//---------------------- //
// button 
// Search Button 
$(".search-button").on("click", function (event) {
    event.preventDefault();
  
    getRecipe().then(function () {
      showTitle();
      showMealImg();
      populateIngred();
      showInstruction();
    })
  });
  
  // I can't decide/random meals button 
  $(".random-button").on("click", function (event) {
    event.preventDefault();
  
    getRandom().then(function () {
      showRandomTitle();
      showRandomMealImg();
      populateRandomIngred();
      showRandomInstruction();
    });
  })
  
  // search restaurant button 
  $(".restaurant-button").on("click", function (event) {
  
  })


//-------------- //
///// EXECUTE /////
//-------------- //
/// Get keyword recipe:
// getRecipe().then(function() {
//     populateIngred();
//     showTitle();
//     showInstruction();
// showMealImg()
// })


// The functions below are temporary until the event listeners are operational. Just un-comment them to test functionality.

///// Get keyword recipe:
// getRecipe().then(function() {
//     showMealImg();
//     showTitle();
//     populateIngred();
//     showInstruction();
// })

///// Get random recipe:
getRandom().then(function() {
    showRandomMealImg();
    showRandomTitle();
    populateRandomIngred();
    displayDirections();
});

///// Get city restaurants:
// getCityInfo().then(getRestaurants).then(function() {
//     console.log("Name: " + restaurantData.best_rated_restaurant[0].restaurant.name);
//     console.log("Address: " + restaurantData.best_rated_restaurant[0].restaurant.location.address);
//     console.log("Phone #: " + restaurantData.best_rated_restaurant[0].restaurant.phone_numbers);
//     console.log("Cuisine Type: " + restaurantData.best_rated_restaurant[0].restaurant.cuisines);
// })
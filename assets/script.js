// ---------------------- //
///// GLOBAL VARIABLES /////
// ---------------------- //

var APIKey = "563492ad6f91700001000001f270577a46c942ff96c8a4e60398816d";
var recipeData;
var pictureData;
var randomData;
var testPic = "pizza";
var testFood = "pizza";


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
// getRandom();

// Query the Pexels database for a picture from user search.
function getPicture() {
    return $.ajax({
        url: "https://api.pexels.com/v1/search?query=" + testPic,
        headers: {"Authorization": APIKey},
        method: "GET",
        cors: true,
        success: function(data) {
            var pictureSTR = JSON.stringify(data);
            pictureData = JSON.parse(pictureSTR);
            console.log("---- PictureData ----")
            console.log(pictureData);
        }
    })
}
// getPicture();


//---------------- //
///// FUNCTIONS /////
//---------------- //

function populateIngred() {
    $("#ingredients").append(`<h3>Ingredients:</h3>`);
    var ingredList = $(`<ul id="ing-list"></ul>`);
    $("#ingredients").append(ingredList);
    for (var i = 0; i < 20; i++) {
        if (recipeData.meals[0]["strIngredient" + (i+1)] === "") {
            return;
        } else {
            $("#ing-list").append(`<li>${recipeData.meals[0]["strIngredient" + (i+1)] + " - " + recipeData.meals[0]["strMeasure" + (i+1)]}</li>`);
        }
    }
}   


//-------------- //
///// EXECUTE /////
//-------------- //

getRecipe().then(function() {
    populateIngred();
})
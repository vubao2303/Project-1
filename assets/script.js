// ---------------------- //
///// GLOBAL VARIABLES /////
// ---------------------- //

var APIKey = "563492ad6f91700001000001f270577a46c942ff96c8a4e60398816d";
var recipeData;
var pictureData;
var testFood = "pizza";


//------------------ //
///// API QUERIES /////
//------------------ //

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
getRecipe();

function getPicture() {
    return $.ajax({
        url: "https://api.pexels.com/v1/search?query=people",
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
getPicture();
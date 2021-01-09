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
getRandom();

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
// Display keyword search ingredients.
function populateIngred() {
    $("#ingredients").empty();
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

// Display random search ingredients.
function populateRandomIngred() {
    $("#ingredients").empty();
    $("#ingredients").append(`<h3>Ingredients:</h3>`);
    var ingredList = $(`<ul id="ing-list"></ul>`);
    $("#ingredients").append(ingredList);
    for (var i = 0; i < 20; i++) {
        if (randomData.meals[0]["strIngredient" + (i+1)] === "") {
            return;
        } else {
            $("#ing-list").append(`<li>${randomData.meals[0]["strIngredient" + (i+1)] + " - " + randomData.meals[0]["strMeasure" + (i+1)]}</li>`);
        }
    }
}  

// title 
function showTitle (){
    var title =`
    <h1> ${recipeData.meals[0].strMeal}</h1>
    `
    $("#recipe-name").append(title);
  };

function showRandomTitle(){
var randomRT=`
<h1 class= "title" > ${randomData.meals[0].strMeal} </h1>
`
$("#recipe-name").append(randomRT);
};

// img 
// populate pictures 
function showRandomMealImg() {
    var randomMealImg = `
    <img src=${randomData.meals[0].strMealThumb} alt="mealImg" >
    `
    $("#current-pic").append(randomMealImg)
};


function showMealImg() {
    var mealImg = `
    <img src=${recipeData.meals[0].strMealThumb} alt="mealImg" >
    `
    $("#current-pic").append(mealImg);
};


// instruction 

function showInstruction (){
var instruction = `
<h1> Instruction: </h1>
<p class="iDetails"> ${recipeData.meals[0].strInstructions} </p>
`
$("#directions").append(instruction);
// #directions is hard coded in html 
}; 

function showRandomInstruction (){
var randomInstruction = `
<h1> Instruction: </h1>
<p class="iDetails"> ${randomData.meals[0].strInstructions} </p>
`
$("#directions").append(randomInstruction);
// #directions is hard coded in html 
};


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
/// Get keyword recipe:
// getRecipe().then(function() {
//     populateIngred();
//     showTitle();
//     showInstruction();
// showMealImg()
// })

/// Get random recipe:
getRandom().then(function() {
    showRandomTitle();
    populateRandomIngred();
    showRandomInstruction();
    showRandomMealImg();
});


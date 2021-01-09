# Project-1 What for Dinner? 

As a person who needs to eat everyday, I would like some help with cooking or deciding what to eat. I want to have many choices of recipes, and when I can't decide on what to eat I will have a chance to pick a random recipe. If I see something I like, I would like to save it so I could recreate that meal for next time. On the day I don't feel like cooking or following recipes, I want to go out to eat, or in this COVID-19 seasons, get some to go from restaurant near me. 

## Site Picture
![Site]()

# Table of Contents 
[Tittle](What's for Dinner )

[Site Picutre](#Site-picture)

[Table of Contents](#Table-of-Content)

[Description of Page Building ](#Description-of-Page-Building)

[Code Snippet](#Code-Snippet)

[Technologies Used](#Technologies-Used)

[Deployed Link](#Deployed-Link)

[Authors](#Authors)

[License](#License)


## Description of Page Building 
* Create a html file, a css file, and a javascript file
  
* In HTML file 
  <ul>
  <li> Construct HTML file in semantic style 
  <li> Use Foundation CSS framework to style the page
  <li> 
  <li>
  <li>
  <li> Add authors info in the footer 
  </li>
    
* In Javascript file 
  <ul> 
  <li> Utilize TheMealDB and Zomato API 
  <li> Use AJAX function to pull data
  <li> Name variables as pointer to html file and for functions 
  <li> Create event listener for buttons to generate recipe info 
  <li> Validate user input 
  <li> Create HTML in semantic style 
    
* In Javascript file 
  <ul>
  <li>Name variables for different objects and function 
  <li>Set current date and time using Jquery 
  <li>Use on click function for save button to save user input in local storage 
  <li>Go throught the loops of objects by using the for loop to get the value of ingridients 
  <li>Apply JSON.stringify funtion to add into storage and JSON.parse to get items to the page
  </li>
  </ul>
* In Style.Css file 
  <ul>
  <li> Adjust texts, margin, and padding 
  <li> Add colors to elements 
  <li> Add background images 
  <li> Select font styles and sizes 
  </li>
  </ul>
## Code Snippet
```
  <li>Style time blocks base on past hours, present hour, and future hours
  <li>Add style to save button with save icon and color  
  <li>Color headers and titles
  <li>Adjust texts, margin, and padding 
  </li>
  </ul>
```
Apply real live hour to the page 
```javascript
$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
```
Have all the events and functions in ready function to execute the code when the DOM is ready 
```javascript
$(document).ready(function(){
    if(!localStorage.getItem('plans')) {
      updatePlans(plans);
    } else {
      updatePlans(JSON.parse(localStorage.getItem('plans')));
    }
  })

```
Name contents using variables 
```javascript

var APIKey = "563492ad6f91700001000001f270577a46c942ff96c8a4e60398816d";
var recipeSTR = JSON.stringify(data);
```
Use on click function to attaches on click event to button element
```javascript 
$("saveBtn").click(function() {
var plans = {
    "9:00": "",
    "10:00": "",
    "11:00": "",
    "12:00": "",
    "13:00": "",
    "14:00": "",
    "15:00": "",
    "16:00": "",
    "17:00": "",
  };
```
Use addEventListener function to attaches on click event to button element
```javascript 
$("saveBtn").click(function() {
    value = $(this).siblings("textarea").val();
    hourvalue = $(this).siblings("div").text();
    saveSchedule(hourvalue, value);
  });
  ```
  Use conditional statement to compare the time and add class accordingly 
  ```javascript 
  if(timeNumber < presentHour) {
      $(textEntry).addClass("past");

    } else if (timeNumber > presentHour) {
      $(textEntry).addClass("future");
    } else {
      $(textEntry).addClass("present");
    }
  ```

## Technologies Used
- HTML - used to create elements on the DOM
  * [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- CSS - styles html elements on page
  * [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- Javascript - gives interacticve elements to web pages
  * [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- Bootstrap - design and customize responsive site
  * [Bootstrap](https://getbootstrap.com/)
- Jquery - use API to makes DOM traversal, manipulation, event handling, etc. simpler
  * [Jquery](https://jquery.com/)
- Git - version control system to track changes to source code
   * [Git](https://git-scm.com/)
- GitHub - hosts repository that can be deployed to GitHub Pages
  * [Github](https://github.com/)
- TheMealDb - An open database of recipes from around the world.
  * [theMealDb](https://www.themealdb.com/api.php) 
- Zomato- give data access to more than 1 million restaurants across 10,000 cities globally
  * [Zomato](https://developers.zomato.com/api) 
- Foudation -Responsive CSS frameworks 
  * [Foundation](https://get.foundation/)

## Deployed Link

* [See Live Site](https://vubao2303.github.io/Project-1/)


## Authors

* **Jordan Kelly** 
  - [Github](https://github.com/profjjk)
  - [LinkedIn](https://www.linkedin.com/in/jordan-kelly-3934a597/)
* **B Tram Vu**
  - [Github](https://github.com/vubao2303) 
  - [LinkedIn](https://www.linkedin.com/in/tram-vu-866250121/)
* **Jessny Joseph** 
  - [Github](https://github.com/jessnyj)
  - [LinkedIn](https://www.linkedin.com/in/jessny-joseph-361515201/)
* **Hudson Barnes** 
  - [Github](https://github.com/hudsonmbarnes)
  - [LinkedIn](https://www.linkedin.com/in/hudson-barnes-398483151/)


## License

© 2020 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.

© 2021 TheMealDB. All Rights Reserved
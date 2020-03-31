console.log("HELLO LET'S MAKE SOME FRUIT JUICE!");


//Variables
var instructions = document.querySelector('.instructions');
var recipe = document.querySelector('.container-3');
var ingredients = document.querySelector('.container-2');
var unsatisfiedCustomers = document.getElementById('unsatisfied-customer');
var happyCustomers = document.getElementById('happy-customers');
var countdownTimer = document.querySelector('.time');
var recipeDisplay = document.querySelector('.recipe-display');
var ingredientDisplay = document.querySelectorAll('.ingredient-display');

recipe.style.visibility = 'hidden';
ingredients.style.visibility = 'hidden';

var idToRemove;
var gameStaging;
var unsatisfiedCustomersCount = 0;
var happyCustomersCount = 0;
var drinkIngredientCount = 0;
var time = 60;
var timer;
var hasGameStarted = false;
var displayDrinksOrder = [];
var clickIngredients;
var selectedIngredients = [];
var drinkName = [];
var drinkIngredients = [];
var randomDrinkOption;
var ingredientIndex = 0;

//Drink object
var drinkRecipe = [
    avoHoney = {
        name: 'Avocado Honey',
        recipe: ['avocado', 'honey', 'coconut', 'milk', 'ice-cream']
    },

    papaQueen = {
        name: 'Papaya Queen',
        recipe: ['papaya', 'banana', 'pineapple', 'milk', 'yogurt']
    },

    merryBerry = {
        name: 'Merry Berry',
        recipe: ['blueberry', 'strawberry', 'raspberry', 'banana', 'yogurt']
    },

    tropiBreez = {
        name: 'Tropical Breeze',
        recipe: ['apple', 'pineapple', 'passion-fruit', 'honey', 'soda']
    },

    melonMelon = {
        name: 'Melon Melon',
        recipe: ['watermelon', 'honeydew', 'ice-cream', 'lemon', 'milk']
    }
]

for(var i = 0; i < drinkRecipe.length; i++) {
    drinkName.push(drinkRecipe[i].name);
}

for(var i = 0; i < drinkRecipe.length; i++) {
    drinkIngredients.push(drinkRecipe[i].recipe);
}


//Functions
var removeIngredientClick = function(element) {
    idToRemove = document.getElementById(element);
    idToRemove.removeEventListener('click', selectIngredients);
}

var setTimer = function() {
    timer = setInterval(updateCountdown, 1000);
}

var clearTimer = function() {
    clearInterval(timer);
}

//Determines the outcome of the game based on the scoreboard's results.
var scoreboardWinner = function() {
    if(unsatisfiedCustomersCount === 3 || time === 0) {
        gameStaging.innerText = 'YOU HAVE LOST THE GAME.';
        clearTimer();
        //removeIngredientClick(selectedIngredients[i]);
    } else if (happyCustomersCount === 5 && time > 0) {
        gameStaging.innerText = 'WELL DONE, YOU HAVE ATTAINED A BLACK BELT IN FRUIT JUICE MAKING!';
        clearTimer();
        //removeIngredientClick(selectedIngredients[i]);
    } else {
        gameStaging.innerText = displayDrinksOrder;
    }
}

//Removes the strike through line once new random drink is generated.
var removeLine = function () {
    for(var i = 0; i < ingredientDisplay.length; i++) {
        ingredientDisplay[i].style.textDecoration = 'none';
    }
}

//Strike through of recipe ingredient once correct ingredient has been selected.
var strikeThrough = function() {
    for(var i = 0; i < selectedIngredients.length; i++){
        for(var j = 0; j < ingredientDisplay.length; j++) {
            if(selectedIngredients[i] === ingredientDisplay[j].innerText) {
                    ingredientDisplay[j].style.textDecoration = "line-through";
            }
        }
    }
}

//Countdown timer
var updateCountdown = function(){
    var seconds = time;
    countdownTimer.innerText = seconds;
    if(time <= 0) {
    countdownTimer.innerText = 'Time is up! You\'re not quite there yet.';
    countdownTimer.style.fontSize = '15px';
    }
  time--;
}

//Checks for match and whether player has won or lost the game based on the rules.
var checkForMatch = function() {
    var drinkOrder = gameStaging.innerText;

    switch(drinkOrder) {

        case drinkName[0]:
            randomDrinkOption = drinkIngredients[0];
            break;

        case drinkName[1]:
            randomDrinkOption = drinkIngredients[1];
            break;

        case drinkName[2]:
            randomDrinkOption = drinkIngredients[2];
            break;

        case drinkName[3]:
            randomDrinkOption = drinkIngredients[3];
            break;

        case drinkName[4]:
            randomDrinkOption = drinkIngredients[4];
            break;

        default:
            gameStaging.innerText = 'Sorry this drink is currently unavailable';
    }

       for(var i = 0; i < selectedIngredients.length; i++) {
        if(randomDrinkOption.includes(selectedIngredients[i])) {
            removeIngredientClick(selectedIngredients[i]);
            drinkIngredientCount++;

            if((drinkIngredientCount/3) === 5) {
                selectedIngredients = [];
                drinkIngredientCount = 0;
                happyCustomersCount++;
                happyCustomers.innerText = happyCustomersCount.toString();
                removeLine();
                randomGenerate();
            }

        } else if (selectedIngredients.length >= 5) {
            selectedIngredients = [];
            drinkIngredientCount = 0;
            unsatisfiedCustomersCount++;
            unsatisfiedCustomers.innerText = unsatisfiedCustomersCount.toString();
            removeLine();
            randomGenerate();
        } else {
            removeIngredientClick(selectedIngredients[i]);
        }
      }
    strikeThrough();
    scoreboardWinner();
}




//Created empty array to store selected ingredients using ingredients' id.
var selectIngredients = function(event) {
    var ingredientsId = event.target.id;
    selectedIngredients.push(ingredientsId);
    instructions.innerText = '';
    checkForMatch();
}

//Function that randomly generates a drink order
var generateDrinkOrder = function(array) {

    var drinkIndex = Math.floor(Math.random() * 5);
    array[drinkIndex];
    displayDrinksOrder = array[drinkIndex].name;
    gameStaging.innerText = displayDrinksOrder;
    gameStaging.style.fontSize = '25px';
    gameStaging.style.cursor = 'pointer';
    recipeDisplay.innerText = displayDrinksOrder;

//Displays recipe of random drink at container 4.
    for(var i = 0; i < drinkRecipe.length; i++) {
        if(displayDrinksOrder === drinkRecipe[i].name) {
            ingredientDisplay[0].innerText = drinkRecipe[i].recipe[0];
            ingredientDisplay[1].innerText = drinkRecipe[i].recipe[1];
            ingredientDisplay[2].innerText = drinkRecipe[i].recipe[2];
            ingredientDisplay[3].innerText = drinkRecipe[i].recipe[3];
            ingredientDisplay[4].innerText = drinkRecipe[i].recipe[4];

            ingredientDisplay[0].style.fontSize = '30px';
            ingredientDisplay[1].style.fontSize = '30px';
            ingredientDisplay[2].style.fontSize = '30px';
            ingredientDisplay[3].style.fontSize = '30px';
            ingredientDisplay[4].style.fontSize = '30px';
        }
    }
//Add click event listeners to all ingredients
clickIngredients = document.querySelectorAll('.ingredients');
    for(var i = 0; i < clickIngredients.length; i++) {
        clickIngredients[i].addEventListener('click', selectIngredients)
    }
}

var randomGenerate = function() {
    generateDrinkOrder(drinkRecipe);
    if(!hasGameStarted) {
        hasGameStarted = true;
        setTimer();
    }
}

//Game layout orientation and lead-up to start of the game.
var beginGame = function(event) {
    instructions.innerText = '';
    recipe.style.visibility = 'visible';
    ingredients.style.visibility = 'visible';
    document.querySelector('.container-1').style.height = '300px';
    //gameStaging.innerText = '';
    randomGenerate();
}

//Callback function that brings to player the instructions and next step that will see the game being launched.
var startGame = function(event) {
    var beginGameStep = document.createElement('p');
    beginGameStep.textContent = 'Click here to begin';
    beginGameStep.style.fontSize = '25px';
    gameStaging = document.querySelector('.game-staging');
    gameStaging.appendChild(beginGameStep);
    event.target.innerText = "Welcome to Fruit Express! Based on the random order displayed, click on the ingredients from the ingredients list to concoct the drink. Whichever ingredient you click will go straight into the blender and ultimately be consumed by the customer. You gain a happy customer for every successful cup of juice prepared and 1 unsatisfied customer for every wrong order prepared. Failure to complete 5 successful drinks will result in a loss. You also lose the game if you hit 3 unsatisfied customers. Good luck!";

    gameStaging.addEventListener('click', beginGame);
    document.querySelector('.container-1').style.height = '300px';
    instructions.style.fontSize = '16px';
}

//EVENT LISTENERS
instructions.addEventListener('click', startGame);
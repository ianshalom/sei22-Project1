console.log("HELLO LET'S MAKE SOME FRUIT JUICE!");


//Variables
var instructions = document.querySelector('.instructions');
var recipe = document.querySelector('.container-3');
recipe.style.visibility = 'hidden';
var ingredients = document.querySelector('.container-2');
ingredients.style.visibility = 'hidden';
var clickText;
var gameStaging;
var roundInSession = false;
var ingredientsMatch = 0;
var unsatisfiedCustomer = document.getElementById('unsatisfied-customer');
var unsatisfiedCustomerCount = 0;
var happyCustomers = document.getElementById('happy-customers');
var happyCustomersCount = 0;






//Game Variables
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


var displayDrinksOrder = [];
var clickIngredients;
var selectedIngredients = [];
var drinkName = [];
var drinkIngredients = [];
var randomDrinkOption;




for(var i = 0; i < drinkRecipe.length; i++) {
    drinkName.push(drinkRecipe[i].name);
}

for(var i = 0; i < drinkRecipe.length; i++) {
    drinkIngredients.push(drinkRecipe[i].recipe);
}

/*
if(randomDrinkOption === selectedIngredients) {
        gameStaging.innerText = 'WELL DONE!';
    } else {
        gameStaging.innerText = 'YOU HAVE TO DO BETTER!';
    }
    */


var checkForMatch = function() {

    var drinkOrder = gameStaging.innerText;
        console.log(drinkOrder + " LATEST DRINK ORDER!");

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





    if(randomDrinkOption[0] === selectedIngredients[0] && randomDrinkOption[1] === selectedIngredients[1] && randomDrinkOption[2] === selectedIngredients[2] && randomDrinkOption[3] === selectedIngredients[3] && randomDrinkOption[4] === selectedIngredients[4]) {
        gameStaging.innerText = 'WELL DONE!';
        selectedIngredients = [];
        happyCustomersCount++;
        happyCustomers.innerText = happyCustomersCount.toString();
        gameStaging.addEventListener('click', randomGenerate);





    } else if (selectedIngredients.length >= 5) {
        gameStaging.innerText = 'Wrong Order! Click to continue on to next order.';
        unsatisfiedCustomerCount++;
        unsatisfiedCustomer.innerText = unsatisfiedCustomerCount.toString();
        selectedIngredients = [];
        gameStaging.addEventListener('click', randomGenerate);
    }


/*
    console.log(selectedIngredients.length);
    if(ingredientsMatch > 10) {
        gameStaging.innerText = 'NICE JOB!';
    } else if (selectedIngredients.length >= 5) {
        gameStaging.innerText = 'WRONG ORDER!';
    }
*/

}





var selectIngredients = function(event) {

    var ingredientsId = event.target.id;
    selectedIngredients.push(ingredientsId);



    instructions.innerText = '';
    checkForMatch();
}


var generateDrinkOrder = function(array) {

        var drinkIndex = Math.floor(Math.random() * 5);
            array[drinkIndex];
            displayDrinksOrder = array[drinkIndex].name;
            console.log(displayDrinksOrder);
            gameStaging.innerText = '';
            gameStaging.innerText = displayDrinksOrder;

        //Add click event listeners to all ingredients
            clickIngredients = document.querySelectorAll('.ingredients');


        for(var i = 0; i < clickIngredients.length; i++) {
            clickIngredients[i].addEventListener('click', selectIngredients)
        }


}




var randomGenerate = function(event) {
    console.log("Let's randomly generate you some orders!");

        generateDrinkOrder(drinkRecipe);
    }



//Game layout orientation and lead-up to start of the game.
var beginGame = function(event) {
    console.log("LETS START THIS SHIT!");

    event.target.innerText = "Here's a simple orientation of the game layout. This box will flash your orders as well as display your scoreboard as the game goes along. The ingredients list is to your right and you will need to refer to the recipe below this box to know which ingredients to select.";
    instructions.innerText = '';

    event.target.style.fontSize = '25px';
    recipe.style.visibility = 'visible';
    ingredients.style.visibility = 'visible';
    document.querySelector('.container-1').style.height = '300px';
    var startGame = document.createElement('p');
    startGame.textContent = 'Click here to start and get your first set of orders!';
    //var startRandomGenerator = document.querySelector('.random-generator');
    gameStaging.innerText = '';
    gameStaging.appendChild(startGame);
    gameStaging.addEventListener('click', randomGenerate)

}

//Callback function that brings to player the instructions and next step that will see the game being launched.
var startGame = function(event) {

    var beginGameStep = document.createElement('p');
    beginGameStep.textContent = 'Click here to proceed';
    gameStaging = document.querySelector('.game-staging');
    gameStaging.appendChild(beginGameStep);
    gameStaging.addEventListener('click', beginGame);

    event.target.innerText = "Welcome to Fruits are King! The objective of this game is simple - keep your customers happy . \n\n  Based on the random order shown, click on the ingredients from the ingredients list to concoct the drink. Whichever ingredient you click will go straight into the blender and ultimately be consumed by the customer. Any wrong concoction will result in an unsatisfied customer and will see your unsatisfied customer count go up. You gain a commendation for every 5 successful cups of juice prepared and 1 unsatisfied customer for every wrong order prepared. You lose the game once you have 5 unsatisfied customers. Good luck!";

    document.querySelector('.container-1').style.height = '300px';
    //document.querySelector('.container-1').style.padding = '0';
    instructions.style.fontSize = '16px';

}







//EVENT LISTENERS
instructions.addEventListener('click', startGame);
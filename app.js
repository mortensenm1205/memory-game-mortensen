document.addEventListener('DOMContentLoaded', () => {

    // List of Card Options
    // You do want the list of card options to have a matching pair so that the game can actually be won 
    const cardArray = [
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        }
    ]

    // This now makes the game replayable
    // cardArray.sort(() => 0.5 - Math.random());

    // First selecting our class grid element
    const grid = document.querySelector('.grid');
    // Selecting the span element to then display the amount of matches to the user
    const results = document.getElementById('result');
    // Having two seperate arrays allows for better maniuplation
    // This an array for the current cards selected. But only has name values and doesn't go beyond 2 items.
    var cardsChosen = [];
    // Same as above but this time only id values. Still can't go beyond 2 items.
    var cardsChosenId = [];
    // This array will be used to display the results to the user as the play, and will help determine when the game is won
    var cardsWon = [];

    // Next, create your board
    function createBoard() {
        for(let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img');
            // 'blank.png' is the card flipped faced down
            card.setAttribute('src', 'images/blank.png');
            // 'data-id' is a custom attribute which setAtt() allows
            card.setAttribute('data-id', i);
            // This event listener is waiting for the user to click a card. 
            // Flipcard funciton will then run
            card.addEventListener('click', flipCard);
            // This will take 'card' and add it to the grid element above.
            grid.appendChild(card);
        }
    }

    // Flipping the Card
    function flipCard() {
        // Can use 'this' becuase our parent object will end being 'card' above. 
        // So the 'this' is refferring to 'card'.
        var cardId = this.getAttribute('data-id');
        // Currently only adding the name value to the cardsChosen array
        cardsChosen.push(cardArray[cardId].name);
        // And only adding the id value to the cardsChosenId array
        cardsChosenId.push(cardId);
        // This is what the user will see
        this.setAttribute('src', cardArray[cardId].img);
        // Now going to check to see if cardsChosen/Id items match with checkForMatch Function
        // But funciton will only run if cardsChosen length is no more than 2
        if (cardsChosen.length === 2) {
            // Using setTimeout so that it can give the user some time to prepare for the answer
            setTimeout(checkForMatch, 500)
        }
    }

    // Checking the user's selected cards to see if they match
    function checkForMatch() {
        // First we have to select all the cards 
        var cards = document.querySelectorAll('img');
        // At this point we can assume that there are only 2 items in both cardsChosen and cardsChosenId arrays 
        // So we can chose a fixed array value and set it to these variables 
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        // Here is the actual test to see if the cards chosen are matching 
        // Its just camparing the name values
        if (cardsChosen[0] === cardsChosen[1]) {
            // If the cards match, we want to show the user visually that they found the match and the cards can now be removed
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            // This removes the flipCard function from the 'card' element since it's now a match
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            // Also we need to alert the user that they found a match
            alert('You found a match');
            // Adding this to our cardsWon array to use later
            cardsWon.push(cardsChosen);
            console.log(cardsWon);
        } else {
            // If the user guesses wrong we need to visually indicate a 'flip' back to it's original postion
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            // Then again alert the user
            alert('Sorry, try again');
        }
        // Either way we need to continue the game for the next guess of matches
        // So we need to reset both card chosen arrays to empty
        cardsChosen = [];
        cardsChosenId = [];
        resultsDisplay();
    }

    function resultsDisplay() {
        // As the player is playing we need to display the score of matches they have
        // This is where our cardsWon array is used
        results.textContent = cardsWon.length;
        // This condition will then run to determine if the game is won or not
        // Since all listed cards will have a pair, you only need half of the total cards list 
        if (cardsWon.length === cardArray.length/2) {
            results.textContent = 'Congrats! You won!';
        }
    }




    // Running the game
    createBoard();
})


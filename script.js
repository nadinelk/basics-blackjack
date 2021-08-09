var HIT = "hit";
var STAND = "stand";

var deck = [];

// create an array to store players' cards
var playerCard = [];
var dealerCard = [];

// create an empty var to hold players' cards sum
var playerCardSum = 0;
var dealerCardSum = 0;

// create a function to create deck of cards.
var createDeck = function () {
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var rank = rankCounter;

      if (rankCounter == 1) {
        cardName = "ace";
        rank = 11;
      } else if (rankCounter == 11) {
        cardName = "jack";
        rank = 10;
      } else if (rankCounter == 12) {
        cardName = "queen";
        rank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        rank = 10;
      }

      var card = {
        name: cardName,
        suit: currSuit,
        rank: rank,
      };

      deck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// shuffle the deck
var shuffleDeck = function () {
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    var randomIndex = getRandomIndex(deck.length);

    var randomCard = deck[randomIndex];

    var currentCard = deck[currentIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }
  return deck;
};

// create a function to deal cards.
var dealCards = function (deck) {
  playerChosenCard = deck.pop();
  dealerChosenCard = deck.pop();

  // add the top card to the respective array
  playerCard.push(playerChosenCard);
  console.log(playerChosenCard);

  dealerCard.push(dealerChosenCard);
  console.log(dealerChosenCard);
};

var getWinningMsg = function (playerCardSum, dealerCardSum) {
  if (playerCardSum == 21) {
    return "Congrats, you got a blackjack! You win!";
  }
  if (playerCardSum > dealerCardSum) {
    return (
      "Player, you won against computer with the scores of " +
      playerCardSum +
      " to " +
      dealerCardSum
    );
  }
  if (dealerCardSum > 21) {
    return "Dealer busted! Congrats, you won!";
  }
};

var getLosingMsg = function (playerCardSum, dealerCardSum) {
  if (dealerCardSum == 21) {
    return "Dealer got a blackjack! Unfortunately, you lose :(";
  }
  if (dealerCardSum > playerCardSum) {
    return (
      "Player, you lost against computer with the scores of " +
      playerCardSum +
      " to " +
      dealerCardSum +
      ". <br> Such a shame."
    );
  }
  if (playerCardSum > 21) {
    return "Whoops, you busted!";
  }
};

var main = function (input) {
  var cardDeck = createDeck();

  var shuffledDeck = shuffleDeck(cardDeck);

  // deal the cards two times
  var numOfDeals = 0;
  while (numOfDeals < 2) {
    dealCards(shuffledDeck);
    numOfDeals += 1;
  }

  // list players' cards
  var outputOfPlayersCards =
    "Your cards are " +
    playerCard[0].name +
    " of " +
    playerCard[0].suit +
    " and " +
    playerCard[1].name +
    " of " +
    playerCard[1].suit;

  // show dealer second card
  var outputOfDealersCards =
    "Dealer's second card is " +
    dealerCard[1].name +
    " of " +
    dealerCard[1].suit +
    ".";

  // create default output value.
  var myOutputValue =
    outputOfPlayersCards +
    ". <br> Computer's card is " +
    dealerCard[0].name +
    " of " +
    dealerCard[0].suit;

  // update value of player card sum and dealer card sum
  playerCardSum = playerCard[0].rank + playerCard[1].rank;
  console.log("player card sum is " + playerCardSum);

  dealerCardSum = dealerCard[0].rank + dealerCard[1].rank;
  console.log("dealer card sum is " + dealerCardSum);

  // store the winning and losing message
  var winningMsg = getWinningMsg(playerCardSum, dealerCardSum);
  var losingMsg = getLosingMsg(playerCardSum, dealerCardSum);

  // check if player card totals to 21
  // if playerCardSum == 21, player wins. Else, player choose 'hit' or 'stand'
  if (playerCardSum == 21) {
    myOutputValue = outputOfPlayersCards + " <br> " + winningMsg;
  } else {
    myOutputValue =
      myOutputValue + ". <br> Please choose between hit or stand.";
  }

  // if player choose 'stand', open dealer's closed card.
  if (input == STAND) {
    if (dealerCardSum >= 17) {
      // check winning condition
      if (dealerCardSum == 21) {
        return outputOfDealersCards + " <br> " + losingMsg + ".";
      } else if (dealerCardSum > 21) {
        return outputOfDealersCards + " <br> " + winningMsg;
      } else {
        if (playerCardSum > dealerCardSum) {
          return outputOfDealersCards + " <br> " + winningMsg + ".";
        }
        if (dealerCardSum > playerCardSum) {
          return outputOfDealersCards + " <br> " + losingMsg + ".";
        }
      }
    }
    // if dealer card sum is <= 16, dealer draw
    if (dealerCardSum <= 16) {
      dealCards(shuffledDeck);

      dealerCardSum = dealerCardSum + dealerCard[2].rank;

      winningMsg = getWinningMsg(playerCardSum, dealerCardSum);
      losingMsg = getLosingMsg(playerCardSum, dealerCardSum);

      outputOfDealersCards =
        outputOfDealersCards +
        " <br> Dealer just draw a " +
        dealerCard[2].name +
        " of " +
        dealerCard[2].suit;

      // check winning condition
      if (dealerCardSum == 21) {
        return outputOfDealersCards + ". <br> " + losingMsg + "";
      } else if (dealerCardSum > 21) {
        return outputOfDealersCards + ". <br> " + winningMsg + ".";
      } else if (playerCardSum == dealerCardSum) {
        return "It's a tie!";
      } else {
        if (playerCardSum > dealerCardSum) {
          return outputOfDealersCards + ". <br> " + winningMsg + ".";
        }
        if (dealerCardSum > playerCardSum) {
          return outputOfDealersCards + ". <br> " + losingMsg + ".";
        }
      }
    }
  }

  // if player choose 'hit', deal another card.
  if (input == HIT) {
    dealCards(shuffledDeck);

    // update player card sums
    playerCardSum = playerCardSum + playerCard[2].rank;
    console.log(playerCardSum);

    // if player card sum > 21 and player card 2 rank is 11, change the rank to 1
    if (playerCardSum > 21 && playerCard[2].rank == 11) {
      playerCard[2].rank = 1;
      playerCardSum =
        playerCard[0].rank + playerCard[1].rank + playerCard[2].rank;
    }

    // update winning message and losing message
    winningMsg = getWinningMsg(playerCardSum, dealerCardSum);
    losingMsg = getLosingMsg(playerCardSum, dealerCardSum);

    myOutputValue =
      "Player, you just draw a " +
      playerCard[2].name +
      " of " +
      playerCard[2].suit +
      ".";

    outputOfPlayersCards =
      myOutputValue +
      " <br> " +
      outputOfPlayersCards +
      ", and " +
      playerCard[2].name +
      " of " +
      playerCard[2].suit +
      ".";

    // check winning condition
    if (dealerCardSum <= 16) {
      dealCards(shuffledDeck);

      dealerCardSum = dealerCardSum + dealerCard[2].rank;
      console.log(dealerCardSum);

      winningMsg = getWinningMsg(playerCardSum, dealerCardSum);
      losingMsg = getLosingMsg(playerCardSum, dealerCardSum);

      outputOfDealersCards =
        outputOfDealersCards +
        " <br> Dealer just draw a " +
        dealerCard[2].name +
        " of " +
        dealerCard[2].suit;

      if (playerCardSum == 21) {
        return myOutputValue + " <br> " + winningMsg;
      }
      if (playerCardSum > 21) {
        return outputOfPlayersCards + "<br> " + losingMsg;
      }
      if (playerCardSum == dealerCardSum) {
        return "It's a tie!";
      }
      if (dealerCardSum == 21) {
        return outputOfDealersCards + ". <br> " + losingMsg;
      } else if (playerCardSum == dealerCardSum) {
        return "It's a tie!";
      }
      if (dealerCardSum > 21) {
        return (
          myOutputValue +
          " <br> " +
          outputOfDealersCards +
          ". <br> " +
          winningMsg +
          "."
        );
      } else {
        if (playerCardSum > dealerCardSum) {
          return (
            outputOfPlayersCards +
            " <br> " +
            outputOfDealersCards +
            ". <br> " +
            winningMsg +
            "."
          );
        }
        if (dealerCardSum > playerCardSum) {
          return (
            outputOfPlayersCards +
            " <br> " +
            outputOfDealersCards +
            ". <br> " +
            losingMsg +
            "."
          );
        }
      }
    }
    if (dealerCardSum >= 17) {
      if (playerCardSum == 21) {
        return myOutputValue + " <br> " + winningMsg;
      }
      if (playerCardSum > 21) {
        return outputOfPlayersCards + "<br> " + losingMsg;
      }
      if (playerCardSum == dealerCardSum) {
        return "It's a tie!";
      }
      if (playerCardSum < 21) {
        console.log(playerCardSum);
        if (playerCardSum > dealerCardSum) {
          return outputOfPlayersCards + "<br>" + winningMsg + ".";
        }
        if (playerCardSum < dealerCardSum) {
          return outputOfPlayersCards + " <br> " + losingMsg + ".";
        }
      }
    }
  }
  return myOutputValue;
};

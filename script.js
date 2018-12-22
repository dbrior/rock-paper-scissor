function computerPlay() {
    var num = Math.random() * 3;
    var move;
    if(num < 1){
        move = "Rock";
    } else if(num < 2){
        move = "Paper";
    } else if(num < 3){
        move = "Scissors";
    }
    return(move);
}

function playRound(computerSelection, playerSelection){
    var comp = computerSelection.toLowerCase();
    var person = playerSelection.toLowerCase();
    var result;
    
    if(person === "rock"){
        if(comp === "rock"){
            result = -1;
        } else if(comp === "paper"){
            result = 0;
        } else if(comp === "scissors"){
            result = 1;
        }
    } else if(person === "paper"){
        if(comp === "rock"){
            result = 1;
        } else if(comp === "paper"){
            result = -1;
        } else if(comp === "scissors"){
            result = 0;
        }
    } else if(person === "scissors" || person === "scissor"){
        if(comp === "rock"){
            result = 0;
        } else if(comp === "paper"){
            result = 1;
        } else if(comp === "scissors"){
            result = -1;
        }
    } else {
        result = null;
    }
    
    
    if(result == 1){
        retVal = "You Win! " + playerSelection + " beats " + computerSelection.toLowerCase() + ".";
    } else if(result == 0){
        retVal = "You Lose! " + computerSelection.toLowerCase() + " beats " + playerSelection + ".";
    } else if(result == -1){
        retVal = "Tie! " + playerSelection + " and " + computerSelection.toLowerCase() + ".";
    }
            
    console.log(retVal);
    console.log("\n");
    return result;
}

function game(){
    var playerScore = 0;
    var computerScore = 0;
    var round = 1;
    var retVal;

    while(round <= 5){
        console.log("Round: " + String(round) + "\n" + "    Player Score: " + String(playerScore) + " Computer Score: " + String(computerScore));
        var playerInput = prompt("What is your move?");
        var computerInput = computerPlay();
        var result = playRound(computerInput,playerInput);

        while(result == null){
            playerInput = prompt("Invalid move, please try again. (Rock,Paper,Scissors)");
            result = playRound(computerInput,playerInput);
        }

        if(result == 1){
            playerScore += 1;
        } else if(result == 0){
            computerScore += 1;
        }
        
        round += 1;
    }



    if(playerScore > computerScore){
        console.log("Game complete. Congratulations, you win!");
    } else if(playerScore < computerScore){
        console.log("Game complete. Sorry, you lose.");
    } else {
        console.log("Game complete. Tie Game!");
    }
}

game();
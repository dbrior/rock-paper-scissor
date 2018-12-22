var computerScore, playerScore;
var over;
setup();

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

    if(!over){
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
            playerScore += 1;
        } else if(result == 0){
            retVal = "You Lose! " + computerSelection.toLowerCase() + " beats " + playerSelection + ".";
            computerScore += 1;
        } else if(result == -1){
            retVal = "Tie! " + playerSelection + " and " + computerSelection.toLowerCase() + ".";
        }

        document.getElementById("output").textContent = retVal;      
        console.log(retVal);
        console.log("\n");

        document.getElementById("player-score").textContent = playerScore;
        document.getElementById("computer-score").textContent = computerScore;
        game();
        if(!over){
            window.setTimeout(resetOutput,2000);
        }
    }
    window.setTimeout(game,2000);
    
}

function resetOutput(){
    document.getElementById("output").textContent = "Rock, Paper, or Scissors?";
}

function setOutput(input){
    document.getElementById("output").textContent = input;
}

function game(){
    if(!(playerScore < 5 && computerScore < 5)){
        over = true;
        if(playerScore > computerScore){
            setOutput("Game complete. Congratulations, you win!");
        } else if(playerScore < computerScore){
            setOutput("Game complete. Sorry, you lose.");
        } else {
            setOutput("Game complete. Tie Game!");
        }
    }
}

function reset(){
    playerScore = 0;
    computerScore = 0;
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
    resetOutput();
    over = false;
}

function setup(){
    over = false;
    playerScore = 0;
    computerScore = 0;
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
    resetOutput();
    var buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        if(button.id !== 'reset'){
            button.addEventListener('click', () => {
                game();
                if(!over){
                    var computerMove = computerPlay();
                    playRound(computerMove,button.id);
                }
            })
        }
    });
}


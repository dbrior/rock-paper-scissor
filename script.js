var computerScore, playerScore;
var over;
var change;
var record = [];
var totalGames = 0;
var specificWins = {
    "Rock": 0,
    "Paper": 0,
    "Scissors": 0
}
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

function playRound(computerSelection, playerSelection) {

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
            retVal = "You Lose! " + computerSelection + " beats " + playerSelection.toLowerCase() + ".";
            computerScore += 1;
        } else if(result == -1){
            retVal = "Tie! " + playerSelection + " and " + computerSelection.toLowerCase() + ".";
        }

        updateRecord(playerSelection,computerSelection,result);

        document.getElementById("output").textContent = retVal;      
        console.log(retVal);
        console.log("\n");

        document.getElementById("player-score").textContent = playerScore;
        document.getElementById("computer-score").textContent = computerScore;

        document.getElementById("rock-wins").textContent = specificWins["Rock"];
        document.getElementById("paper-wins").textContent = specificWins["Paper"];
        document.getElementById("scissors-wins").textContent = specificWins["Scissors"];

        game();
        if(!over){
            change = window.setTimeout(resetOutput,2000);
        }
    }
    window.setTimeout(game,2000);
    
}

function resetOutput() {
    document.getElementById("output").textContent = "Rock, Paper, or Scissors?";
}

function setOutput(input) {
    document.getElementById("output").textContent = input;
}

function game() {
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
    if(over){
        var choiceButtons = document.getElementsByClassName("choice-button");
        for(var i=0;i<choiceButtons.length;i++){
            var button = choiceButtons[i];
            button.disabled = true;
        }
    }
}

function reset() {
    console.log(record);
    playerScore = 0;
    computerScore = 0;
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
    var choiceButtons = document.getElementsByClassName("choice-button");
        for(var i=0;i<choiceButtons.length;i++){
            var button = choiceButtons[i];
            button.disabled = false;
        }
    resetOutput();
    over = false;
}

function setup() {
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
                clearTimeout(change);
                game();
                if(!over){
                    var computerMove = computerPlay();
                    playRound(computerMove,button.id);
                }
            })
        }
    });
}

function updateRecord(playerSelection,computerSelection,result) {
    var table = document.getElementById("games");
    var row = document.createElement("tr");

    var outcome;
    switch(result) {
        case 1:
            outcome = "Win";
            break;
        case 0:
            outcome = "Loss";
            break;
        case -1:
            outcome = "Tie";
            break;
    }
    var outcomeElem = document.createElement("td");
    outcomeElem.appendChild(document.createTextNode(outcome));
    row.appendChild(outcomeElem);

    var playerElem = document.createElement("td");
    playerElem.appendChild(document.createTextNode(playerSelection));
    row.appendChild(playerElem);

    var computerElem = document.createElement("td");
    computerElem.appendChild(document.createTextNode(computerSelection));
    row.appendChild(computerElem);

    table.appendChild(row);


    if(result == 1){
        specificWins[playerSelection] += 1;
    }
}



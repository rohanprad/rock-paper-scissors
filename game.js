/*---------------------Game Variables and Objects--------------------- */

let roundIsLive = true;
let roundCount = 1;

const player = {
    selection: "none",
    score: 0
}

const computer = {
    selection: "none",
    score: 0
}

/*-------------------------------------------------------------------- */

/*---------------------HTML Elements--------------------- */

const optionDivs = document.querySelectorAll('.option');
const displayDiv = document.querySelector('.display');
const nextButton = document.querySelector('.next');
const resetButton = document.querySelector('.reset');
const displayRound = document.querySelector('h2');

/*------------------------------------------------------- */


/*---------------------Event Listeners--------------------- */

nextButton.addEventListener('click', handleNextRound);

resetButton.addEventListener('click', handleReset);

for(const optionDiv of optionDivs)
{
    optionDiv.addEventListener('click', ()=>{
        if(roundIsLive == false){
            return;
        }
        optionDiv.classList.add('selected');
        computer.selection = generateComputerSelection();
        player.selection = optionDiv.classList[1];
        let check = checkWinner(player.selection, computer.selection);
        displayResult(check);
        
    });
}

/*------------------------------------------------------- */

/*-----------------------Functions----------------------- */

function generateComputerSelection()
{
    let x = Math.floor(Math.random()*3)+1;
    if(x === 1){
        return "rock";
    }else if(x === 2){
        return "paper";
    }else if(x === 3){
        return "scissors";
    }

}

function checkWinner(playerSelection, computerSelection){
    if(playerSelection == "rock" && computerSelection == "paper"){
        computer.score++;
        return "You Lose! Paper beats Rock";
    }else if(playerSelection == "rock" && computerSelection == "scissors"){
        player.score++;
        return "You Win! Rock beats Scissors";
    }else if(playerSelection == "paper" && computerSelection == "rock"){
        player.score++;
        return "You Win! Paper beats Rock";
    }else if(playerSelection == "paper" && computerSelection == "scissors"){
        computer.score++;
        return "You Lose! Scissors beats Paper";
    }else if(playerSelection == "scissors" && computerSelection == "rock"){
        computer.score++;
        return "You Lose! Rock beats Scissors";
    }else if(playerSelection == "scissors" && computerSelection == "paper"){
        player.score++;
        return "You Win! Scissors beats Paper";
    }else{
        return "It's a tie";
    }
}

function displayResult(check){
    displayDiv.innerHTML = `  Your Choice: ${player.selection.toUpperCase()} <br>
    Computer's Choice: ${computer.selection.toUpperCase()} <br>
    ${check} <br>
    Your Score: ${player.score} <br>
    Computer's Score: ${computer.score} <br>`;
    roundIsLive = false;

}

function displayWinner(){
    if(player.score > computer.score){
        displayDiv.innerHTML = `GAME COMPLETE! YOU WIN!<br>YOUR SCORE: ${player.score}<br>COMPUTER'S SCORE: ${computer.score}`;
    }else if(player.score < computer.score){
        displayDiv.innerHTML = `GAME OVER! YOU LOSE!<br>YOUR SCORE: ${player.score}<br>COMPUTER'S SCORE: ${computer.score}`;
    }else{
        displayDiv.innerHTML = `IT'S A TIE! <br>YOUR SCORE: ${player.score}<br>COMPUTER'S SCORE: ${computer.score}`;
    }
}

/*--------------------------------------------------------------------- */

/*---------------------------Event Handlers---------------------------- */

function handleNextRound(){
    for(const optionDiv of optionDivs){
        optionDiv.classList.remove('selected');
    }
    if(roundCount === 5){
        displayWinner();
        return;
    }
    roundCount++;
    displayRound.innerHTML = `Round ${roundCount} of 5`;
    roundIsLive = true;
    displayDiv.innerHTML = `  Your Choice: NONE <br>
    Computer's Choice: NONE <br>
    Your Score: ${player.score} <br>
    Computer's Score: ${computer.score} <br>`;
}

function handleReset(){
    for(const optionDiv of optionDivs){
        optionDiv.classList.remove('selected');
    }
    roundCount = 1;
    player.score = computer.score = 0;
    player.selection = computer.selection = "NONE";
    roundIsLive = true;
    displayRound.innerHTML = `Round ${roundCount} of 5`;
    roundIsLive = true;
    displayDiv.innerHTML = `  Your Choice: NONE <br>
    Computer's Choice: NONE <br>
    Your Score: ${player.score} <br>
    Computer's Score: ${computer.score} <br>`;
}

/*---------------------------------------------------------------------- */


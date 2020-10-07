console.log("It is working");

class TicTacToe{
    constructor(userA, userB){
        this.userA=userA;
        this.userB=userB;
        this.scoreA=scoreA;
        this.scoreB=scoreB;
        
    }



}

const allParts=[1,2,3,4,5,6,7,8,9]
//Find all the Button elements from UI
const startBtn = document.querySelector("#startBtn")
const playAgain = document.querySelector("#playAgain")


//Find all score elements from UI
let scoreAField=document.querySelector('.score1');
let scoreBField=document.querySelector('.score2');


//Find all the box to use as button
const allBox=document.querySelectorAll('.sq');

//Find all the users 
const firstUser = document.querySelector('#selectUser1');
const secondUser = document.querySelector('#selectUser2');



//Added this button to start the game, this will set the starting score
//as zero for both user
startBtn.addEventListener('click',(e) => {
    scoreAField.textContent=0;
    scoreBField.textContent=0;
})



//This button will update the socre with the previous score and
//clear the board
playAgain.addEventListener('click',(e) => {
    console.log(startBtn);
    console.log(playAgain);
})






// This loop has all the box and added in eventListener to work
//like a button and change the sing on each box
allBox.forEach(boxButton =>{
    boxButton.addEventListener('click', (e) =>{
        boxButton.innerHTML='&#x2715;';
    })
})
console.log("It is working");
//Creating a global variable to cound the click and change the user;
//let numberOfClick=0;
class TicTacToe{
    constructor(userA, userB){
        this.userA=userA;
        this.userB=userB;
        this.numberOfClick=0;
        this.scoreA=0;
        this.scoreB=0;
        this.scoreT=0;
        //This will help to control for not clicking the button more than one
        this.check=[];
        this.addAClick=[];
        this.addBClick=[];
        this.winningConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    }
    playerTurn(){
        if(this.numberOfClick%2==0){
            return false;
        }else{
            return true;
        }
    }
    //This function will control all the click in the box,
    //Changing the value on each box
    controlButton(){
        allBox.forEach((boxButton, index) =>{
            boxButton.addEventListener('click', (e) =>{
                //adding this condision for disable the button after clicking one
                if(this.check.includes(index)){
                }else{
                    this.check.push(index);
                    //This condision is used to change the player who will click on it
                    if(ticTacToe.playerTurn()){
                        this.addBClick.push(index);
                        //This following code is for O sign
                        boxButton.innerHTML='&#79;';
                        this.settingPlayerTurnBoxValue("X Turn",'#000000')
                    }else{
                        this.addAClick.push(index);
                       //This following code is for  ✕ sing
                        boxButton.innerHTML='&#x2715;';
                        this.settingPlayerTurnBoxValue("O Turn",'#0602f5');
                    }
                    this.numberOfClick++;
                    //console.log(this.addAClick, this.addBClick);
                   this.findTheWinner(); 
                }
            })
            
        })
         
    }//Set different backgroun when user Turn change
    settingPlayerTurnBoxValue(textValue,color){
        whosTurn.innerHTML=textValue;
        whosTurn.style.background=color;
    }


    //This method will itterate all the winning codition by using for loop
    //and there are two arrays named addAClick and addBClick generated based on the user clicked
    // Then use the if else condition to find what are the index value addAClick or addBClick array has 
    //and compare with the winning condition array to find the winner. 
    findTheWinner(){
      for(let i=0; i<this.winningConditions.length; i++){
        let ep=this.winningConditions[i];
         if(this.addAClick.includes(ep[0]) && this.addAClick.includes(ep[1]) && this.addAClick.includes(ep[2])){
    

            this.scoreA+=1;
            this.settingPlayerTurnBoxValue("X WINNER!",'#008000');
            scoreAField.textContent=' '+this.scoreA;
            //This will play the sound for winner
            winner.play();
            //This method will disable to button from clicking when we will find the winner
            this.stopTheGameWhenWeFoundWinner();
         }
         if(this.addBClick.includes(ep[0]) && this.addBClick.includes(ep[1]) && this.addBClick.includes(ep[2])){
             console.log("trying to get the value");
            this.scoreB+=1;
            console.log("WINNER B");
            this.settingPlayerTurnBoxValue("O WINNER!!",'#008000')
            scoreBField.textContent=' '+this.scoreB;
            winner.play();
            this.stopTheGameWhenWeFoundWinner();
        }
      }
        if(this.check.length===9){
            this.scoreT+=1;
            console.log("The Game is Draw");
            draw.play();
            this.settingPlayerTurnBoxValue("XO DRAW",'#FF0000')
            socreTieField.textContent=' '+this.scoreT;

        }
    }
    //This method will set all the index in the check array that we have used to protect each of the box from double click
    stopTheGameWhenWeFoundWinner(){
        for(let i=0; i<=8; i++){
            this.check.push(i);
        }
    }
    restartTheGame(){
        this.scoreA=0;
        this.scoreB=0;
        this.scoreT=0;
        scoreAField.innerHTML=0;
        scoreBField.innerHTML=0;
        this.playTheGameAgain();
    }
    playTheGameAgain(){
        this.check=[];
        this.addAClick=[];
        this.addBClick=[];
        this.numberOfClick=0;
        allBox.forEach(box =>{
            box.innerHTML='';
        })
    }


}

//Find all the Button elements from UI
const startBtn = document.querySelector("#startBtn")
const playAgain = document.querySelector("#playAgain")


//Find all score elements from UI
let scoreAField=document.querySelector('.score1');
let scoreBField=document.querySelector('.score2');
let socreTieField=document.querySelector('.score3');


//Find all the box to use as button
const allBox=document.querySelectorAll('.sq');

//Find all the users 
const firstUser = document.querySelector('#selectUser1');
const secondUser = document.querySelector('#selectUser2');

//Find the element to set the value whos turn is now
const whosTurn=document.querySelector('#currentPlayer');


//Audio palying from this element
let winner = document.querySelector("#myWinner");
let draw = document.querySelector("#myDraw");


//Added this button to start the game, this will set the starting score
//as zero for both user
startBtn.addEventListener('click',(e) => {
   ticTacToe.restartTheGame(); 
});

//This button will update the socre with the previous score and
//clear the board
playAgain.addEventListener('click',(e) => {
    ticTacToe.playTheGameAgain();
});



//calling the TicTacToe class to setup users
const ticTacToe= new TicTacToe("x","y");
ticTacToe.controlButton();
// ticTacToe.findTheWinner();



console.log("It is working");



class TicTacToe{
    constructor(){
        this.userA='x';
        this.userB='o';
        this.numberOfClick=0;
        this.scoreA=0;
        this.scoreB=0;
        this.scoreT=0;
        //This will help to control for not clicking the button more than one
        this.check=[];
        this.addAClick=[];
        this.addBClick=[];
        this.manageAIIndex=0;
        this.winningConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        this.aiIndexGeneratorHelper= [[0,1],[1,2],[0,2],
                                      [3,4],[4,5],[3,5],
                                      [6,7],[7,8],[6,8],
                                      [0,3],[3,6],[0,6],
                                      [1,4],[4,7],[1,7],
                                      [2,5],[5,8],[2,8],
                                      [0,4],[4,8],[0,8],
                                      [2,4],[4,6],[2,6]];
        this.replaceingIndex=[2,0,1,
                              5,3,4,
                              8,6,7,
                              6,0,3,
                              7,1,4,
                              8,2,5,
                              8,0,4,
                              6,2,4]
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
    controlButton(players){
        if(players=='me'){
            this.playGame();
        }else{
             this.playGameWithAi();
                console.log("AI will play here");
        }
      }

    playGame(){
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
                        if(this.userA=='x'){
                            boxButton.innerHTML='&#79;';
                            boxButton.style.color='#B8B8B8';
                        }else{
                            boxButton.innerHTML='&#x2715;';
                            boxButton.style.color='#FFFFFF';
                        }
                        this.settingPlayerTurnBoxValue("A Turn",'#000000')
                    }else{
                        if(this.userA=='o'){
                            boxButton.innerHTML='&#79;';
                            boxButton.style.color='#B8B8B8';
                        }else{
                            boxButton.innerHTML='&#x2715;';
                            boxButton.style.color='#FFFFFF';
                        }
                        this.addAClick.push(index);
                        //This will change the display
                        this.settingPlayerTurnBoxValue("B Turn",'#827b79');
                    }
                this.numberOfClick++;
                this.findTheWinner(); 

                //Keeping this clicked sound off as it is returning 404 error
                //clickSound.play();
             }
          })    
       })
     }


     playGameWithAi(){
        //this.generateRandomNumber();  
        // setInterval(()=>{
        //     console.log("from interval");
        // },5000);
        let number=0;
        allBox.forEach((boxButton, index) =>{
            
                boxButton.addEventListener('click',(e)=>{
                    if(this.check.includes(index)){
                    }else{  
                        boxButton.innerHTML='&#x2715;';
                        boxButton.style.color='#B8B8B8';
                        console.log("I have clicked");
                        this.check.push(index);
                        this.addAClick.push(index);
                        if(this.check.length<8){
                        //let aiIndex= this.generateRandomNumber();
                        let aiIndex=this.mainAIIndexGenerator();
                       console.log(this.mainAIIndexGenerator());
                        //AI part 
                    
                            allBox[aiIndex].innerHTML='&#79;';
                            allBox[aiIndex].style.color='#FFFFFF';
                            this.check.push(aiIndex);
                            this.addBClick.push(aiIndex);
                       
                            //this.findTheWinner();
                        }else{
                            //this.stopTheGameWhenWeFoundWinner();
                        }
                        
                       // setTimeout(()=>{
                            this.findTheWinner(); 
                        //},500)
                       this.mainAIIndexGenerator();    
                       console.log(this.check);
                    }

                })
            
         })





        
     }

     //This will generate a random number that will not be in teh check array 
     generateRandomNumber(){
         let randomNumber=  Math.floor((Math.random() * 8));
         while(this.check.includes(randomNumber)){
             randomNumber=  Math.floor((Math.random() * 8) + 1);
         }
         return randomNumber;
     }
//Working on this method to find the best index. for unbitable logic
     mainAIIndexGenerator(){
        let sendingValue=0;

        if(this.check.length<2){
            sendingValue=this.generateRandomNumber();
        }else{
        this.aiIndexGeneratorHelper.forEach((posible,index) => {
            let a=posible[0];
            let b=posible[1];
            if(this.addAClick.includes(a)&&this.addAClick.includes(b)){
                if(!this.check.includes(this.replaceingIndex[index])){
                sendingValue= this.replaceingIndex[index];
                }
            }
        })
       }
     return sendingValue;
    }


    //Set different backgroun when user Turn change
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
          this.highlightingWinner(ep[0],ep[1],ep[2]);
            this.scoreA+=1;
            this.settingPlayerTurnBoxValue("A WINNER!",'#008000');
            scoreAField.textContent=' '+this.scoreA;
            //This will play the sound for winner
            winner.play();
            //This method will disable to button from clicking when we will find the winner
            this.stopTheGameWhenWeFoundWinner();
         }
         if(this.addBClick.includes(ep[0]) && this.addBClick.includes(ep[1]) && this.addBClick.includes(ep[2])){
            this.highlightingWinner(ep[0],ep[1],ep[2]);
            this.scoreB+=1;
            console.log("WINNER B");
            this.settingPlayerTurnBoxValue("B WINNER!!",'#008000')
            scoreBField.textContent=' '+this.scoreB;
            winner.play();
            this.stopTheGameWhenWeFoundWinner();
        }
      }
        if(this.check.length===9){
            this.scoreT+=1;
            console.log("The Game is Draw");
            draw.play();
            this.settingPlayerTurnBoxValue(`${this.userA.toUpperCase()}${this.userB.toUpperCase()} DRAW`,'#FF0000')
            socreTieField.textContent=' '+this.scoreT;
            allBox.forEach(btn => {
                btn.style.background='#FF0000'
            })


        }
    }
    //This method will set all the index in the check array that we have used to protect each of the box from double click
    stopTheGameWhenWeFoundWinner(){
        for(let i=0; i<=8; i++){
            this.check.push(i);
        }
    }
    highlightingWinner(index1,index2,index3){
        allBox[index1].style.background='#00FF00';
        allBox[index2].style.background='#00FF00';
        allBox[index3].style.background='#00FF00';
    }
    restartTheGame(){
        this.scoreA=0;
        this.scoreB=0;
        this.scoreT=0;
        scoreAField.innerHTML=0;
        scoreBField.innerHTML=0;
        playerSelection.selectedIndex=0;
        this.playTheGameAgain();
    }
    playTheGameAgain(){
        this.check=[];
        this.addAClick=[];
        this.addBClick=[];
        this.numberOfClick=0;
        whosTurn.innerHTML='A Click on Sq box'
        whosTurn.style.background='black';
        allBox.forEach(box =>{
            box.innerHTML='';
            box.style.background='#028779';
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



//Find the element to set the value whos turn is now
const whosTurn=document.querySelector('#currentPlayer');


//Audio palying from this element
let winner = document.querySelector("#myWinner");
let draw = document.querySelector("#myDraw");
let clickSound = document.querySelector("#myClick");






//Find the player to start playing
const playerSelection = document.querySelector('#playerSelection');

playerSelection.addEventListener('change',(e) =>{
    if(playerSelection.value=='me'){
        console.log("selected me");
        ticTacToe.controlButton("me");
    }else{
        ticTacToe.controlButton("ai");
        console.log("selected ai");
    }

})






//Added this button to start the game, this will set the starting score
//as zero for both user
startBtn.addEventListener('click',(e) => {
   ticTacToe.restartTheGame(); 
   socreTieField.innerHTML= 0;
});

//This button will update the socre with the previous score and
//clear the board
playAgain.addEventListener('click',(e) => {
    ticTacToe.playTheGameAgain();
});


//Find all the users 
const firstUser = document.querySelector('#selectUser1');
const secondUser = document.querySelector('#selectUser2');

//This button will setup A user's ball, either x or 0
firstUser.addEventListener('change',(e)=>{
  
    if(firstUser.value=='x'){
        firstUser.selectedIndex=0;
        secondUser.selectedIndex=0;
    } else if(firstUser.value=='o'){
        firstUser.selectedIndex=1;
        secondUser.selectedIndex=1;
    }
    ticTacToe.userA=firstUser.value;
    ticTacToe.userB=secondUser.value;
    
})

//This button will setup B user's ball, either x or 0
secondUser.addEventListener('change',(e)=>{
    if(secondUser.value=='o'){
        secondUser.selectedIndex=0;
        firstUser.selectedIndex=0;
    } else if(secondUser.value=='x'){
        secondUser.selectedIndex=1;
        firstUser.selectedIndex=1;
    } 
    ticTacToe.userA=firstUser.value;
    ticTacToe.userB=secondUser.value;

})



//calling the TicTacToe class to setup users
const ticTacToe= new TicTacToe("x","y");
//ticTacToe.controlButton();

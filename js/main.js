console.log("It is working");


class TicTacToe{
    constructor(){
        this.userA='x';
        this.userB='o';
        this.numberOfClick=0;
        this.scoreA=0;
        this.scoreB=0;
        this.scoreT=0;
        this.controlMe=false;
        this.controlMedium=false;
        this.controlEasy=false;
        this.soundOnOff=true;
        this.check=[];
        this.addAClick=[];
        this.addBClick=[];
        this.manageAIIndex=0;
 /**
  * This array holds the winning index
  */
        this.winningConditions = [[0,1,2],[3,4,5],
                                 [6,7,8],[0,3,6],
                                 [1,4,7],[2,5,8],
                                 [0,4,8],[2,4,6]];
    /**
     * The possible winning situation when the first user will have
     * at least two index for winning, 
     */
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
    


    /**
     * This method will return true for allowing to click user A
     * and change to false for allowing user B to click 
     */
  
    playerTurn(){
        if(this.numberOfClick%2==0){
            return false;
        }else{
            return true;
        }
    }


    

    /**
     * This method will take the value that user will select from the select option
     * User has the option to select Play himself that will return me,
     * User has the option to select Level Easy that will return easy,
     * user has teh option to select Level Medium that will return ai
     * @param {*} userSelctedValue 
     */
    selectThePlayer(userSelctedValue){
        if(userSelctedValue=='me'){
            this.controlMe=true;
            this.playGame();
        }else if(userSelctedValue=='medium'){
            this.controlMedium=true;
            this.playeGameWithMediumLevel();
        }else if(userSelctedValue=='easy'){
            this.controlEasy=true;
            this.playGameWithAiEasyLevel();
        }else{
            this.controlEasy=false;
            this.controlMe=false;
            this.controlMedium=false;
        }
    }





/**
 * This method is for controlling the game with same user
 * user A and user B will be able to play the game, 
 * Note: future thinking is to connect this both users in database using their 
 * email address as unique identifier, then two users will be able to play 
 * from different divices
 */

    playGame(){
      
        allBox.forEach((boxButton, index) =>{
          boxButton.addEventListener('click', (e) =>{

            if(this.controlMe){
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
                            boxButton.style.color='#FFFFFF';
                        }else if(this.userA=='o'){
                            boxButton.innerHTML='&#x2715;';
                            boxButton.style.color='#B8B8B8'; 
                        }else if(this.userA=='cat'){
                            boxButton.appendChild(this.createDogElement());
                        }else if(this.userA='dog'){
                            boxButton.appendChild(this.createCatElement());
                        }

                        this.settingPlayerTurnBoxValue("A Turn",'#000000')
                    }else{
                        if(this.userB=='o'){
                            boxButton.innerHTML='&#x2715;';
                            boxButton.style.color='#B8B8B8';  
                            }else if(this.userB=='x'){
                                boxButton.innerHTML='&#79;';
                                boxButton.style.color='#FFFFFF';
                           
                            }else if(this.userB=='cat'){
                               boxButton.appendChild(this.createDogElement());
                            }else if(this.userB='dog'){
                            
                               boxButton.appendChild(this.createCatElement());
                            }

                        this.addAClick.push(index);
                        //This will change the display
                        this.settingPlayerTurnBoxValue("B Turn",'#827b79');
                    }
                this.numberOfClick++;
                this.findTheWinner(); 
                clickSound.play();
             }
            }
          })    
        })
    
     }





/**
 * This method will control userB by generating random number 
 * That random number will be use for each of the squire button index 
 * number, based on the index number userB will play.
 */
     playGameWithAiEasyLevel(){
        allBox.forEach((boxButton, index) =>{
                boxButton.addEventListener('click',(e)=>{
                    //This if else will control if the user change the player, or reset it, then they need to set the player again.
                    if(this.controlEasy){
                        if(this.check.includes(index)){
                        }else{  
                            this.generateHumanPlayer(boxButton, index);
                            if(this.check.length<9){
                                 this.settingPlayerTurnBoxValue("B Turn",'#827b79');
                            allBox.forEach(b=>{
                                 b.disabled = true;
                            })
                            this.generateAIPlayer(this.generateRandomNumber());
                            }   
                        } 
                        
                    }

                })
            })    
     }





/**
 * This method will has all the button, when one button will be click, it has two steps to 
 * complete the action, first it will work on the button has been click, then it will wait 
 * a certain time, and complete the next click based on the avialbe index nubmber that has
 * not been click from the list of button. 
*/
     playeGameWithMediumLevel(){
        allBox.forEach((boxButton, index) =>{
                boxButton.addEventListener('click',(e)=>{
                    //This if else will control if the user change the player, or reset it, then they need to set the player again.
                    if(this.controlMedium){
                        if(this.check.includes(index)){
                        }else{ 
                            this.generateHumanPlayer(boxButton, index);
                            if(this.check.length<9){
                            this.settingPlayerTurnBoxValue("B Turn",'#827b79');
                            allBox.forEach(b=>{
                                 b.disabled = true;
                            })
                            this.generateAIPlayer(this.mainAIIndexGenerator());
                            }  
                        } 
                    }

                })
            }) 
     }






     /**
      * To play againsed AI, we need to have the button and the button index for changing differnt color 
      * sign and imagese, that is controled by the following method. 
      * @param {} boxButton 
      * @param {*} index 
      */
     generateHumanPlayer(boxButton, index){
        clickSound.play();
        if(this.userA=='x'){
            boxButton.innerHTML='&#x2715;';
            boxButton.style.color='#B8B8B8';
        }else if(this.userA=='o'){
            boxButton.innerHTML='&#79;';
            boxButton.style.color='#FFFFFF';  
        }else if(this.userA=='cat'){
            boxButton.appendChild(this.createCatElement());
        }else if(this.userA='dog'){
            boxButton.appendChild(this.createDogElement());
        }
        this.check.push(index);
        this.addAClick.push(index);
        this.findTheWinner(); 
     }






     /**
      * This method will take the generated random number and play againsed human,
      * We can send only the random number which is consider here as easy level
      * We can send random nuber after some types of filtering, that is consider here as medium level
      * @param {} aiIndex 
      */
     generateAIPlayer(aiIndex){
        setTimeout(()=>{
            clickSound.play();
            this.settingPlayerTurnBoxValue("A Turn",'#000000')
            //let aiIndex=this.mainAIIndexGenerator();
            if(this.userB=='o'){
            allBox[aiIndex].innerHTML='&#79;';
            allBox[aiIndex].style.color='#FFFFFF';
            }else if(this.userB=='x'){
            allBox[aiIndex].innerHTML='&#x2715;';
            allBox[aiIndex].style.color='#B8B8B8';  
            }else if(this.userB=='cat'){
                allBox[aiIndex].appendChild(this.createCatElement());
            }else if(this.userB='dog'){
                 allBox[aiIndex].appendChild(this.createDogElement());
            }
            this.check.push(aiIndex);
            this.addBClick.push(aiIndex);
            this.findTheWinner(); 
            
            },1000)
     }





     /**
      * Adding dog in the box, this method is created, that will
      * select the dog image and add in appropriate div. 
      */
     createDogElement(){
        const dogImage=document.createElement("img");
        dogImage.setAttribute('src','images/dog.jpg');
        dogImage.style.width='99px';
        dogImage.style.height='99px';
        return dogImage;
     }






     /**
      * Adding cat in the box, this method is created, that will
      * select the cat image and will in appropriate div. 
      */
     createCatElement(){
        const catImage=document.createElement("img");
            catImage.setAttribute('src','images/cat.jpeg');
            catImage.style.width='99px';
            catImage.style.height='99px';
        return catImage;
     }





     /**
      * This will generate a random number that will not be in the check array 
      * There for the generated number can be used for selecting the div index that
      *  is not already clicked. 
      */
     generateRandomNumber(){
         let randomNumber=  Math.floor((Math.random() * 8));
         while(this.check.includes(randomNumber)){
             randomNumber=  Math.floor((Math.random() * 8) + 1);
         }
         return randomNumber;
     }





    /**
     * This method will generate the availabe index number by following some of the logic
     * It will check if user has already two selected index and in third selection
     * the userA is going to win, in that case this method will pick the third index to defense the 
     * userA
     */
     mainAIIndexGenerator(){
        let sendingValue=0;
        if(this.check.length<2){
            sendingValue=this.generateRandomNumber();
        }else{
        this.aiIndexGeneratorHelper.forEach((posible,index) => {
            let a=posible[0];
            let b=posible[1];
            if((this.addBClick.includes(a)&&this.addBClick.includes(b))&&(!this.check.includes(this.replaceingIndex[index]))){
                    sendingValue= this.replaceingIndex[index];
            }
            else if((this.addAClick.includes(a)&&this.addAClick.includes(b))&&(!this.check.includes(this.replaceingIndex[index]))){
                  sendingValue= this.replaceingIndex[index];
            }
        })
       }
       if(this.check.includes(sendingValue)){
           sendingValue=this.generateRandomNumber();
       }
      
     return sendingValue;
    }




   
   /**
    * This method will itterate all the winning codition by using for loop
    * and there are two arrays named addAClick and addBClick generated based on the user clicked
    *  Then use the if else condition to find what are the index value addAClick or addBClick array has 
    * and compare with the winning condition array to find the winner. 
    */
    findTheWinner(){
      for(let i=0; i<this.winningConditions.length; i++){
        let ep=this.winningConditions[i];
         if(this.addAClick.includes(ep[0]) && this.addAClick.includes(ep[1]) && this.addAClick.includes(ep[2])){
          this.highlightingWinner(ep[0],ep[1],ep[2]);
            this.scoreA+=1;
            this.settingPlayerTurnBoxValue("A WINNER!",'#00FF00');
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
            this.settingPlayerTurnBoxValue("B WINNER!",'#00FF00');
            scoreBField.textContent=' '+this.scoreB;
            winner.play();
            this.stopTheGameWhenWeFoundWinner();
            
        }
      }
        if(this.check.length===9){
            this.scoreT+=1;
            console.log("The Game is Draw");
            draw.play();
            this.settingPlayerTurnBoxValue(`${this.userA.toUpperCase()} ${this.userB.toUpperCase()} DRAW`,'#FF0000')
            socreTieField.textContent=' '+this.scoreT;
            allBox.forEach(btn => {
                btn.style.background='#FF0000';
              
            })


        }
    }




    /**
     * This method will set all the index in the check array 
     * that we have used to protect each of the box from double click
     */
    stopTheGameWhenWeFoundWinner(){
        for(let i=0; i<=8; i++){
            this.check.push(i);
        }
    }


       
        /**
         * Based on the current sitution, it will change the color and text in the display box
         * One for changing user
         * second for showing winner, or draw situation. 
         * @param {*} textValue 
         * @param {*} color 
         */
        settingPlayerTurnBoxValue(textValue,color){
            whosTurn.innerHTML=textValue;
            whosTurn.style.background=color;
        }

    /**
     * This method will take the index number for each of the box
     * and change the color for those index number is used to show the winning
     * row or column. 
     * @param {*} index1 
     * @param {*} index2 
     * @param {*} index3 
     */
    highlightingWinner(index1,index2,index3){
        allBox[index1].style.background='#00FF00';
        allBox[index2].style.background='#00FF00';
        allBox[index3].style.background='#00FF00';
        
    }




    /**
     * This method will control the sound on or off situation. 
     * By default, it will play the sound, but if user wants to mute,
     * the can click on the speaker icone, and same icone will woke to unmute
     */
   soundOnOffController(){
    
        if(this.soundOnOff){
            this.soundOnOff=false;
            clickSound.muted=true;
            draw.muted=true;
            winner.muted=true;
            onOffImage.setAttribute('src','images/mute.png')
        }else{
            
            clickSound.muted=false;
            draw.muted=false;
            winner.muted=false; 
            this.soundOnOff=true;
            onOffImage.setAttribute('src','images/unmute.png')
        }
   }



   /**
    * It will reset everything to the begining leve, 
    * That means user will start from beganing of the game.
    */

    restartTheGame(){
        this.scoreA=0;
        this.scoreB=0;
        this.scoreT=0;
        this.selectThePlayer("SOTP FUNCTIONNING");
        scoreAField.innerHTML=0;
        scoreBField.innerHTML=0;
        playerSelection.selectedIndex=0;
        this.playTheGameAgain();

    }




    /**
     * Reseting the bord and adding all the array that were used for holding users click.
     * and total click. 
     */
    playTheGameAgain(){
        this.check=[];
        this.addAClick=[];
        this.addBClick=[];
        this.numberOfClick=0;
        whosTurn.innerHTML='Play Again';
        whosTurn.style.background='#028779';
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
    let selectedValue=playerSelection.value;
    ticTacToe.selectThePlayer(selectedValue);
})







/**
 * If we want to reset after playing the game, we need to reset everything such as
 * score=0, provide the user to select the player, and clear the board. 
 */
startBtn.addEventListener('click',(e) => {
   ticTacToe.restartTheGame(); 
   socreTieField.innerHTML= 0;
});




/**
 * If we want to play agian, the button will update the score with existing score, 
 * Then clear the board, and make ready for playing second round. 
 */
playAgain.addEventListener('click',(e) => {
    ticTacToe.playTheGameAgain();
});





/**
 * Find all the users select option for user A and user B
 * 
 */
const firstUser = document.querySelector('#selectUser1');
const secondUser = document.querySelector('#selectUser2');


/** For First User, here user A
 * This button  provide the ability to setup either cat or dog image, 
 * It also have the ability to setup the ball as either x or o
 */
firstUser.addEventListener('change',(e)=>{
  
    if(firstUser.value=='x'){
        firstUser.selectedIndex=0;
        secondUser.selectedIndex=0;
    } else if(firstUser.value=='o'){
        firstUser.selectedIndex=1;
        secondUser.selectedIndex=1;
    }else if(firstUser.value=='cat'){
        firstUser.selectedIndex=2;
        secondUser.selectedIndex=3;
    } else if(firstUser.value=='dog'){
        firstUser.selectedIndex=3;
        secondUser.selectedIndex=2;
    }
    ticTacToe.userA=firstUser.value;
    ticTacToe.userB=secondUser.value;
    
})

/** For Second User, here user B
 * This button  provide the ability to setup either cat or dog image, 
 * It also have the ability to setup the ball as either x or o
 */
secondUser.addEventListener('change',(e)=>{
    if(secondUser.value=='o'){
        secondUser.selectedIndex=0;
        firstUser.selectedIndex=0;
    } else if(secondUser.value=='x'){
        secondUser.selectedIndex=1;
        firstUser.selectedIndex=1;
    }  else if(secondUser.value=='cat'){
        secondUser.selectedIndex=2;
        firstUser.selectedIndex=3;
    } else if(secondUser.value=='dog'){
        secondUser.selectedIndex=3;
        firstUser.selectedIndex=2;
    }

    ticTacToe.userA=firstUser.value;
    ticTacToe.userB=secondUser.value;

})

/**
 * call the onOffimage element and setup some css using javascript
 * Then add Event Listener
 */
const onOffImage=document.querySelector('#onOffImage');
       onOffImage.style.width='25px';
       onOffImage.style.margine='0px';
 onOffImage.addEventListener('click',(e) =>{
    ticTacToe.soundOnOffController();

})


//calling the TicTacToe class to setup users
const ticTacToe= new TicTacToe("x","y");
//ticTacToe.controlButton();

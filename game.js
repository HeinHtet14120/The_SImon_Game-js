let buttonColours=["red", "blue", "green", "yellow"];

let userClickedPattern=[];
let gamePattern=[];


var level = 0;

let started = false;

let nextSequence = () => {

    userClickedPattern=[];

    level++;

    $('#level-title').text('Level '+ level);

    var randomNumber= Math.floor(Math.random() * 4);
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    let a = new Audio("./sounds/"+randomChosenColour+".mp3");
    
    a.play();

}



$(".btn").on("click", function(event) {
    // Code to execute when the button is clicked
   var userChosenColour = event.target.id;

   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);

   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);

});

let playSound = (name) =>{
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
  
    let a = new Audio("./sounds/"+name+".mp3");
    
    a.play();

}


let animatePress = (currentColour) =>{
    $('#'+currentColour).addClass('pressed');

    function removePressedClass() {
        $('#'+currentColour).removeClass('pressed');
    }

    // setTimeout(function () {
    //     $("#" +currentColour).removeClass("pressed");
    //   }, 100);

    setTimeout(removePressedClass,50);
}


$('body').keypress(function(event){
     if(!started){
        $('#level-title').text('Level '+ level);
        nextSequence(); 
           
     } 
})

let checkAnswer = (currentLevel)=>{

    console.log(gamePattern);
    console.log(userClickedPattern);

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('Success');

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
              nextSequence();
            },1000);
        }
    }else{

        playSound('wrong');

                $('body').addClass('game-over');
           

            setTimeout(function () {
                $("body").removeClass("game-over");
              }, 200);
        
            $('h1').text('Game Over, Press Any Key to Restart');
            startOver();
    }
    
}

let startOver = ()=>{
started = false; 
gamePattern=[];
level = 0;
}




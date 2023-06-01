(function(){
    "use strict";

    for (let i = 0; i < 100; i++) {
        $("#container").append("<div class='cell'></div>");
    };

    let gameState = true;
    let endGame = false;
    let headPosition = 33;
    let tails = [43,53,63];
    let direction = "ArrowUp";
    let directions = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];
    rearrange(headPosition , tails[0] , tails[1] , tails[2]);

    $("#retry").hide();

    let ticker;


    $(document).on("keydown" , function(event){

        preventOpposite(event);
        gameStartConditions(event);
        
    });
    

    $("#retry").on("click" , function(){
        location.reload(true);
    });



    function moveSnake(e){
        $("span").remove();
        let newTails = tails.slice();
        let newHead = headPosition;
        
        tails[2] = tails[1];
        tails[1] = tails[0];
        tails[0] = headPosition;

        if(direction === "ArrowUp"){
            headPosition -= 10;
        }else if(direction === "ArrowRight"){
            headPosition += 1;
        }else if(direction === "ArrowLeft"){
            headPosition -= 1;
        }else if(direction === "ArrowDown"){
            headPosition += 10;
        }else{}

        if(jQuery.inArray(headPosition, tails) !== -1){ //prevent head to touch the tail
            gameOver();
            rearrange(newHead , newTails[0] , newTails[1] , newTails[2] , e.key);
        }else{
            rearrange(headPosition , tails[0] , tails[1] , tails[2] , e.key);
        }
    };


    function preventOpposite (evt){
        if(direction === "ArrowUp" && evt.key === "ArrowDown"){
            gameState = false;
        }else if(direction === "ArrowDown" && evt.key === "ArrowUp"){
            gameState = false;
        }else if(direction === "ArrowRight" && evt.key === "ArrowLeft"){
            gameState = false;
        }else if(direction === "ArrowLeft" && evt.key === "ArrowRight"){
            gameState = false;
        }else{
            gameState = true;
        }
    };


    function gameOver(){
        $("#container").animate({backgroundColor: " rgba(209, 120, 120, 0.2)"} , 500);
        $("#retry").fadeIn(500);
        gameState = false;
        endGame = true;
    };


    function gameStartConditions (e){
        if(jQuery.inArray(e.key, directions) !== -1 && gameState && !endGame){
            if(e.key){
                direction = e.key;
            }
            if(headPosition < 10 && direction === "ArrowUp" || headPosition > 90 && direction === "ArrowDown"){ //head is in the top or bottum edge
                gameOver();
                rearrange(headPosition , tails[0] , tails[1] , tails[2] , e.key);
            }else if(headPosition%10 === 0 && direction === "ArrowRight"){ //head is in the right edge
                gameOver();
                rearrange(headPosition , tails[0] , tails[1] , tails[2] , e.key);
            }else if(headPosition%10 === 1 && direction === "ArrowLeft"){ //head is in the left edge
                gameOver();
                rearrange(headPosition , tails[0] , tails[1] , tails[2] , e.key);
            }else{
                moveSnake(e);
            }
        }
    };


    function rearrange(head, tail1 , tail2 , tail3 , key){
        $(`.cell:nth-child(${head})`).append("<span></span>");
        $(`.cell:nth-child(${tail1})`).append("<span></span>");
        $(`.cell:nth-child(${tail2})`).append("<span></span>");
        $(`.cell:nth-child(${tail3})`).append("<span></span>");
        $(`.cell:nth-child(${head}) span`).attr("id" , "head");
    };
})();
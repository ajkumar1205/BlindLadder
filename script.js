class Player {
    constructor (name , score){
        this.name = name;
        this.score = score;
    }
}
class Snake {
    constructor (bite, tail){
        this.bite = bite;
        this.tail = tail;
    }
    get(bite){
        if(this.bite==bite){
            return this.tail;
        }else{
            return -1;
        }
    }
}
class Ladder {
    constructor (start, end){
        this.start = start;
        this.end = end;
    }
    get(start){
        if(this.start==start){
            return this.end;
        }else{
            return -1;
        }
    }
}
const x = 29;
const y = -11;
var playerList = [];
var pCount = 0;
const dots = {6 : '<div class="dice_dots6"></div><div class="dice_dots6"></div><div class="dice_dots6"></div><div class="dice_dots6"></div><div class="dice_dots6"></div><div class="dice_dots6"></div>',
              5 : '<div class="dice_dots5"></div><div class="dice_dots5"></div><div id="middle_dot5"></div><div class="dice_dots5"></div><div class="dice_dots5"></div>',
              4 : '<div class="dice_dots4"></div><div class="dice_dots4"></div><div class="dice_dots4"></div><div class="dice_dots4"></div>',
              3 : '<div class="dice_dots3"></div><div class="dice_dots3"></div><div class="dice_dots3"></div>',
              2 : '<div class="dice_dots2"></div><div class="dice_dots2"></div>',
              1 : '<div class="dice_dots1"></div>'};
const ladders = [
    new Ladder(8, 14),
    new Ladder(19, 40),
    new Ladder(27, 98),
    new Ladder(28, 52),
    new Ladder(61, 82),
    new Ladder(73, 93),
    new Ladder(38, 65)
];
const snakes = [
    new Snake(99, 24),
    new Snake(95, 51),
    new Snake(85, 57),
    new Snake(66, 32),
    new Snake(60, 22),
    new Snake(53, 6),
    new Snake(29, 3),
    new Snake(13, 9)
];
function isSnake(list, target){
    for(let i=0;i<list.length;i++){
        if(list[i].bite==target){
            return true;
        }
    }
    return false;
}
function isLadder(list, target){
    for(let i=0;i<list.length;i++){
        if(list[i].start==target){
            return true;
        }
    }
    return false;
}
const colors = ["red", "pink", "black", "blue", "purple", "green"];
const movingIds = ["moving_img1", "moving_img2", "moving_img3", "moving_img4", "moving_img5", "moving_img6"];
const borderColors = ["rgb(237, 28, 36)", "rgb(255, 174, 201)", "rgb(0, 0, 0)", "rgb(30, 36, 111)", "rgb(107, 48, 107)", "rgb(16, 86, 37)"];

// CHANGES THE ALIGNMENT OF THE GAME_BOARD CONTACT_US AND SCORE_CARD
window.addEventListener("resize", function(){
    let length = window.innerWidth;
    if(length<1120){
        document.getElementById("contact_us").style.display = "none";
        document.getElementById("game_board").style.left = 'calc(50% + 142px)';
        document.getElementById("score_card").style.left = 'calc(50% - 279px)';
    }else{
        document.getElementById("contact_us").style.display = "block";
        document.getElementById("game_board").style.left = "50vw";
        document.getElementById("score_card").style.left = "calc(50% - 420px)";
    }
});

// FIRST FUNCTION TO RUN IN THE WHOLE PAGE
function startgame(){
    var a = document.getElementById("description_box");
    a.style.display = "none";
    document.getElementById("contact_us").style.display = "block";
    document.getElementById("score_card").style.display = "block";
    let length = window.innerWidth;
    if(length<1120){
        document.getElementById("contact_us").style.display = "none";
        document.getElementById("game_board").style.left = 'calc(50% + 142px)';
        document.getElementById("score_card").style.left = 'calc(50% - 279px)';
    }else{
        document.getElementById("contact_us").style.display = "block";
        document.getElementById("game_board").style.left = "50vw";
        document.getElementById("score_card").style.left = "calc(50% - 420px)";
    }
    setTimeout(main, 300);
}

// MAIN FUCNTION THAT DEALS WITH ALL OTHER THINGS HAPPENING
var inRestart1 = document.getElementById("score_card").innerHTML;
var inRestart2 = document.getElementById("game_board").innerHTML;
var gameOver = false;
function main(){
    globalThis.pCount;
    pCount = parseInt(prompt("Enter the number of players:\n(Minimum number of players are 2.\nPlease enter a valid number.\nMaximum number of players are 6.)"));
    while(pCount<=1||isNaN(pCount)||pCount==undefined||pCount>6){
        alert("You have entered a wrong value.");
        pCount = parseInt(prompt("Enter the number of players:\n(Minimum number of players are 2.\nPlease enter a valid number.\nMaximum number of players are 6.)"));    
    }
    globalThis.playerList;
    for(let i=0;i<pCount;i++){
        let khiladikaNaam = prompt("Enter the name of Player no. "+(i+1));
        let khiladi = new Player(khiladikaNaam, 0);
        playerList.push(khiladi);
    }
    var diceDiv=document.getElementById("score_card").innerHTML;
    var playerString="";
    var movingImg="";
    for(let i=0;i<pCount;i++){
        playerString+='<tr class="player_data"><td class="table_data"><img src="extraMaterial/'+colors[i]+'.png" id="'+colors[i]+'" class="player_images"></td><td class="table_data"><span id="id'+(i+1)+'" class="player_names" style="border: solid 4px '+borderColors[i]+'">'+playerList[i].name+'</span></td></tr>';
        movingImg+='<img src="extraMaterial/'+colors[i]+'.png" id="moving_img'+(i+1)+'" class="moving_images">';
    }

    document.getElementById("score_card").innerHTML = diceDiv+'<table id="player_names">'+playerString+'</table>';
    document.getElementById("game_board").innerHTML += movingImg;
    const gameCheck = setInterval(function(){
        var flag = 0;
        for(let i=0;i<pCount;i++){
            if(playerList[i].score===100){
                flag++;
            }
        }
        if(flag===pCount-1){
            clearInterval(gameCheck);
            console.log("Game Over");
            globalThis.gameOver = true;
            setTimeout(function(){
                alert("Game Over");
                document.getElementById('score_card').style.display = 'none';
                document.getElementById('game_board').style.display = 'none';
                document.getElementById('contact_us').style.display = 'none';
                document.getElementById('restart').style.display = 'inline-block';
            },3000);
        }
    },1000);
}

// MAIN DICE ROLLING FUNCTION
var diceRolling = false;
async function diceRoll(){
    globalThis.diceRolling;
    if((!diceRolling)&&(!gameOver)){
        diceRolling = true;
        var index = indexReturn();
        console.log("Player no: "+(index+1));
        globalThis.playerList;
        let rollTime = (1 +(parseInt(Math.random()*1000))%2)*1000;
        const rolling = setInterval(changeDot, 120);
        let dicePromise = new Promise((resolve)=>{
                setTimeout(function(){
                    clearInterval(rolling);
                    resolve(globalThis.dValue);
                }, rollTime);
            });
        var steps = await dicePromise;
        var stepsTime = steps*300;
        var id = movingIds[index];
        var elem = document.getElementById(id).style;
        if(isNaN(parseInt(elem.left.slice(0, -2)))){
            elem.display = 'none';
        }
        if((steps===1||steps===6)&&elem.display==='none'){
            playerList[index].score = 1;
            elem.display ='inline-block';
            elem.left = '29px';
            elem.bottom = '-11px'
            diceRolling = false;
        }else if((elem.display==='inline-block')&&playerList[index].score+steps<=100){
            playerList[index].score += steps;
            movement(id, steps);
            setTimeout(function(){
                diceRolling = false;
            }, stepsTime);
        }else{
            diceRolling = false;
        }
        for(let i=0;i<pCount;i++){
            let score = playerList[i].score;
            if(isSnake(snakes, score)){
                var divID = 'div_'+score;
                var endScore = getSnake(snakes, score);
                setTimeout(function(){
                    snakeAnimation(divID, endScore, i)
                    setTimeout(function(){
                        diceRolling = false;
                    },3000);
                }, stepsTime);
                playerList[i].score = endScore;
            }
        }
        
        let score = playerList[index].score;
        if(isLadder(ladders, score)){
            var endScore = getLadder(ladders, score);
            setTimeout(function(){
                chaloBhaiyaJi(endScore, index);
                setTimeout(function(){
                    diceRolling = false;
                }, 400);
            }, stepsTime);
            playerList[index].score = endScore;
        }
        randomiser();
    }
}

// HELPING FUNCTION FOR DICEROLL. CHANGE DOTS ON THE DICE
var dValue = 0;
function changeDot(){
    let dot = 1+(parseInt(Math.random()*1000))%6;
    document.getElementById("dice").innerHTML = dots[dot];
    globalThis.dValue = dot;
}

// MAIN STEPPING FUNCTION WHICH MOVES COLOR IMAGES WITH COUNTING STEPS
function movement(id, steps){
    var tOut = steps*300;
    var inter = setInterval(function(){
        oneStep(id);
        },300);
    setTimeout(function(){
        clearInterval(inter)
        },tOut);
}

// HELPING FUNCTION FOR MOVEMENT. IT MAKES ONE STEP WHEN IT IS CALLED
function oneStep(id){
    var l = parseInt(document.getElementById(id).style.left.slice(0, -2));
    var b = parseInt(document.getElementById(id).style.bottom.slice(0, -2));
    if(isNaN(l)){
        document.getElementById(id).style.left = '83px';
    }else{
        if(l!=515&&b!=43&&b!=151&&b!=259&&b!=367&&b!=475){
            document.getElementById(id).style.left = ''+(l+54)+'px';
        }else if(l==515&&isNaN(b)){
            document.getElementById(id).style.bottom = '43px';
        }else if(l!=29&&b!=-11&&b!=97&&b!=205&&b!=313&&b!=421){
            document.getElementById(id).style.left = ''+(l-54)+'px';
        }else{
            document.getElementById(id).style.bottom = ''+(b+54)+'px';
        }
    }
}

// RETURNS INDEX TO THE DICEROLL FUNCTION
var index = -1;
function indexReturn(){
    globalThis.index;
    index++;
    if(index===pCount){
        index=0;
    }
    if(playerList[index].score===100){
        index++;
    }
    return index;
}

// WILL BE USED FOR CHANGING POSITIONS OF LADDERS AND SNAKES
function randomiser(){
    globalThis.snakes1;
    snakes[0].bite = randRange(92, 100);
    snakes[0].tail = randRange(30, 22);
    snakes[1].bite = randRange(91, 100);
    snakes[1].tail = randRange(51, 59);
    snakes[2].bite = randRange(81, 90);
    snakes[2].tail = randRange(51, 59);
    snakes[3].bite = randRange(61, 70);
    snakes[3].tail = randRange(22, 30);
    snakes[4].bite = randRange(51, 60);
    snakes[4].tail = randRange(22, 30);
    snakes[5].bite = randRange(51, 61);
    snakes[5].tail = randRange(2, 10);
    snakes[6].bite = randRange(21, 30);
    snakes[6].tail = randRange(2, 10);
    snakes[7].bite = randRange(11, 20);
    snakes[7].tail = randRange(2, 10);
    globalThis.ladladders
    ladders[0].start = randRange(2, 10);
    ladders[0].end = randRange(51, 59);
    ladders[1].start = randRange(11, 21);
    ladders[1].end = randRange(31, 41);
    ladders[2].start = randRange(21, 31);
    ladders[2].end = randRange(91, 100);
    ladders[3].start = randRange(31, 41);
    ladders[3].end = randRange(81, 91);
    ladders[4].start = randRange(61, 71);
    ladders[5].end = randRange(81, 91);
    ladders[5].start = randRange(71, 81);
    ladders[5].end = randRange(91, 99);
    ladders[6].start = randRange(31, 40);
    ladders[6].end = randRange(61, 71);
}

// MAIN ANIMATION FUNCTION FOR SNAKE BITE
function snakeAnimation(id, endScore, index){
    var imgID = 'moving_img'+(index+1)+'';
    document.getElementById(id).style.animationPlayState = "running";
    document.getElementById(id).addEventListener("webkitAnimationIteration", function(){
        stopAnimation(id);
        setTimeout(function(){
            upDown(imgID, endScore);
        }, 200)
    });
    setTimeout(function(){
        invisible(imgID, endScore);
    }, 300)
}

// STOPS THE BACKGROUND IMAGE ANIMATION OF DIV
function stopAnimation(id){
    document.getElementById(id).style.animationPlayState = "paused";
}

// MAKES THE MOVING IMGAGES INVISIBLE SLOWLY BY DECREASING OPACITY SETS THE NEW POSITION COORDINATES
function invisible(id, score){ 
    document.getElementById(id).style.opacity = '1.0';
    const invi = setInterval(function(){
        var op = parseFloat(document.getElementById(id).style.opacity);
        if(op<0){
            clearInterval(invi);
            document.getElementById(id).style.left = geometry(score)[0]+'px';
            document.getElementById(id).style.bottom = geometry(score)[1]+'px';
        }else{
            document.getElementById(id).style.opacity = ''+(op-0.015)+''
        }
    }, 8);
}

// MAKES THE MOVING IMAGE VISIBLE AGAIN
function reappear(id){
    document.getElementById(id).style.opacity = '0.0';
    const reap = setInterval(function(){
        var op = parseFloat(document.getElementById(id).style.opacity);
        if(op>1){
            clearInterval(reap);
        }else{
            document.getElementById(id).style.opacity = ''+(op+0.015)+''
        }
    },8);
}

// PLAY THE BACKGROUND IMAGE ANIMATION OF DIV FOR CHANGING POSITION OF MOVING IMG
function upDown(imgID,endScore){
    var id = 'div_'+endScore+'';
    document.getElementById(id).style.animationPlayState = "running";
    setTimeout(function(){
        reappear(imgID);
    }, 300);
    document.getElementById(id).addEventListener("webkitAnimationIteration", function(){
        stopAnimation(id);
    });
}

// RETURNS ONES AND TENS UNIT OF A NUMBER
function points(score){
    return [parseInt(score/10), (score%10)];
}

// LADDER'S ANIMATION
function chaloBhaiyaJi(score, index){
    var id = movingIds[index];
    var x1 = parseInt(document.getElementById(id).style.left.slice(0, -2));
    var y1 = parseInt(document.getElementById(id).style.bottom.slice(0, -2));
    var x2 = geometry(score)[0];
    var y2 = geometry(score)[1];
    var m = (y2-y1)/(x2-x1);
    const int = setInterval(function(){
        if(isFinite(m)){
            if(m>=0){
                x1+=4;
                y1+=4*m;
            }else{
                x1-=4;
                y1-=4*m;
            }
        }else{
            y1+=4;
        }
        if(y1>y2){
            clearInterval(int);
            x1=x2;
            y1=y2;
            document.getElementById(id).style.left = parseInt(x1)+'px';
            document.getElementById(id).style.bottom = parseInt(y1)+'px';
        }else{
            document.getElementById(id).style.left = parseInt(x1)+'px';
            document.getElementById(id).style.bottom = parseInt(y1)+'px';
        }
    }, 1);
}

// RETURNS THE VALUE CORRESSPONDING TO BITE IN SNAKES LIST
function getSnake(list, bite){
    for(let i=0;i<list.length;i++){
        if(list[i].bite==bite){
            return list[i].get(bite);
        }
    }
}

// RETURNS THE VALUE CORRESSPONDING TO START IN LADDERS LIST
function getLadder(list, start){
    for(let i=0;i<list.length;i++){
        if(list[i].start==start){
            return list[i].get(start);
        }
    }
}

// RETURNS A RANDOM NUMBER IN A RANGE GIVEN IN ITS PARAMETERS
function randRange(ll, ul){
    return ll + (parseInt(Math.random()*10000))%(ul-ll);
}

// RETURN COORDINATES OF THE POINT ON THE GAME BOARD
function geometry(xy){
    if(xy%10!=0){
        if(points(xy)[0]%2==0){
            return [(points(xy)[1]-1)*54+x, points(xy)[0]*54+y];
        }else{
            return [(10-points(xy)[1])*54+x, points(xy)[0]*54+y];
        }
    }else{
        if(xy%20==0){
            return [29, (points(xy)[0]-1)*54+y];
        }else{
            return [515, (points(xy)[0]-1)*54+y];
        }
    }
}

// FUNCTION TO RESET VARIABLES AND RESTART THE GAME WITHOUT RELOADING OF PAGE
function gameRestart(){
    globalThis.playerList;
    globalThis.pCount;
    globalThis.gameOver = false;
    globalThis.index = -1;
    globalThis.diceRolling = false;
    globalThis.dValue = 0;
    for(let i=0;i<pCount;i++){
        playerList.pop();
    }
    pCount=0;
    document.getElementById("contact_us").style.display = "block";
    document.getElementById("score_card").style.display = "block";
    let length = window.innerWidth;
    if(length<1120){
        document.getElementById("contact_us").style.display = "none";
        document.getElementById("game_board").style.left = 'calc(50% + 142px)';
        document.getElementById("score_card").style.left = 'calc(50% - 279px)';
    }else{
        document.getElementById("contact_us").style.display = "block";
        document.getElementById("game_board").style.left = "50vw";
        document.getElementById("score_card").style.left = "calc(50% - 420px)";
    }
    document.getElementById("score_card").innerHTML = inRestart1;
    document.getElementById("game_board").innerHTML = inRestart2;
    document.getElementById('game_board').style.display = 'block';
    document.getElementById('restart').style.display = 'none';
    setTimeout(main, 400);
}
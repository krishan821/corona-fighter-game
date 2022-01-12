function load_images(){
    enemy_img = new Image;
    enemy_img.src = "Assest/corona.png";
    
    player_img = new Image;
    player_img.src = "Assest/superhero.png";
    
    gem_img = new Image;
    gem_img.src = "Assest/gemm.png";
    
    
}



function init(){
    canvas = document.getElementById("mycanvas");
    console.log(canvas);
    W=700;
    H=400;
    canvas.width = W;
    canvas.height = H;
    game_over = false;
    
    //create a context
    pen = canvas.getContext('2d');
    console.log(pen);
    
    e1 = {
        x : 150,
        y : 50,
        w : 60,
        h : 60,
        speed : 20, 
    };
     e2 = {
        x : 300,
        y : 150,
        w : 60,
        h : 60,
        speed : 30, 
    };
     e3 = {
        x : 450,
        y : 20,
        w : 60,
        h : 60,
        speed : 40, 
    };
    //enemy array
    enemy = [e1,e2,e3];
    
    player ={
        x : 20,
        y : H/2,
        w : 60,
        h : 60,
        speed : 20,
        Moving : false,
        health : 100,
        
    };
        gem ={
        x : W-100,
        y : H/2,
        w : 60,
        h : 60,
        
        
    };
    
    //listen to events on tha canvas
    
    canvas.addEventListener('mousedown',function(){
       console.log("Mouse pressed");
        player.Moving=true;
    });
    
     canvas.addEventListener('mouseup',function(){
       console.log("Mouse released");
        player.Moving=false;
    });
    
}

function isOverlap(rect1,rect2){
   if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y)
       {
           return true;
       }
    return false;
}

function draw(){
    // clear the canvas area for old frame
    pen.clearRect(0,0,W,H);
    
    
    pen.fillStyle = "red";
     //draw the player
    // draw the image
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    
    
   for(let i=0;i<enemy.length;i++)
   {
       pen.drawImage(enemy_img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
   }
   
    pen.fillStyle = "white";
    pen.fillText("score"+player.health,10,10);
    
}


function update(){
    
    //if player is moving
    if(player.Moving==true){
        player.x += player.speed;
        player.health +=20;
    }
    
    for(let i=0;i<enemy.length;i++)
        {
           if(isOverlap(enemy[i],player))
               {
                   player.health -= 50;
                   if(player.health < 0)
                       {
                           console.log(player.health);
                           game_over = true;
                           alert("Game Over" + player.health);
                       }
               }
        }
    //overlap between
    if(isOverlap(player,gem)){
        alert("You Won!");
        game_over = true;
        return;
    }
    
    //move the box downwards
    //update each enemy
    for(let i=0;i<enemy.length;i++)
        {
             enemy[i].y +=enemy[i].speed;
            if(enemy[i].y>=H - enemy[i].h || enemy[i].y<0)
                {
                     enemy[i].speed *=-1;
                }
        }
        }
   
    
    



function gameloop(){
    if(game_over==true){
        clearInterval(f);
    }
    draw();
    update();
    console.log("In gameloop");
    
}
load_images();
init();

var f = setInterval(gameloop,100);
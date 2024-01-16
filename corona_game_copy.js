      const start = function() { 
   document.getElementById('beginning').style.display = 'none';
   window.value=2 ;  
   score = 0;
   z = 12;
   v = 1;
};


window.dil=2;
window.hrd =2;
window.sh = 3;
const easy = function() {
window.hrd = 2;
document.getElementById("easy").style.border = "2.5px dashed #12f50a";
document.getElementById("hard").style.border = "2.5px dashed White";};
const hard = function() {
window.hrd=3;
document.getElementById("hard").style.border = "2.5px dashed #12f50a";
document.getElementById("easy").style.border = "2.5px dashed White";};
const invincible = function() {
	if(dil==2){
	if(sh==2)
	{document.getElementById("invincible").style.border = "2.5px dashed white";
	sh=3;}
    else		
	{window.sh = 2;
	document.getElementById("invincible").style.border = "2.5px dashed #12f50a";
	setTimeout(function (){sh=3;dil=1;document.getElementById("invincible").style.border = "2.5px dashed white";setTimeout(function (){dil=2;document.getElementById("invincible").style.border = "2.5px dashed blue";},5000);},10000);}}
	};
    var c = document.querySelector("canvas");
    c.width = innerWidth;
    c.height = innerHeight;
    c = c.getContext("2d");
      
    /*CONTROLS*/	
    function startGame()
{
		
    var mouse = {
      x: innerWidth/2,
      y: innerHeight-45 
    };
      
    var touch = {
      x: innerWidth/2,
      y: innerHeight-33
    };
     
   
 //event listener for mouse object
    canvas.addEventListener("mousemove", function(Mobj){//when event listeners are used as html atributes only "event" parameter can be passed. => function(event). 
    mouse.x = Mobj.clientX;
    //mouse.y = Mobj.clientY;
    });
    //eventListener to mouse object(for mobile phone).
    canvas.addEventListener("touchmove", function(event){
      var rect = canvas.getBoundingClientRect();
      var root = document.documentElement;
      var touch = event.changedTouches[0];
      var touchX = parseInt(touch.clientX);
      var touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
      event.preventDefault();
      mouse.x = touchX;
      //mouse.y = touchY;
    });
      

    /*GAME VARIABLES*/  
    //player
    var _players = [];
    var player_width = 32;
    var player_height = 83;
    var playerImg = new Image();
    playerImg.src = "https://i.ibb.co/HH3YVG2/karakter.png";
    score = 0;
    var health = 50;
    
    //enemy array
    var _enemies = []; //array to hold n enemies
    var enemyImg = new Image();
    enemyImg.src = "https://i.ibb.co/SyqHbvP/covid19.png";
    var enemy_width = 32;
    var enemy_height = 32;
	z = 12;
   
    //health array
    var _healthkits = []; //array to hold n health kits
    var healthkitImg = new Image();
    healthkitImg.src = "https://i.ibb.co/sVzjXRX/health.png";
    var healthkit_width = 32;
    var healthkit_height = 32;
   
    /*-----------GAME OBJECTS-----------*/  
    //Player object
    function Player(x, y, width, height){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      
      this.draw = function(){
        c.beginPath();
        c.drawImage(playerImg, mouse.x-player_width-16, mouse.y-player_height); //draw player and center 
		if(sh==2){
		c.rect(mouse.x-100, 522, 178,100);
		c.strokeStyle="blue";
		c.lineWidth="5";}
		c.stroke();
      };
      this.update = function(){
        this.draw();
      };
    }
    
    
    //Enemy object
    function Enemy(x, y, width, height, speed){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      
      this.draw = function(){
        c.beginPath();
        c.drawImage(enemyImg, this.x, this.y);
      };
      
      this.update = function(){
		 this.y += this.speed;
		 if(hrd==3)
		 {var b = Math.round(Math.random());		
		if(b==0)
		 {this.x += this.speed/2;}
		else
		{this.x -= this.speed/2;}}
	if(sh==2){
	if(this.y>500 && mouse.x-116<this.x && this.x < mouse.x+68)
		{this.y -= this.speed;
      this.x -= 25;
	  if(this.x+48 > mouse.x)
	{this.x += 50; }}
	}
        this.draw();
      };
    }
    
    //Health kit object  
    function Healthkit(x, y, width, height, speed){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      
      this.draw = function(){
        c.beginPath();
        c.drawImage(healthkitImg, this.x, this.y);
      };
      
      this.update = function(){
        this.y += this.speed;
        this.draw();
      };
    }
      
    /*-----------_new OBJECT-----------*/  
    //draw Player
    for (var _ = 0; _<1; _++){
      var __player = new Player(mouse.x, mouse.y, player_width, player_height);
       _players.push(__player);
    }
    v = 1;
    //draw n enemies into enemies array
    function drawEnemies(){
      for (var _ = 0; _< v; _++){ //enemy with random x axis, -32 as y axis, enemy_width, enemy_height, random speed  
        var x = Math.random()*(innerWidth-enemy_width);
        var y = -enemy_height; //-height to draw above canvas for smooth income
        var width = enemy_width;
        var height = enemy_height;
        var speed = Math.random()*z;
        var __enemy = new Enemy(x, y, width, height, speed);
        _enemies.push(__enemy); //push enemy to my array of enemies
      }
    }setInterval(drawEnemies, 400);  setInterval (function () {z++;},2000); 
    
      
    //draw health kits
    function drawHealthkits(){
      for (var _ = 0; _<1; _++){ //enemy with random x axis, -32 as y axis, enemy_width, enemy_height, random speed  
        var x = Math.random()*(innerWidth-enemy_width);
        var y = -enemy_height; //-height to draw above canvas for smooth income
        var width = enemy_width;
        var height = enemy_height;
        var speed = Math.random()*2.5;
        var __healthkit = new Healthkit(x, y, width, height, speed);
        _healthkits.push(__healthkit); //push enemy to my array of enemies
      }
    }setInterval(function () {drawHealthkits();v++;}, 15000);
      
    /*COLLISION DETECTION*/
    function collision(a,b){
      return a.x < b.x + b.width &&
             a.x + a.width > b.x &&
             a.y < b.y + b.height &&
             a.y + a.height > b.y;
    }
    function collision2(a,b){
      return mouse.x-a.width/2 < b.x-16 + b.width &&
             mouse.x + a.width/2 > b.x+16 &&
             mouse.y < b.y + b.height*1.8 &&
             mouse.y + a.height*1.8 > b.y;
    }
    /*SCORE-*/
    c.fillStyle = "Black";
    c.font = "1em Arial";
    
    
    /*DIRTY ERROR HANDLING*/
    function stoperror() {
      return true;
    }  
    window.onerror = stoperror();
    /*GAME LOOP*/
    function animate(){
      requestAnimationFrame(animate); //animate
      c.beginPath(); //begin
      c.clearRect(0,0,innerWidth,innerHeight); //clear canvas
      c.fillText("Health: " + health, 5, 20); //health
      c.fillText("Score: " + score, innerWidth-100, 20);//score
      

    /*-__player, __bullet, __enemy update, __healthkit update*/
      //update _player
      for (var i=0; i < _players.length; i++){
        _players[i].update();
      }
      
      //update enemies from enemies array
      function drawEnemy(){
      for (var k=0; k < _enemies.length; k++){
        _enemies[k].update();
    
        //if enemy is below canvas, delete it
        if(_enemies[k].y > innerHeight){
            score++;
          _enemies.splice(k, 1);
       }
      }
     }drawEnemy();
      
      //draw healthkits
      for(var h=0; h < _healthkits.length; h++){
        _healthkits[h].update();
      }

      
      //COLLISIONS
      function handleCollision(){
        for(var i = _players.length-1; i >= 0; i--){
          for(var k = _enemies.length-1; k >= 0; k--){
            if(collision2(_players[i], _enemies[k])){
              //_players.splice(i, 1);
              _enemies.splice(k, 1);
              health -= 10;
              if(health === 0){
				 alert("He died! he should have just stayed at home.\n\nSCORE: " + score);
				 delete(value);
				document.getElementById('beginning').style.display = 'flex';
						startGame();
			  }
            }
          }
        }
      }if( value == 2 ) {handleCollision();}
	
      
        function handleCollision2(){
        for(var i = _players.length-1; i >= 0; i--){
          for(var k = _healthkits.length-1; k >= 0; k--){
            if(collision2(_players[i], _healthkits[k])){
              //_players.splice(i, 1);
              _healthkits.splice(k, 1);
              health += 10;
            }
          }
        }
      }if(value = 2){handleCollision2();}
    
    } 
animate();}
startGame();
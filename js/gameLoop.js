var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 423;

document.body.appendChild(canvas);

//Cenário
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "./image/background.jpg";

//Jogador
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function(){
	playerReady = true;
};
playerImage.src = "./image/player.png";

//NPC
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
};
monsterImage.src = "./image/monster.png";

//GAME OVER:
var gameOver = false;
var gOverImage = new Image();
gOverImage.src = "./image/gover.jpg";

//VITÓRIA:
var vitoria = false;
var vitoriaImage = new Image();
vitoriaImage.src = "./image/vitoria.jpg";

//Configurações do Jogo
var player = {
	speed: 256
};
var monster = {};
var monstersCaught = 0;
var keysDown = {};
addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);



var reset = function (){
	if(first){
		player.x = canvas.width / 2;
		player.y = canvas.height / 2;
		first = false;
	}	
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	segs = 0;
	gOverImage.src = "./image/gover.jpg";
}

var reiniciar = function (){
		player.x = canvas.width / 2;
		player.y = canvas.height / 2;
		first = false;
		monstersCaught = 0;
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	//gOverImage = null;
	
	reset();
}

var segs = 0;
var timeUnit = 0;
var momentoMorte = 0;
var first = true;


//Controles do Jogador
var update = function(modifier){
	if((!gameOver)&& (!vitoria)){
		if(37 in keysDown){
			player.x -= player.speed * modifier; //Esquerda
		}
		if(38 in keysDown){
			player.y -= player.speed * modifier; //Cima
		}
		if(39 in keysDown){
			player.x += player.speed * modifier; //Direita
		}
		if(40 in keysDown){
			player.y += player.speed * modifier; //Baixo
		}
	}
	
	//Timer:
	++timeUnit;
	if(timeUnit>=30){
		timeUnit = 0;
		segs++;
	}
	
	//Game Over:
	if ((segs >= 15) && (!gameOver) ){
		segs = 0;
		gameOver = true;
		momentoMorte = segs;
	}
	
	if (gameOver){
		if (segs == momentoMorte + 10){
			gameOver = false;
			reiniciar();
		}
	}
	
	//Vitoria:
	if ((monstersCaught >= 30) && (!gameOver) ){
		segs = 0;
		vitoria = true;
		momentoMorte = segs;
	}
	
	if (vitoria){
		if (segs == momentoMorte + 10){
			vitoria = false;
			reiniciar();
		}
	}
	
	if(player.x > 640) player.x = 0;
	if(player.x < 0) player.x = 640;
	if(player.y > 423) player.y = 0;
	if(player.y < 0) player.y = 422;
	
	//Colisão
	if(player.x <= (monster.x + 32)
	&& monster.x <= (player.x + 32)
	&& player.y <= (monster.y + 32)
	&& monster.y <= (player.y + 32)){
		++monstersCaught;		
		reset();
	}
};

//Desenhar na Tela
var render = function(){
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	if(playerReady){
		ctx.drawImage(playerImage, player.x, player.y);
	}
	if(monsterReady){
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}	
	
	if(vitoria){
		
		ctx.drawImage(vitoriaImage, 0, 0);
		
		//title:
		ctx.fillStyle = "rgb(0, 255, 0)";	
		ctx.strokeStyle = "rgb(0, 0, 0)";	
		ctx.font = "44PX Verdana";
		ctx.textAlign = "center";
		ctx.textBaseline = "center";
		ctx.fillText("Bom Trabalho!",320, 220);
		ctx.strokeText
		("Bom Trabalho!", 320, 220);
		
		//score:
		ctx.fillStyle = "rgb(0, 255, 0)";	
		ctx.strokeStyle = "rgb(0, 0, 0)";	
		ctx.font = "30PX Verdana";
		ctx.textAlign = "center";
		ctx.textBaseline = "center";
		ctx.fillText("Ovos Destruídos: " + monstersCaught,320, 250);
		ctx.strokeText
		("Ovos Destruídos: " + monstersCaught,320, 250);
	}	
	
	if(gameOver){
		ctx.drawImage(gOverImage, 0, 0);	
		
		//title:
		ctx.fillStyle = "rgb(0, 255, 0)";	
		ctx.strokeStyle = "rgb(0, 0, 0)";	
		ctx.font = "44PX Verdana";
		ctx.textAlign = "center";
		ctx.textBaseline = "center";
		ctx.fillText("You Lose!",320, 220);
		ctx.strokeText
		("You Lose!", 320, 220);
		
		//score:
		ctx.fillStyle = "rgb(0, 255, 0)";	
		ctx.strokeStyle = "rgb(0, 0, 0)";	
		ctx.font = "30PX Verdana";
		ctx.textAlign = "center";
		ctx.textBaseline = "center";
		ctx.fillText("Ovos Destruídos: " + monstersCaught,320, 250);
		ctx.strokeText
		("Ovos Destruídos: " + monstersCaught,320, 250);
		
	} else if (!vitoria){
		
	//title:
	ctx.fillStyle = "rgb(0, 255, 0)";	
	ctx.strokeStyle = "rgb(0, 0, 0)";	
	ctx.font = "44PX Verdana";
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	ctx.fillText("NASTY NEST",320, 48);
	ctx.strokeText
	("NASTY NEST", 320, 48);
	
	//ovos:
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.strokeStyle = "rgb(255, 50, 50)";
	ctx.font = "22px Verdana";
	ctx.textAlign = "right";
	ctx.textBaseline = "center";
	ctx.fillText("Ovos: " + monstersCaught + "/30", 600, 410);
	ctx.strokeText ("Ovos: " + monstersCaught + "/30", 600, 410);
	
	//timer:
	ctx.fillStyle = "rgb(0, 0, 0)";	
	ctx.strokeStyle = "rgb(255, 50, 50)";	
	ctx.font = "22px Verdana";
	ctx.textAlign = "left";
	ctx.textBaseline = "left";
	ctx.fillText("Eclosão: " + segs + " /15", 32, 410);
	ctx.strokeText("Eclosão: " + segs + " /15", 32, 410);
	}
};

//Loop do Jogo
var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	update(delta / 1000);
	render();
	
	then = now;
};

//Iniciar o Jogo
reset();
var then = Date.now();
setInterval(main, 1);



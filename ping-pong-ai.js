// JavaScript Document

// JavaScript Document
$(document).ready(function(){
	
function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}


launchFullScreen(document.getElementById("myCanvas"));
var increaseSpeed;
var animation,dev;
var score = 0;
var life = 3;
var gameover = false;
var lost = false;
var start = false;
var collision = document.getElementById("collide");
var canvas = document.getElementById("myCanvas");
var trackPadx = 0;
var hscore = 0;
var ctx = canvas.getContext("2d");
  var nick = $('#nik').html();
var cw = window.innerWidth,
ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;
var userpaddle = {
	width: 200,
	height: 8,
	xpos :500
};
var aipaddle = {
	width: 200,
	height: 8,
	xpos :500,
	lvl : 1
};


	canvas.addEventListener('click',function()
	{
		
		if(!(start||gameover))
		{
			resetall();
		startOn();
		}
		else if(gameover)
		{
			resetall();
		init();
		}
		
		},false);
		
		
var ball = {
	rad : 8,
	inix : 500,
	iniy : userpaddle.height+8,
	vx : 10,
	vy : 10,
	x : 500,
	y : userpaddle.height+8
}

function resetall()
{//console.log('reseting');
	canvas.width = cw;
canvas.height = ch;
ctx  = canvas.getContext("2d");
	ball.x = ball.inix;
	ball.y = ball.iniy;
	ball.vx = 10;
	ball.vy = 10;
	userpaddle.xpos = ball.inix;
	aipaddle.xpos = ball.inix;
	if(gameover)
	{
	score = 0;
	life = 3;
	aipaddle.lvl = 1;
	$("#ai").html('1');
	gameover = false;
	}
	clearInterval(increaseSpeed);
}

function setLives(lives)
{
	$lives = $("#lives");
	$lives.html("");
	for(var i=0;i<lives;i++)
	{
		$life = $("<li class='life'><i class='icon-heart'></i></li>");
		$life.appendTo($lives);
	}
}
function init()
{
	draw();
	collision.removeEventListener('canplay', init, false);
	setLives(3);
		$('.icon-star').removeClass('hscore');
		var xmlhttp;
	if (window.XMLHttpRequest)
{
  xmlhttp=new XMLHttpRequest();
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		var hscor = xmlhttp.responseText;
    document.getElementById("hs").innerHTML=hscor;
	
	var x = hscor.indexOf(": ");
	hscore = parseInt(hscor.substring(x+1));
    }
  }

xmlhttp.open("POST","hscore.php",true);
xmlhttp.send();
		displayMsg("Start", "AI Level : "+(aipaddle.lvl));

	
}

function displayMsg(msg, secmsg)
{
	$msg = $('#msg');$secmsg = $('#secmsg');
	$msg.html(msg); $secmsg.html(secmsg);
	$msg.css({
		'marginTop': (window.innerHeight/2 -80)+"px",
		'left': (window.innerWidth/2-100)+"px",
		'display': 'block'
	});
	$secmsg.css({
		'marginTop': (window.innerHeight/2)+"px",
		'left': (window.innerWidth/2-100)+"px",
		'display': 'block'
	});
	
}
function startOn()
{
	$('#msg, #secmsg').css('display','none');
	
increaseSpeed = setInterval(function(){
	ball.vy*= 1.25;
//	console.log(ball.vy);
}, 10000);

	start = true; 
	gameOn = true;
		animation = setInterval(animate,1000/60);
}


function gameOver(lost)
{

clearInterval(animation);
if(!lost)
{
aipaddle.lvl++;	
score+= (aipaddle.lvl-1)*10;
$('#ai').html(aipaddle.lvl);
displayMsg("Level Up","AI Level : "+(aipaddle.lvl));
}
else
{
	life--;
	setLives(life);
	if(life==0)
	{
		gameover = true;
		console.log(score+" "+hscore);
		if(score>hscore)
		{
		console.log('update');
			if (window.XMLHttpRequest)
 var xmlhttp=new XMLHttpRequest();

else
 var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
xmlhttp.open("POST","hscore.php",true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("score="+score);
		displayMsg("WooHoo!",'New High Score!');	
		}
		else
displayMsg("Game Over",null);
	}
	else
	{
		displayMsg("Lives Left : "+life,null);
	}
}
	gameOn = false;
	start = false;
	
	
}



function drawBall()
{
	ctx.beginPath();
ctx.fillStyle = "#faf3f2";
ctx.arc(ball.x,ball.y,ball.rad,0,Math.PI*2,false);
ctx.closePath();
ctx.fill();
}
function drawPaddles()
{
ctx.fillStyle = "#faf3f2";
ctx.fillRect((aipaddle.xpos-aipaddle.width/2),0,aipaddle.width,aipaddle.height);
ctx.fillRect((userpaddle.xpos-userpaddle.width/2),(canvas.height-userpaddle.height),userpaddle.width,userpaddle.height);
}
function updatePaddles(ex)
{
	ex = Math.max(ex, userpaddle.width/2);
	ex = Math.min(canvas.width-userpaddle.width/2, ex);
	userpaddle.xpos = ex;
}

function inAiRange(range)
{
	return ((ball.x>aipaddle.xpos-range)&&(ball.x<aipaddle.xpos+range));
}
function updateAipaddle()
{
		var paddlex = (aipaddle.lvl*10);
		var res = 0.75;
	if(ball.vy<0)
	{
		if(inAiRange(30))
		paddlex/=2;
		if(ball.y<=Math.abs(ball.vy*10))
		paddlex*=(aipaddle.lvl/3);
		var diff = Math.abs(aipaddle.xpos-ball.x);
	var dis = diff/(Math.max(1,(canvas.width/2)));
	dis = Math.max(res,dis);
	
	if(ball.x>aipaddle.xpos&&ball.vx>0)
	{
		aipaddle.xpos+= Math.min(diff,paddlex*dis);
	}
	else if(ball.x>aipaddle.xpos&&ball.vx<0)
	{
		aipaddle.xpos+= Math.min(diff,paddlex*dis/2);
	}
	else if(ball.x<aipaddle.xpos&&ball.vx<0)
	{
		aipaddle.xpos-= Math.min(diff,paddlex*dis);
	}
	else if(ball.x<aipaddle.xpos&&ball.vx>0)
	{
		aipaddle.xpos-= Math.min(diff,paddlex*dis/2);
	}
	else if(aipaddle.xpos==ball.x)
	return;
	}
	else
	{
		var diff = Math.abs(aipaddle.xpos-canvas.width/2);
		if(aipaddle.xpos>canvas.width/2)
		aipaddle.xpos-= Math.min(diff,5);
		else if(aipaddle.xpos<canvas.width/2)
		aipaddle.xpos+= Math.min(diff,5);
		else 
		return
	}
}
canvas.addEventListener("mousemove", function(e)
{
	
	var cx = $('#myCanvas').offset().left;
	if(start)
	updatePaddles(e.pageX-cx);
	
}, false);

function updateScore()
{
	$score = $('#score');
	$score.html(score);
}

function draw()
{
	updateScore();
	drawPaddles();
	drawBall();
}

function paddleCollide(newx, user)
{
	if(user)
	return((newx>=userpaddle.xpos-(userpaddle.width/2)-20)&&(newx<=userpaddle.xpos+userpaddle.width/2+20));
	else
	return((newx>=aipaddle.xpos-(aipaddle.width/2)-20)&&(newx<=aipaddle.xpos+aipaddle.width/2+20));
}

function collide()
{
//console.log("ball x : "+ball.vx+" paddlex : "+paddleV/5);
		if(score>hscore)
		{
			$('.icon-star').addClass('hscore');
		}
		collision.pause();
		collision.currentTime = 0;
	
		collision.play();
}

function updateX(newx, paddleV)
{
	/*dev = ((newx-paddles.xpos)/(paddles.width/2)*7.5)
	if((dev>0&&ball.vx>0)||(ball.vx<0&&dev<0))
		ball.vx+= dev;
		else
		ball.vx+= dev/5;*/
		if((ball.vx>0&&paddleV>0)||(ball.vx<0&&paddleV<0))
		ball.vx+= paddleV/5;
		else
		ball.vx+= paddleV/2;
}
var paddleV = 0;
function animate()
{

	var newx = ball.x+ball.vx;
	var newy = ball.y+ball.vy;
	
	
	
	if(newy<=(aipaddle.height+ball.rad))
	{
		if(paddleCollide(newx,false))
		{
			score++;
		newy = aipaddle.height+ball.rad;
		ball.vy = -(ball.vy);
		paddleV = (aipaddle.xpos-trackPadx)/(50/Math.abs(ball.vy));
		updateX(newx, paddleV);
		
		collide();
		}
		else
		{
			lost = false;
			gameOver(false);
		}
		
	}
	else if(newy<=(aipaddle.height+ball.rad+Math.abs(ball.vy*10)))
	{
		trackPadx = aipaddle.xpos;
	}
	
	
	
	if(newy>=(canvas.height-userpaddle.height-ball.rad))
	{
		if(paddleCollide(newx,true))
		{
			score++;
		newy = canvas.height-userpaddle.height-ball.rad
		ball.vy = -(ball.vy);
		paddleV = (userpaddle.xpos-trackPadx)/(50/Math.abs(ball.vy));
				updateX(newx, paddleV);

		
		collide();
		}
		else
		{
			lost = true;
			gameOver(true);
		}
		
	}
	else if(newy>=(canvas.height-userpaddle.height-ball.rad-Math.abs(ball.vy*10)))
	{
		trackPadx = userpaddle.xpos;
	}
	if(newx<=ball.rad)
	{
		newx = ball.rad;
		ball.vx = -(ball.vx);
	}
	if(newx>=(canvas.width-ball.rad))
	{
		newx = canvas.width-ball.rad;
		ball.vx = -(ball.vx);
	}
	
	ball.x = newx;
	ball.y = newy;
	
	
updateAipaddle();
ctx.clearRect(0,0,canvas.width,canvas.height);

draw();
//requestAnimFrame(animate);


	
}
collision.addEventListener('canplay',init,false);



});
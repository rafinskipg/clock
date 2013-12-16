// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

//The variables
var canvas, ctx, centerCoords, radius;
centerCoords = {x : 0, y: 0};
var startingCoords ,radiansMinutes , radiansSeconds ,radiansHours ,obtainPointsSeconds , obtainPointsMinutes ,obtainPointsHours;
    
//The calculus
function calculatePointsCircunference(coords, radians){
    return function(center,variation){
        return {
            x: center.x +(radius* Math.cos(Math.atan(coords.x/ coords.y) + radians*variation)),
            y :  center.y+(radius* Math.sin(Math.atan(coords.x/ coords.y) + radians*variation))
        }
    }
};


//Canvas basic functions
function drawLineFromTo(originCoords, finalCoords){
    ctx.beginPath();
    ctx.moveTo(originCoords.x, originCoords.y);
    ctx.lineTo(finalCoords.x,finalCoords.y);
    ctx.closePath();
    ctx.stroke();
}
function drawCircle(coords, r){
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, r, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
}
function drawCircumference(coords, r){
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, r, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke();
}

//Draw the clock circles
function drawClock(){
    drawCircumference(centerCoords, radius);
    drawCircumference(centerCoords, radius+20);
    drawCircumference(centerCoords, 10);    
}

//Render the canvas
function render(){
    //Clean the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    ctx.font="30px Verdana";
    ctx.strokeText(hours+':'+minutes+':'+seconds,100,50);
    //ctx.strokeText(date.toLocaleDateString(),100,50);

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    var coordS = obtainPointsSeconds(centerCoords, seconds);
    var coordM = obtainPointsMinutes(centerCoords, minutes);
    var coordH = obtainPointsHours(centerCoords, hours);
    
    drawClock();   
    //Seconds
    drawLineFromTo(centerCoords, coordS);
    drawCircle(coordS, 10);
    //Minutes
    drawLineFromTo(centerCoords, coordM);
    //Hours
    drawLineFromTo(centerCoords, coordH);
   
}




window.onload = function(){
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerCoords.x  = window.innerWidth/2;
    centerCoords.y  = window.innerHeight/2;
    radius = window.innerWidth > window.innerHeight ? window.innerWidth/4 : window.innerHeight/4;
    startingCoords ={ x: -radius, y:0};  
    radiansMinutes =  radiansSeconds = ((360/60)*2* Math.PI) / 360;
    radiansHours = ((360/12)*2* Math.PI) / 360;
    obtainPointsSeconds =  obtainPointsMinutes = calculatePointsCircunference(startingCoords,radiansSeconds);
    obtainPointsHours = calculatePointsCircunference(startingCoords,radiansHours);
    
    //Style
    ctx.lineWidth=5;
    var gradient=ctx.createLinearGradient(0,0,170,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    // Fill with gradient
    ctx.strokeStyle=gradient;
    
    (function animloop(){
      requestAnimFrame(animloop);
      render();
    })();
};
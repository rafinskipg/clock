// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var canvas, ctx, centerCoords, radius;
centerCoords ={x : 0, y: 0}
var startingCoords ,radiansMinutes , radiansSeconds ,radiansHours ,obtainPointsSeconds , obtainPointsMinutes ,obtainPointsHours;
    
function calculatePointsCircunference(coords, radians){
        return function(center,variation){
            return {
                x: center.x +(radius* Math.cos(Math.atan(coords.x/ coords.y) + radians*variation)),
                y :  center.y+(radius* Math.sin(Math.atan(coords.x/ coords.y) + radians*variation))
            }
        }
    };

function render(){
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
    

    //draw a circle
    ctx.beginPath();
    ctx.arc(centerCoords.x, centerCoords.y, radius, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerCoords.x, centerCoords.y, radius+20, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerCoords.x, centerCoords.y, 10, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(coordS.x, coordS.y, 10, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill()

    //Seconds
    ctx.beginPath();
    ctx.moveTo(centerCoords.x, centerCoords.y);
    ctx.lineTo(coordS.x,coordS.y);
    ctx.closePath();
    ctx.stroke();

    //Minutes
    
    ctx.beginPath();
    ctx.moveTo(centerCoords.x, centerCoords.y);
    ctx.lineTo(coordM.x,coordM.y);
    ctx.closePath();
    ctx.stroke();
    
    //Hours
    ctx.lineWidth=5;
    var gradient=ctx.createLinearGradient(0,0,170,0);
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");

// Fill with gradient
ctx.strokeStyle=gradient;
    ctx.beginPath();
    ctx.moveTo(centerCoords.x, centerCoords.y);
    ctx.lineTo(coordH.x,coordH.y);
    ctx.closePath();
    ctx.stroke();
   
   
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
    (function animloop(){
      requestAnimFrame(animloop);
      render();
    })();
};
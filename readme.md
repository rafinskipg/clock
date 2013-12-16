## Canvas clock demo

The function needed for calculating a exact point in the circumference given a radius is this one:

We know the angle of movement: 

````
var angle = 360/60;
````

So we transform it to radians

````
var radians = (angle*2* Math.PI) / 360;
````

We know the starting point
````
[x1, y1] = The coordinates of one point in the limit of the circumference
[xC, yC] = The calculated coordiantes
````` 

And we apply the calculus for the final point

````
 xc = radius * Math.cos( Math.atan(x1 / y1) + radians );
 yc = radius * Math.sin( Math.atan(x1 / y1) + radians );
````

As this function has to be valid for canvas, you have to take into consideration the following:

````
In canvas [0,0] is not the center of the circle, so we need to add the coordinates of the center of the circle to the resulting points.
xC = xC + centerOfTheCircle.X;
yC = yC + centerOfTheCircle.Y;
````` 


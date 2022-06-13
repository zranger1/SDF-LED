# 2D Operators and Coordinate Space Transforms
These operators let you duplicate, mirror, combine and alter the things you draw using signed distance functions.   Many of them work by transforming the coordinate space and can be used to create interesting effects with **any** 2D Pixelblaze pattern.

### Radial n-Sided Kaleidoscopic Repeats
Repeats the image over ```nSides``` evenly divided polar "slices" about the center.
Works best on images with the (x,y) origin centered on the display. 

To use, just include the ```kal()``` function and its global variables in your
pattern, and add the line:
      ```kal(x,y,timebase); x = outx; y = outy;```
 at the start of your render2D() function.  The optional ```timer``` parameter controls rotation speed.
 You can use any timing value you like.

```
var outx,outy;
var nSides = 5;
var slice = PI / nSides;
// sets up a kaleidoscope effect - makes the image repeat over evenly divided
// rotated "slices" about the center.
function kal(x,y,timer) {
  var angle = atan2(y, x);
  angle = mod(angle, 2.0 * slice);
  
  // uncomment to reflect each slice so they can be tiled
  // evenly if you like.
  //angle = abs (angle - slice);
  
  // rotate image over time
  angle += PI*timer;
  
  // map new rotated coordinates back to original image space
  var d = hypot(x,y);
  outx = d * cos(angle);  outy = d * sin(angle);
}
```

### Axis Mirroring
To mirror normalized (range 0.0 to 1.0) cartesian coordinates, for the
X-axis, use

```x = abs(x-0.5);```

and for the Y-axis

```y  = abs(y-0.5);```

Normalized polar coordinates (range -0.5 to 0.5) can be mirrored with
 
```x = -abs(x); y = -abs(y);```

### Infinite Repeats
Repeat the pattern multiple times across both x and y. 
Careful about cx and cy.  They're the distance between
repeats in world coordinates.

Setting them both to 0.5 will give you 3x3 repetitions across
the display. Experiment to see what works best for your pattern
and target display hardware. 

The math:
```
  cx = 0.5;
  cy = 0.5;
  x = mod(x+0.5*cx,cx)-0.5*cx;
  y = mod(y+0.5*cy,cy)-0.5*cy;  
```

Small function to transform x and y coords:
```
var outx,outy;
function infiniteRepeat(x,y,cx,cy) {
  outx = mod(x+0.5*cx,cx)-0.5*cx;
  outy = mod(y+0.5*cy,cy)-0.5*cy;    
}
```

### Bend (X and Y)
Bend the shape around the specified axis. The ```k``` parameter
determines the magnitude of the bend.

```
var outx,outy;
function bendX(x,y,k) {
  var c = cos(k*x); var s = sin(k*x);
  outx = (c * x) + (s * y);
  outy = (s * x) - (c * y);
}

function bendY(x,y,k) {
  var c = cos(k*y); var s = sin(k*y);
  outx = (c * x) + (s * y);
  outy = (s * x) - (c * y);
}
```

### Minkowski Distance (2D)
A generalized method for distance calculation
- p == 1 gives Manhattan Distance
- p == 2 gives normal Euclidean distance
- p == infinity gives Chebyshev distance

Values of p between 0 and 1 can be visually... interesting!
```
function minkowskiDistance(x1,y1,x2,y2,p) {
  return pow(pow(abs(x1 - x2), p) + pow(abs(y1 - y2), p),1.0 / p);
}
```

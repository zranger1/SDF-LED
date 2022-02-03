// SDF Font Demo with Morphing Characters
// (Work-in-Progress Version 2)
// 1/04/2022 ZRanger1

// UI control variables
export var objectSize = 0.85;
export var lineWidth = 0.085;
export var speed = 500;

// shape function selection - your message here!

//var shapeSdf = [_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_L,_M,_N,_O,_P,_Q,_R,_S,_T,_U,_V,_W,_X,_Y,_Z];
var shapeSdf = [_P,_I,_X,_E,_L,_B,_L,_A,_Z,_E];

// animation control
var shape = 0;
var nextShape = 1;
var hue = 0;
var morphClock = 0;
var wait = 1; 

var lerpPct = 0;
var t1, timebase,t2;

// move coordinate origin to center.  
translate(-0.5,-0.5);

// comment/uncomment this line to flip charaters on x axis as necessary
// thanks @pixie, for the reminder!  
scale(-1,1);

// UI

export function sliderSpeed(v) {
  speed = 100+(v*1900);
}

export function sliderSize(v) {
  objectSize = v;
}

export function sliderLineWidth(v){
  lineWidth = 0.25 * v * v;
}


export function beforeRender(delta) {
  timebase = (timebase + delta/1000) % 1000;
  t1 = timebase * 10;
  t2 = time(0.04);  
  morphClock += delta

// morph to a new shape every other second...
  if (morphClock > speed) {
    if (!wait) {
      shape = nextShape;                      // set to next shape
      nextShape = (nextShape+1) % shapeSdf.length;  
    }
    morphClock = 0;    
    wait = !wait;
  }

  lerpPct = morphClock / speed;
}

export function render2D(index,x,y) {
  if (wait) {
    d = shapeSdf[shape](x,y);
  } else {
    d = shapeSdf[shape](x,y) * (1-lerpPct) + shapeSdf[nextShape](x,y) * lerpPct;
  }  

  v = (d <= lineWidth) ? 1-d/lineWidth : 0;

  hsv((x+y+t2), 1, v)
}

// SDF function for line segment
function line(x,y,x1,y1,x2,y2) {
  x1 *= objectSize; y1 *= objectSize;
  x2 *= objectSize; y2 *= objectSize;
  
  ax = x - x1; ay = y - y1;
  bx = x2 - x1; by = y2 - y1;
  h = clamp((ax * bx + ay * by)/(bx * bx + by * by),0,1);
  return hypot(ax - bx * h,ay - by * h);
}

// original sdf text demo shader: https://www.shadertoy.com/view/lsXXRs
// font from https://dl.dropboxusercontent.com/u/14645664/files/glsl-text.txt , which no longer
// seems to exist.
// TODO -- need to rescale the segments to save calculation

function _A(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,0.5,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,0.28571,-0.42857));
  d=min(d,line(px,py,0.28571,-0.42857,0.28571,0.07143));
  d=min(d,line(px,py,0.28571,0.07143,-0.28571,0.07143));
  d=min(d,line(px,py,-0.28571,0.07143,0.28571,0.07143));
  d=min(d,line(px,py,0.28571,0.07143,0.28571,0.5));
  return d;
}
function _B(px,py) {
  var d = 1;
  d=min(d,line(px,py,0.14286,0.07143,0.14286,-0.42857));
  d=min(d,line(px,py,0.14286,-0.42857,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,0.28571,0.5));
  d=min(d,line(px,py,0.28571,0.5,0.28571,0.07143));
  d=min(d,line(px,py,0.28571,0.07143,-0.28571,0.07143));
  return d;
}
function _C(px,py) {
  var d = 1;
  d=min(d,line(px,py,0.28571,-0.42857,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,0.28571,0.5));
  return d;
}
function _D(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,0.5,0.14286,0.5));
  d=min(d,line(px,py,0.14286,0.5,0.21429,0.42857));
  d=min(d,line(px,py,0.21429,0.42857,0.28571,0.25));
  d=min(d,line(px,py,0.28571,0.25,0.28571,-0.10714));
  d=min(d,line(px,py,0.28571,-0.10714,0.21429,-0.35714));
  d=min(d,line(px,py,0.21429,-0.35714,0.14286,-0.42857));
  d=min(d,line(px,py,0.14286,-0.42857,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  return d;
}
function _E(px,py) {
  var d = 1;
  d=min(d,line(px,py,0.28571,-0.42857,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.07143));
  d=min(d,line(px,py,-0.28571,0.07143,0,0.07143));
  d=min(d,line(px,py,0,0.07143,-0.28571,0.07143));
  d=min(d,line(px,py,-0.28571,0.07143,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,0.28571,0.5));
  return d;
}
function _F(px,py) {
  var d = 1;
  d=min(d,line(px,py,0.28571,-0.42857,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.07143));
  d=min(d,line(px,py,-0.28571,0.07143,0,0.07143));
  d=min(d,line(px,py,0,0.07143,-0.28571,0.07143));
  d=min(d,line(px,py,-0.28571,0.07143,-0.28571,0.5));
  return d;
}
function _G(px,py) {
  var d = 1;
  d=min(d,line(px,py,0.28571,-0.28571,0.28571,-0.42857));
  d=min(d,line(px,py,0.28571,-0.42857,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,0.28571,0.5));
  d=min(d,line(px,py,0.28571,0.5,0.28571,0.07143));
  d=min(d,line(px,py,0.28571,0.07143,0.07143,0.07143));
  return d;
}
function _H(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,-0.28571,0.07143));
  d=min(d,line(px,py,-0.28571,0.07143,0.28571,0.07143));
  d=min(d,line(px,py,0.28571,0.07143,0.28571,-0.42857));
  d=min(d,line(px,py,0.28571,-0.42857,0.28571,0.5));
  return d;
}
function _I(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.21429,-0.42857,0.21429,-0.42857));
  d=min(d,line(px,py,0.21429,-0.42857,0,-0.42857));
  d=min(d,line(px,py,0,-0.42857,0,0.5));
  d=min(d,line(px,py,0,0.5,-0.21429,0.5));
  d=min(d,line(px,py,-0.21429,0.5,0.21429,0.5));
  return d;
}
function _J(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.21429,0.5,0,0.5));
  d=min(d,line(px,py,0,0.5,0.14286,0.35714));
  d=min(d,line(px,py,0.14286,0.35714,0.14286,-0.42857));
  d=min(d,line(px,py,0.14286,-0.42857,-0.21429,-0.42857));
  return d;
}
function _K(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,-0.28571,0.07143));
  d=min(d,line(px,py,-0.28571,0.07143,-0.07143,0.07143));
  d=min(d,line(px,py,-0.07143,0.07143,0.28571,-0.42857));
  d=min(d,line(px,py,0.28571,-0.42857,-0.07143,0.07143));
  d=min(d,line(px,py,-0.07143,0.07143,0.28571,0.5));
  return d;
}
function _L(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,0.28571,0.5));
  return d;
}
function _M(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,0.5,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,0,-0.07143));
  d=min(d,line(px,py,0,-0.07143,0.28571,-0.42857));
  d=min(d,line(px,py,0.28571,-0.42857,0.28571,0.5));
  return d;
}
function _N(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,0.5,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,0.28571,0.5));
  d=min(d,line(px,py,0.28571,0.5,0.28571,-0.42857));
  return d;
}
function _O(px,py) {
  var d = 1;
  d=min(d,line(px,py,0.28571,-0.42857,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,0.28571,0.5));
  d=min(d,line(px,py,0.28571,0.5,0.28571,-0.42857));
  return d;
}
function _P(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,0.5,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,0.28571,-0.42857));
  d=min(d,line(px,py,0.28571,-0.42857,0.28571,0.07143));
  d=min(d,line(px,py,0.28571,0.07143,-0.28571,0.07143));
  return d;
}
function _Q(px,py) {
  var d = 1;
  d=min(d,line(px,py,0.28571,0.5,0.28571,-0.42857));
  d=min(d,line(px,py,0.28571,-0.42857,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,0.28571,0.5));
  d=min(d,line(px,py,0.28571,0.5,0.07143,0.28571));
  return d;
}
function _R(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,0.5,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,0.28571,-0.42857));
  d=min(d,line(px,py,0.28571,-0.42857,0.28571,0.07143));
  d=min(d,line(px,py,0.28571,0.07143,-0.28571,0.07143));
  d=min(d,line(px,py,-0.28571,0.07143,0.07143,0.07143));
  d=min(d,line(px,py,0.07143,0.07143,0.28571,0.5));
  return d;
}
function _S(px,py) {
  var d = 1;
  d=min(d,line(px,py,0.28571,-0.42857,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.07143));
  d=min(d,line(px,py,-0.28571,0.07143,0.28571,0.07143));
  d=min(d,line(px,py,0.28571,0.07143,0.28571,0.5));
  d=min(d,line(px,py,0.28571,0.5,-0.28571,0.5));
  return d;
}
function _T(px,py) {
  var d = 1;
  d=min(d,line(px,py,0,0.5,0,-0.42857));
  d=min(d,line(px,py,0,-0.42857,-0.28571,-0.42857));
  d=min(d,line(px,py,-0.28571,-0.42857,0.28571,-0.42857));
  return d;
}
function _U(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,0.28571,0.5));
  d=min(d,line(px,py,0.28571,0.5,0.28571,-0.42857));
  return d;
}
function _V(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,-0.42857,0,0.5));
  d=min(d,line(px,py,0,0.5,0.28571,-0.42857));
  return d;
}
function _W(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,-0.42857,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,0,0.21429));
  d=min(d,line(px,py,0,0.21429,0.28571,0.5));
  d=min(d,line(px,py,0.28571,0.5,0.28571,-0.42857));
  return d;
}
function _X(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,-0.42857,0.28571,0.5));
  d=min(d,line(px,py,0.28571,0.5,0,0.03571));
  d=min(d,line(px,py,0,0.03571,0.28571,-0.42857));
  d=min(d,line(px,py,0.28571,-0.42857,-0.28571,0.5));
  return d;
}
function _Y(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,-0.42857,0,0.07143));
  d=min(d,line(px,py,0,0.07143,0,0.5));
  d=min(d,line(px,py,0,0.5,0,0.07143));
  d=min(d,line(px,py,0,0.07143,0.28571,-0.42857));
  return d;
}
function _Z(px,py) {
  var d = 1;
  d=min(d,line(px,py,-0.28571,-0.42857,0.28571,-0.42857));
  d=min(d,line(px,py,0.28571,-0.42857,0,0.07143));
  d=min(d,line(px,py,0,0.07143,-0.21429,0.07143));
  d=min(d,line(px,py,-0.21429,0.07143,0.21429,0.07143));
  d=min(d,line(px,py,0.21429,0.07143,0,0.07143));
  d=min(d,line(px,py,0,0.07143,-0.28571,0.5));
  d=min(d,line(px,py,-0.28571,0.5,0.28571,0.5));
  return d;
}



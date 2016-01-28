function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Line(m, b) {
  this.m = m;
  this.b = b;
}

function Circle(p, r) {
  this.p = p;
  this.r = r;
}

function slope(p1, p2) {
  return (p2.y - p1.y) / (p2.x - p1.x);
}

function intersection(l1, l2) {
  var x = (l2.b - l1.b) / (l1.m - l2.m);
  var y = l1.m * x + l1.b;
  return new Point(x, y);
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// line through two points
function l2p(p1, p2) {
  var m = slope(p1, p2);
  var b = p1.y - (m * p1.x);
  return new Line(m, b);
}

// points tangent to circle from point
function ltcp(p, c) {
  // get vector d from point to center of circle
  var d = (c.p.x < p.x ? -1 : 1) * distance(p, c.p);
  // get vector l from point to tangent points
  var l = (c.p.x < p.x ? -1 : 1) * Math.sqrt(Math.pow(d, 2) - Math.pow(c.r, 2));
  var phi = Math.asin((c.p.y - p.y) / d);
  var tht = Math.acos(l / d);
  // case 1
  var p1 = new Point(l * Math.cos(phi - tht) + p.x, l * Math.sin(phi - tht) + p.y);
  // case 2
  var p2 = new Point(l * Math.cos(phi + tht) + p.x, l * Math.sin(phi + tht) + p.y);
  return [p1, p2];
}

// lines tangent to two circles
function lt2c(c1, c2) {
  // ...
}

// line of perpendicular bisector of two points
function lpb2p(p1, p2) {
  var midpoint = new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  var m = -1 / slope(p1, p2);
  var b = midpoint.y - (m * midpoint.x);
  return new Line(m, b);
}

// circle that goes through 3 points
function c3p(p1, p2, p3) {
  var l1 = lpb2p(p1, p2);
  var l2 = lpb2p(p2, p3);
  var p = intersection(l1, l2);
  return new Circle(p, distance(p, p1));
}

var c = new Circle(new Point(0, 0), 1);
var p = new Point(0, 1);
console.log(ltcp(p, c));

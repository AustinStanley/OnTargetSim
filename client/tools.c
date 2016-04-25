#include <math.h>

typedef struct point {
  float x;
  float y;
} Point;

typedef struct line {
  float m;
  float b;
} Line;

typedef struct circle {
  Point p;
  float r;
} Circle;

typedef struct pair {
  int a;
  int b;
} Pair;

float slope(Point p1, Point p2) {
  return (p2.y - p1.y) / (p2.x - p1.x);
}

Point linesIntersection(Line l1, Line l2) {
  int x = (l2.b - l1.b) / (l1.m - l2.m);
  int y = l1.m * x + l1.b;
  Point ret = {x, y};
  return ret;
}

void lineCircleIntersection(Line l, Circle c, Point * p1, Point * p2) {
  int qA = powf(l.m, 2) + 1;
  int qB = 2 * (l.m * l.b - l.m * c.p.y - c.p.x);
  int qC = powf(c.p.y, 2) - powf(c.r, 2) + powf(c.p.x, 2) - 2 * l.b * c.p.y + powf(l.b, 2);
  int xs = quadratic(qA, qB, qC);
  *p1.x = xs[0];
  *p1.y = l.m * xs[0] + l.b;
  *p2.x = xs[1];
  *p2.y = l.m * xs[1] + l.b;
}

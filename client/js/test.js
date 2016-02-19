window.onload = () => {

  function cSvg(e) {
    return document.createElementNS('http://www.w3.org/2000/svg', e);
  }

  var svg = document.querySelector('svg');

  var width = 500;
  var height = 500;

  var g1 = cSvg('g');
  var c1 = cSvg('circle');
  var c2 = cSvg('circle');
  var c3 = cSvg('circle');

  [c1, c2, c3].forEach((c, i) => {
    c.setAttribute('cx', width / 2);
    c.setAttribute('cy', height / 2);
    c.setAttribute('r', (Math.min(width, height) / 6) * (i + 1));
    g1.appendChild(c);
  });

  g1.setAttribute('fill', 'none');
  g1.setAttribute('stroke', '#000');

  //svg.appendChild(g1);

  var g2 = cSvg('g');
  var l1 = cSvg('line');
  var l2 = cSvg('line');

  [l1, l2].forEach((l, i) => {
    l.setAttribute('x1', [0, width / 2][i]);
    l.setAttribute('x2', [width, width / 2][i]);
    l.setAttribute('y1', [height / 2, 0][i]);
    l.setAttribute('y2', [height / 2, height][i]);
    g2.appendChild(l);
  });

  g2.setAttribute('stroke', '#000');

  svg.appendChild(g2);

  // algorithm functions

  var drawTime = (function () {
    var timeout = 1;
    var queue = 0;
    var n = 5;
    return function () {
      if(queue++ < n) {
        return 0;
      }
      return timeout++ * 200;
    };
  })();

  function SvgPoint(x, y, h) {
    if(arguments[0] instanceof Point) {
      return SvgPoint(arguments[0].x, arguments[0].y, arguments[1]);
    }
    var c = cSvg('circle');
    c.setAttribute('cx', x + width / 2);
    c.setAttribute('cy', -y + height / 2);
    c.setAttribute('r', 2);
    c.setAttribute('fill', h || '#000');
    setTimeout(() => svg.appendChild(c), drawTime());
    return new Point(x, y);
  }

  function SvgLine(m, b, h) {
    if(arguments[0] instanceof Line) {
      return SvgLine(arguments[0].m, arguments[0].b, arguments[1]);
    }
    var l = cSvg('line');
    l.setAttribute('x1', 0);
    l.setAttribute('x2', width);
    l.setAttribute('y1', -(-width / 2 * m + b) + height / 2);
    l.setAttribute('y2', -(width / 2 * m + b) + height / 2);
    l.setAttribute('stroke', h || '#f00');
    setTimeout(() => svg.appendChild(l), drawTime());
    return new Line(m, b);
  }

  function SvgCircle(p, r, h) {
    if(arguments[0] instanceof Circle) {
      return SvgCircle(arguments[0].p, arguments[0].r, arguments[1]);
    }
    var c = cSvg('circle');
    c.setAttribute('cx', p.x + width / 2);
    c.setAttribute('cy', -p.y + height / 2);
    c.setAttribute('r', r);
    c.setAttribute('fill', 'none');
    c.setAttribute('stroke', h || '#000');
    setTimeout(() => svg.appendChild(c), drawTime());
    return new Circle(p, r);
  }

  // algorithm...

  function ran(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function () {
    var p = [SvgPoint(50, 0, '#00f'), SvgPoint(-50, 0, '#00f'), SvgPoint(0, -50, '#00f')];

    var i = SvgPoint(ran(-40, 40), ran(-40, 40), '#0f0');
    //var i = SvgPoint(-31, -23, '#0f0');

    var dis = p.map(p => distance(p, i));
    var mdx = dis.reduce((best, value, idx) => value < dis[best] ? idx : best, 0);

    SvgCircle(i, dis[mdx], '#0f0');
    var far = p.filter((v, idx) => idx !== mdx);
    var c = dis.map((d, idx) => SvgCircle(p[idx], d - dis[mdx])).filter(c => c.r > 0);
    var h = SvgPoint(externalHomotheticCenter(c[0], c[1]), '#f00');
    var l = SvgLine(l2p(p[mdx], h));
    var tp1s = ltcp(h, c[0]).map(SvgPoint);
    tp1s.forEach(p => SvgLine(l2p(p, h)));
    var tp2s = ltcp(h, c[1]).map(SvgPoint);
    var tp1 = SvgPoint(distance(p, tp1s[0]) < distance(p, tp1s[1]) ? tp1s[0] : tp1s[1], '#f0f');
    tp2s.forEach(p => SvgLine(l2p(p, h), '#f00'));
    var tp2 = SvgPoint(distance(p, tp2s[0]) < distance(p, tp2s[1]) ? tp2s[0] : tp2s[1], '#f0f');
    var c0 = SvgCircle(c3p(p[mdx], tp1, tp2));
    var p0s = lineCircleIntersection(l, c0).map(SvgPoint);
    c0 = SvgCircle(c3p(p0s[0], p0s[1], c[0].p));
    var l1 = SvgLine(l2p(p0s[0], p0s[1]));
    var p1s = circleCircleIntersection(c0, c[0]).map(SvgPoint);
    l2 = SvgLine(l2p(p1s[0], p1s[1]));
    h = SvgPoint(linesIntersection(l1, l2));
    var tp0s = ltcp(h, c[0]).map(SvgPoint);
    tp0s.forEach(p => SvgLine(l2p(p, h)));
    var tp0 = SvgPoint(distance(p0s[1], tp0s[0]) < distance(p0s[1], tp0s[1]) ? tp0s[0] : tp0s[1]);
    c = SvgCircle(c3p(p0s[0], p0s[1], tp0));
    p = SvgPoint(c.p);

  })();

};

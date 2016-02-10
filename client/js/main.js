window.onload = function () {
  var ta = new TargetArea(150, 6, 3);
  ta._svg.setAttribute('id', 'target');
  var aside = document.createElement('aside');
  aside.appendChild(ta._svg);
  var body = document.querySelector('body');
  body.insertBefore(aside, body.firstChild);
  var record = document.querySelector('#data tbody');
  function pad(n, value) {
    for(var s = String(value); s.length < n; s = '0' + s);
    return s;
  }
  var impactGroup = ta._svg.querySelector('g[data-group="impacts"]');
  var selected = null;
  var selectedRow = null;
  function selectImpact(event) {
    event.preventDefault();
    if(selected) {
      selected.removeAttribute('class');
      selectedRow.removeAttribute('class');
    }
    var time = event.target.hasAttribute('data-time')
             ? event.target.getAttribute('data-time')
             : event.target.parentNode.querySelector('[data-time]').getAttribute('data-time');
    var newSelected = impactGroup.querySelector('[data-time="' + time + '"]');
    if(newSelected !== selected) {
      selected = newSelected;
      selected.setAttribute('class', 'selected');
      selectedRow = record.querySelector('[data-time="' + time + '"]').parentNode;
      selectedRow.setAttribute('class', 'selected');
      impactGroup.setAttribute('class', 'selected');
      if(event.target.nodeName === 'circle') {
        selectedRow.scrollIntoView();
      }
    } else {
      selected = null;
      selectedRow = null;
      impactGroup.removeAttribute('class');
    }
  }
  var impacts = [];
  function addImpact(x, y, time) {
    impacts.push([x, y, time]);
    var row = document.createElement('tr');
    var xC = document.createElement('td');
    var yC = document.createElement('td');
    var tC = document.createElement('td');
    var date = new Date(time);
    xC.textContent = x.toFixed(2);
    xC.setAttribute('data-x', x);
    yC.textContent = y.toFixed(2);
    yC.setAttribute('data-y', y);
    tC.textContent = pad(2, date.getHours()) + ':' + pad(2, date.getMinutes()) + ':' + pad(2, date.getSeconds()) + ':' + pad(4, date.getMilliseconds());
    tC.setAttribute('data-time', time);
    row.appendChild(xC);
    row.appendChild(yC);
    row.appendChild(tC);
    record.appendChild(row);
    var e = ta.addImpact(x, y, time);
    e.addEventListener('click', selectImpact);
    row.addEventListener('click', selectImpact);
  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function go() {
    var r = getRandomInt(0, 70);
    var ang = getRandomInt(0, 360);
    var x = Math.cos(Math.PI * ang / 180) * r;
    var y = Math.sin(Math.PI * ang / 180) * r;
    addImpact(x, y, Date.now());
  }
  for(var i = 0; i < 50; i++) {
    setTimeout(go, 1000 + i * 20);
  }
  var exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export to CSV';
  exportBtn.addEventListener('click', function () {
    window.open(encodeURI('data:text/csv;charset=utf-8,' + impacts.join('\n') + '\n'));
  });
  document.querySelector('main').appendChild(exportBtn);
};

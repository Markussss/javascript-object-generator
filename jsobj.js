document.getElementById('go').addEventListener('click', function () {
  go(function (jsobjarr) {
    document.getElementById('result').className = 'fadeIn';
    document.getElementById('result').value = JSON.stringify(jsobjarr, null, 2);
  });
});
document.getElementById('plus').addEventListener('click', function () {
  document.getElementById('form').appendChild(document.getElementsByClassName('row')[0].cloneNode(true));
});
document.getElementById('loadextjs').addEventListener('click', loadextjs);

function loadextjs() {
  document.body.appendChild(createElement('script', {
    src: document.getElementById('extjs').value
  }));
  var extjsrow = document.getElementsByClassName('extjsrow')[0];
  document.body.insertBefore(createElement('div', {
    class: 'extjsrow'
  }, [
    createElement('input', {
      type: 'text',
      name: 'extjs',
      id: 'extjs',
      placeholder: 'external javascript file to load'
    }),
    createElement('span', {
      text: ' '
    }),
    createElement('button', {
      text: 'Load',
      click: loadextjs
    })
  ]), extjsrow);
  extjsrow.children[0].disabled = 'disabled';
}

function createElement(tagName, attr, child) {
  if (!tagName) return null;
  var el = document.createElement(tagName);
  if (typeof attr === 'object') {
    for (var key in attr) {
      if (attr.hasOwnProperty(key)) {
        if (key === 'text') {
          el.appendChild(document.createTextNode(attr[key]));
        } else if (key === 'click' && typeof attr[key] == 'function') {
          el.addEventListener('click', attr[key]);
        } else {
          el.setAttribute(key, attr[key]);
        }
      }
    }
    if (Array.isArray(child)) {
      child.forEach(function (cur, i, arr) {
        el.appendChild(cur);
      });
    } else if (typeof child === 'object') {
      el.appendChild(child);
    }
    return el;
  } else {
    return el;
  }
}

function go(cb) {
  var ret = [];
  for (var i = 0; i < document.getElementById('objs').value; i++) {
    ret.push({});
    var rows = document.getElementsByClassName('row');
    for (var j = 0; j < rows.length; j++) {
      ret[i][rows[j].getElementsByTagName('input')[0].value] = eval(rows[j].getElementsByTagName('textarea')[0].value);
    }
  }
  cb(ret);
}

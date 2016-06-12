// Adapted from https://github.com/danmartinez101/throw-in-the-towel/blob/master/index.js to use babel-standalone with actual presets

import {transform} from 'buble';

onReady(init)

function init() {
  waitz(retrieve(locate()), reify)
}

function locate() {
  return Array.prototype.slice.call(
    document.querySelectorAll('script[type="text/trafo"]')
  )
}

function retrieve(scripts) {
  return scripts.map(function (script) {
    return !!script.src
    ? load(script)
    : extract(script)
  })
}

function load(script) {
  return function (next) {
    loadUrl(script.src, function (source) {
      next({
        name: script.src,
        source: source
      })
    })
  }
}

function extract(script) {
  return function (next) {
    next({
      name: 'inline',
      source: script.innerHTML
    })
  }
}

function reify(scripts) {
  return scripts.map(function (script) {
    return new Function(transform(script.source, opts).code)()
  })
}



function onReady(init) {
  if (window.addEventListener) {
    window.addEventListener("DOMContentLoaded", init, false)
  } else if (window.attachEvent) {
    window.attachEvent("onload", init)
  }
}

function loadUrl(url, next) {
  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      next(this.response)
    } else {
      console.log('Failed to load ' + url)
      next()
    }
  }
  request.onerror = function () {
    console.log('Failed to load ' + url)
    next()
  }
  request.send(null)
}

function waitz(tasks, callback) {

  var results = []
  if (!tasks.length) {
    return callback(results)
  }

  function completed(index) {
    return function (result) {
      results[index] = result
      if (results.length === tasks.length) {
        callback(results)
      }
    }
  }

  tasks.forEach(function (task, i) {
    task(completed(i))
  })

}
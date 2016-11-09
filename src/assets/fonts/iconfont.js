;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-jiqirencircle" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M861.003 771.06 640.76 771.06c-17.6 0-32-14.4-32-32l0-35.722 189.713 0c17.6 0 32-14.4 32-32L830.473 164.611c0-17.6-14.4-32-32-32l-157.712 0L640.761 64.613c0-35.29-28.71-64-64-64l-129.02 0c-35.29 0-64 28.71-64 64l0 67.998-163.332 0c-17.6 0-32 14.4-32 32l0 506.727c0 17.6 14.4 32 32 32l195.332 0 0 35.722c0 17.6-14.4 32-32 32l-225.243 0c-17.6 0-32 14.4-32 32L126.498 991c0 17.6 14.4 32 32 32l702.505 0c17.6 0 32-14.4 32-32L893.003 803.06C893.003 785.46 878.603 771.06 861.003 771.06zM704.399 415.298c0 35.346-28.654 64-64 64-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64C675.745 351.298 704.399 379.951 704.399 415.298zM447.741 64.67c0.017-0.02 0.037-0.041 0.057-0.057l128.905 0c0.021 0.017 0.041 0.038 0.058 0.058l0 67.94-129.02 0L447.741 64.67zM322.8 415.298c0-35.346 28.654-64 64-64 35.346 0 64 28.654 64 64 0 35.346-28.654 64-64 64C351.454 479.298 322.8 450.644 322.8 415.298zM927.571 283.304l0 263.987c0 17.673-14.327 32-32 32s-32-14.327-32-32L863.571 283.304c0-17.673 14.327-32 32-32S927.571 265.631 927.571 283.304zM1023.067 349.361l0 128.13c0 17.673-14.327 32-32 32s-32-14.327-32-32l0-128.13c0-17.673 14.327-32 32-32S1023.067 331.688 1023.067 349.361zM127.609 579.291c-17.673 0-32-14.327-32-32L95.609 283.304c0-17.673 14.327-32 32-32s32 14.327 32 32l0 263.987C159.609 564.964 145.282 579.291 127.609 579.291zM64.113 349.361l0 128.13c0 17.673-14.327 32-32 32s-32-14.327-32-32l0-128.13c0-17.673 14.327-32 32-32S64.113 331.688 64.113 349.361z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-lixian" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M868.783149 84.933607 153.542482 84.933607c-49.36593 0-89.405583 40.871089-89.405583 91.193371l0 456.225079c0 50.318684 40.039653 91.189973 89.405583 91.189973l715.240667 0c49.363332 0 89.406183-40.871089 89.406183-91.254929L958.189332 176.126978C958.189332 125.804696 918.146681 84.933607 868.783149 84.933607zM704.662023 530.043622l-67.693904 67.693904-125.803305-125.741947-125.807503 125.805904-67.692904-67.75786 125.741347-125.805904-125.741347-125.805304 67.692904-67.692504 125.807503 125.740948 125.803305-125.806303 67.693904 67.75786-125.741547 125.805304L704.662023 530.043622zM584.85845 787.403532l-147.33011 0c0 0-29.565355 85.125085-117.947232 85.125085L319.581108 915.124538l383.164215 0 0-42.59612C614.29849 872.528618 584.85845 787.403532 584.85845 787.403532z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-zaixian" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M869.009995 88.003326 154.333946 88.003326c-49.324958 0-89.333632 40.838312-89.333632 91.12142l0 455.863325c0 50.27971 40.008874 91.118022 89.333632 91.118022l714.67625 0c49.322359 0 89.334231-40.838112 89.334231-91.183977L958.344426 179.124945C958.344227 128.841637 918.332555 88.003326 869.009995 88.003326zM585.308145 789.916629l-147.208792 0c0 0-29.546368 85.057131-117.858892 85.057131l0 42.562942 382.862419 0L703.10288 874.97376C614.725 874.97376 585.308145 789.916629 585.308145 789.916629zM480.429453 569.318794l-64.206268 64.177288-64.238246-64.177288-128.446513-128.455107 64.206268-64.201871 128.456107 128.406141L735.576863 185.717875l64.228253 64.204869L480.429453 569.318794z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)

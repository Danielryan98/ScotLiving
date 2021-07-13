
function init(){

var d = new Date();
var n = d.getDay();
var t = d.getHours();

    if(n == '1' && t >= 9 && t <= 16){
        document.getElementById('Monday').style.color = 'green';
    } else {
        if(n == '1'){
            document.getElementById('Monday').style.color = 'red';
        }
    }

    if(n == '2' && t >= 9 && t <= 16){
        document.getElementById('Tuesday').style.color = 'green';
    } else {
        if(n == '2'){
            document.getElementById('Tuesday').style.color = 'red';
        }
    }

    if(n == '3'){
        document.getElementById('Wednesday').style.color = 'red';
    }

    if(n == '4' && t >= 9 && t <= 16){
        document.getElementById('Thursday').style.color = 'green';
    } else {
        if(n == '4'){
            document.getElementById('Thursday').style.color = 'red';
        }
    }

    if(n == '5' && t >= 9 && t <= 16){
        document.getElementById('Friday').style.color = 'green';
    } else {
        if(n == '5'){
            document.getElementById('Friday').style.color = 'red';
        }
    }

    if(n == '6' && t >= 9 && t <= 16){
        document.getElementById('Saturday').style.color = 'green';
    } else {
        if(n == '6'){
            document.getElementById('Saturday').style.color = 'red';
        }
    }
    
    if(n == '7'){
        document.getElementById('Sunday').style.color = 'red';
    }
}

init();

function getElementY(query) {
    return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
  }
  
  function doScrolling(element, duration) {
      var startingY = window.pageYOffset
    var elementY = getElementY(element)
    // If element is close to page's bottom then window will scroll only to some position above the element.
    var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
      var diff = targetY - startingY
    // Easing function: easeInOutCubic
    // From: https://gist.github.com/gre/1650294
    var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
    var start
  
    if (!diff){ return}else{
      // Bootstrap our animation - it will get called right before next frame shall be rendered.
      window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp
      // Elapsed miliseconds since start of scrolling.
      var time = timestamp - start
          // Get percent of completion in range [0, 1].
      var percent = Math.min(time / duration, 1)
      // Apply the easing.
      // It can cause bad-looking slow frames in browser performance tool, so be careful.
      percent = easing(percent)
  
      window.scrollTo(0, startingY + diff * percent)
  
          // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step)
      }
    })
  }
  
  // Apply event handlers. Example of firing the scrolling mechanism.
  document.getElementById('scrollMid').addEventListener('click', doScrolling.bind(null, '#middle', 1000))
  document.getElementById('scrollTop').addEventListener('click', doScrolling.bind(null, '#top', 1500))
  document.getElementById('scrollBot').addEventListener('click', doScrolling.bind(null, '#bottom', 4000))}

  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
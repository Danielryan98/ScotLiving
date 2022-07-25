function move(){
    window.open("product.html","_self");
}

var checks = document.querySelectorAll('.product-photo');  

checks.forEach(function(check){
    check.addEventListener('click', checkIndex);
    })

    
function checkIndex(event){
  console.log( Array.from(checks).indexOf(event.target) );
  var indexOfProduct = Array.from(checks).indexOf(event.target);
  localStorage.setItem("productIndex", indexOfProduct);
}
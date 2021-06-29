window.onload = function () {
    buildImages();
    document.getElementById("productName").innerHTML=(fabricSofasData[productNumber].productName);
    document.getElementById("price").innerHTML='£'+(fabricSofasData[productNumber].price);
};

function buildImages() {
    var img = document.getElementById("bigImg")
    img.src = fabricSofasData[productNumber].photoOne;
    var imgOne = document.getElementById("photoOne")
    imgOne.src = fabricSofasData[productNumber].photoOne;
    var imgTwo = document.getElementById("photoTwo")
    imgTwo.src = fabricSofasData[productNumber].photoTwo;
    var imgThree = document.getElementById("photoThree")
    imgThree.src = fabricSofasData[productNumber].photoThree;
    var imgFour = document.getElementById("photoFour")
    imgFour.src = fabricSofasData[productNumber].photoFour;
  }

  function changeImage(smallImg){
    var fullImg = document.getElementById("bigImg");
    fullImg.src = smallImg.src;
}


var productNumber = localStorage.getItem("productIndex");
console.log(productNumber);

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("bigImg");
var modalImg = document.getElementById("img01");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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
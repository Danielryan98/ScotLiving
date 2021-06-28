window.onload = function () {
    buildImages();
    document.getElementById("productName").innerHTML=(fabricSofasData[productNumber].productName);
    document.getElementById("price").innerHTML=(fabricSofasData[productNumber].price);
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

function enlargeImage(fullImg){
    var enlargeImg = document.getElementById("enlargeImg");
    var fullImg = document.getElementById("bigImg");
    enlargeImg.src = fullImg.src;
}

var productNumber = localStorage.getItem("productIndex");
console.log(productNumber);
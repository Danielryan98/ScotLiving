const fabricSofasData = [
    {
        productName: "Orka: Left Hand Facing Arm Open End Corner Sofa",
        price: 799,
        inCart: 0,
        cataloguePhoto: "Pictures/orka.jpg",
        photoOne: "Pictures/orka1.jpg",
        photoTwo: "Pictures/orka2.jpg",
        photoThree: "Pictures/orka3.jpg",
        photoFour: "Pictures/orka4.jpg"
    },
    {
        productName: "Product numero 9",
        price: 500,
        inCart: 0,
        cataloguePhoto: "Pictures/fabric-9.jpg"
    },
    {
        productName: "Product numero 5",
        price: 500,
        inCart: 0,
        cataloguePhoto: "Pictures/fabric-5.jpg"
    },
    {
        productName: "Product number 4",
        price: 200,
        inCart: 0,
        cataloguePhoto: "Pictures/fabric-4.jpg"
    },
    {
        productName: "Patterdale Velvet Left Hand Facing Small Chaise Sofa",
        price: 1299,
        inCart: 0,
        cataloguePhoto: "Pictures/patterdale.jpg",
        photoOne: "Pictures/patterdale1.jpg",
        photoTwo: "Pictures/patterdale2.jpg",
        photoThree: "Pictures/patterdale3.jpg",
        photoFour: "Pictures/patterdale4.jpg"
    },
    {
        productName: "Product numero 6",
        price: 500,
        inCart: 0,
        cataloguePhoto: "Pictures/fabric-6.jpg"
    },
    {
        productName: "Product numero 7",
        price: 500,
        inCart: 0,
        cataloguePhoto: "Pictures/fabric-7.jpg"
    },
    {
        productName: "Product numero 8",
        price: 500,
        inCart: 0,
        cataloguePhoto: "Pictures/fabric-8.jpg"
    },
    {
        productName: "Niko 3 Seater Sofa",
        price: 349,
        inCart: 0,
        cataloguePhoto: "Pictures/niko.jpg",
        photoOne: "Pictures/niko1.jpg",
        photoTwo: "Pictures/niko2.jpg",
        photoThree: "Pictures/niko3.jpg",
        photoFour: "Pictures/niko4.jpg"
    },
    {
         productName: "Product numero 10",
        price: 500,
        inCart: 0,
        cataloguePhoto: "Pictures/fabric-10.jpg"
    },
    {
         productName: "Product numero 11",
        price: 500,
        inCart: 0,
        cataloguePhoto: "Pictures/fabric-11.jpg"
    },
    {
         productName: "Product numero 12",
        price: 500,
        inCart: 0,
        cataloguePhoto: "Pictures/fabric-12.jpg"
    }
];




function move(indexOfProduct){
    window.open("product.html","_self");
}



document.getElementById("app").innerHTML = `
${fabricSofasData.map(function(sofa){
    return `
    <div class="card" style="width: 463px; margin-bottom: 3px; margin: auto;">
    <div class="product-img-container" style="height: 315px;">
    <a href="javascript:move();">
        <img class="product-photo" style="width: 100%; height: 100%;" src="${sofa.cataloguePhoto}">
        </a>
        </div>
          <div class="card-body">
            <p id="prodName" class="card-title">${sofa.productName}</p>
            <p class="product-price">£${sofa.price}</p>
            <p class="product-description">Product Description</p>
          </div>
    </div>
    `
}).join('')}`



var checks = document.querySelectorAll('.product-photo');  

checks.forEach(function(check){
    check.addEventListener('click', checkIndex);
    })

    

function checkIndex(event){
  console.log( Array.from(checks).indexOf(event.target) );
  var indexOfProduct = Array.from(checks).indexOf(event.target);
  localStorage.setItem("productIndex", indexOfProduct);
}




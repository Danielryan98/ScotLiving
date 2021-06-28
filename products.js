const fabricSofasData = [
    {
        productNumber: 1,
        productName: "Orka: Left Hand Facing Arm Open End Corner Sofa",
        price: 799,
        cataloguePhoto: "Pictures/orka.jpg",
        photoOne: "Pictures/orka1.jpg",
        photoTwo: "Pictures/orka2.jpg",
        photoThree: "Pictures/orka3.jpg",
        photoFour: "Pictures/orka4.jpg"
    },
    {
        productNumber: 2,
        productName: "Product numero deus",
        price: 1000,
        cataloguePhoto: "Pictures/fabric-2.jpg",
        photoTwo: "Pictures/fabric-3.jpg"
    },
    {
        productNumber: 3,
        productName: "Product numero 3",
        price: 500,
        cataloguePhoto: "Pictures/fabric-3.jpg"
    },
    {
        productNumber: 4,
        productName: "Product number 4",
        price: 200,
        cataloguePhoto: "Pictures/fabric-4.jpg"
    },
    {
        productNumber: 5,
        productName: "Product numero 5",
        price: 500,
        cataloguePhoto: "Pictures/fabric-5.jpg"
    },
    {
        productNumber: 6,
        productName: "Product numero 6",
        price: 500,
        cataloguePhoto: "Pictures/fabric-6.jpg"
    },
    {
        productNumber: 7,
        productName: "Product numero 7",
        price: 500,
        cataloguePhoto: "Pictures/fabric-7.jpg"
    },
    {
        productNumber: 8,
        productName: "Product numero 8",
        price: 500,
        cataloguePhoto: "Pictures/fabric-8.jpg"
    },
    {
        productNumber: 9,
        productName: "Product numero 9",
        price: 500,
        cataloguePhoto: "Pictures/fabric-9.jpg"
    },
    {
        productNumber: 10,
        productName: "Product numero 10",
        price: 500,
        cataloguePhoto: "Pictures/fabric-10.jpg"
    },
    {
        productNumber: 11,
        productName: "Product numero 11",
        price: 500,
        cataloguePhoto: "Pictures/fabric-11.jpg"
    },
    {
        productNumber: 12,
        productName: "Product numero 12",
        price: 500,
        cataloguePhoto: "Pictures/fabric-12.jpg"
    }
];



function move(indexOfProduct){
    window.open("product.html","_self");
}




document.getElementById("app").innerHTML = `
${fabricSofasData.map(function(sofa){
    return `
    <div class="card" style="width: 500px;">
    <a href="javascript:move();">
        <img class="product-photo" style="min-width: 100%;" src="${sofa.cataloguePhoto}">
        </a>
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



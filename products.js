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
        productName: "Serento",
        price: 999,
        inCart: 0,
        cataloguePhoto: "Pictures/serento1.jpg",
        photoOne: "Pictures/serento1.jpg",
        photoTwo: "Pictures/serento2.jpg",
        photoThree: "Pictures/serento3.jpg",
        photoFour: "Pictures/serento4.jpg",
        description: "Italian sophistication and contemporary style combine in the beautifully designed Serento leather 3 seater sofa. Its comfy foam cushions hug you in a soft yet supportive sit while its padded armrests add extra support. Each sit feels deeply relaxing as you’re cushioned by the soft and durable 100% leather upholstery. It features exquisite stitching detail and elegant dark wood feet, which perfectly complement its clean lines and contemporary silhouette. Perfectly suited to a wide range of interiors, this stylish sofa guarantees a comfy seat when you get home after a long day. Available in a wonderful choice of colours and fabric options. Please call us on 0800 804 8879 to find out more. Only available in the UK at Furniture Village, this beautifully designed and stylish 3 seater leather sofa is part of the contemporary and sophisticated Serento range."
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
    <div id="product-card" class="card" style="width: 463px; margin: auto;">
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




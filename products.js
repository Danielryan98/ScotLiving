const fabricSofasData = [
    {
        productNumber: 1,
        productName: "Pongo Left Hand Facing Arm Open End Corner Sofa",
        price: 799,
        photo: "Pictures/fabric-1.jpg"
    },
    {
        productNumber: 2,
        productName: "Product numero deus",
        price: 1000,
        photo: "Pictures/fabric-2.jpg"
    },
    {
        productNumber: 3,
        productName: "Product numero 3",
        price: 500,
        photo: "Pictures/fabric-3.jpg"
    },
    {
        productNumber: 4,
        productName: "Product number 4",
        price: 200,
        photo: "Pictures/fabric-4.jpg"
    },
    {
        productNumber: 5,
        productName: "Product numero 5",
        price: 500,
        photo: "Pictures/fabric-5.jpg"
    },
    {
        productNumber: 6,
        productName: "Product numero 6",
        price: 500,
        photo: "Pictures/fabric-6.jpg"
    },
    {
        productNumber: 7,
        productName: "Product numero 7",
        price: 500,
        photo: "Pictures/fabric-7.jpg"
    },
    {
        productNumber: 8,
        productName: "Product numero 8",
        price: 500,
        photo: "Pictures/fabric-8.jpg"
    },
    {
        productNumber: 9,
        productName: "Product numero 9",
        price: 500,
        photo: "Pictures/fabric-9.jpg"
    },
    {
        productNumber: 10,
        productName: "Product numero 10",
        price: 500,
        photo: "Pictures/fabric-10.jpg"
    },
    {
        productNumber: 11,
        productName: "Product numero 11",
        price: 500,
        photo: "Pictures/fabric-11.jpg"
    },
    {
        productNumber: 12,
        productName: "Product numero 12",
        price: 500,
        photo: "Pictures/fabric-12.jpg"
    }
];



document.getElementById("app").innerHTML = `
${fabricSofasData.map(function(sofa){
    return `
    <div class="card">
    <a href="product.html">
        <img class="product-photo" src="${sofa.photo}">
        </a>
          <div class="card-body">
            <p class="card-title">${sofa.productName}</p>
            <p class="product-price">£${sofa.price}</p>
          </div>
          </div>
    `
}).join('')}`
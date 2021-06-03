const fabricSofasData = [
    {
        productName: "Pongo Left Hand Facing Arm Open End Corner Sofa",
        price: 799,
        photo: "Pictures/fabric-1.jpg"
    },
    {
        productName: "Product numero deus",
        price: 1000,
        photo: "Pictures/fabric-2.jpg"
    },
    {
        productName: "Product numero 3",
        price: 500,
        photo: "Pictures/fabric-3.jpg"
    },
    {
        productName: "Product number 4",
        price: 200,
        photo: "Pictures/fabric-4.jpg"
    },
    {
        productName: "Product numero 5",
        price: 500,
        photo: "Pictures/fabric-5.jpg"
    },
    {
        productName: "Product numero 6",
        price: 500,
        photo: "Pictures/fabric-6.jpg"
    },
    {
        productName: "Product numero 7",
        price: 500,
        photo: "Pictures/fabric-7.jpg"
    },
    {
        productName: "Product numero 8",
        price: 500,
        photo: "Pictures/fabric-8.jpg"
    },
    {
        productName: "Product numero 9",
        price: 500,
        photo: "Pictures/fabric-9.jpg"
    },
    {
        productName: "Product numero 10",
        price: 500,
        photo: "Pictures/fabric-10.jpg"
    },
    {
        productName: "Product numero 11",
        price: 500,
        photo: "Pictures/fabric-11.jpg"
    },
    {
        productName: "Product numero 12",
        price: 500,
        photo: "Pictures/fabric-12.jpg"
    }
];

document.getElementById("app").innerHTML = `
${fabricSofasData.map(function(sofa){
    return `
    <div class="card">
        <img class="product-photo" src="${sofa.photo}">
          <div class="card-body">
            <p class="card-title">${sofa.productName}</p>
            <p class="product-price">£${sofa.price}</p>
            <p class="customer-savings">Save £800</p>
            <p class="finance">£16.64 a month for 4 years</p>
            <p class="APR-deposit">0% APR - No deposit</p>
          </div>
          </div>
    `
}).join('')}`
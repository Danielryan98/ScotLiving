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

const tempArray = [];

function move(int){
    window.open("product.html","_self");
}

window.onload = function (indexOfProduct) {
    document.getElementById("productName").innerHTML=(fabricSofasData[1].productName);
    document.getElementById("price").innerHTML=(fabricSofasData[2].price);
    document.getElementById("bigImg").innerHTML=(fabricSofasData[3].photo);  
};

function changeImage(smallImg){
    var fullImg = document.getElementById("bigImg");
    fullImg.src = smallImg.src;
}

function enlargeImage(fullImg){
    var enlargeImg = document.getElementById("enlargeImg");
    var fullImg = document.getElementById("bigImg");
    enlargeImg.src = fullImg.src;
}


document.getElementById("app").innerHTML = `
${fabricSofasData.map(function(sofa){
    return `
    <script type = "text/javascript">  
         count();
         document.write(count);
    </script>
    <div class="card" style="width: 500px;">
    <a href="javascript:move(${sofa.productNumber});">
        <img class="product-photo" style="min-width: 100%;" src="${sofa.photo}">
        </a>
          <div class="card-body">
            <p id="prodName" class="card-title">${sofa.productName}</p>
            <p class="product-price">£${sofa.price}</p>
            <p class="product-description">${sofa.productNumber}</p>
          </div>
          </div>
    `
}).join('')}`

// function buildProduct (){
// document.getElementById("demo").innerHTML = `
// ${fabricSofasData.map(function(sofa){
//     return `
//     <script type = "text/javascript">  
//          count();
//          document.write(count);
//     </script>
//     <div class="card" style="width: 500px;">
//     <a href="javascript:move(${sofa.productNumber});">
//         <img class="product-photo" style="min-width: 100%;" src="${sofa.photo}">
//         </a>
//           <div class="card-body">
//             <p id="prodName" class="card-title">${sofa.productName}</p>
//             <p class="product-price">£${sofa.price}</p>
//             <p class="product-description">${sofa.productNumber}</p>
//           </div>
//           </div>
//     `
// }).join('')}`
// };

// document.getElementById("facilities").innerHTML = `
// ${fabricSofasData.map(function(sofa){
//     return `
//     <div class="row justify-content-center">
// 			<div class="col-md-5" style="min-width: 400px;">
// 				<div id="card-one" class="card">
// 					<h5 class="card-title">${sofa.productName}</h5>
// 					<img id="bigImg" src=${sofa.photo} class="card-img-top" onclick="enlargeImage(this)" data-bs-toggle="modal" data-bs-target="#exampleModal" width="100%" alt="Sofa">
// 					<div class="card-body">
// 						<div class="small-img-row">
// 							<div class="small-img-col">
// 								<img src="Pictures/product-sofa1.jpg" onclick="changeImage(this)" alt="Sofa" width="100%" class="small-img">
// 							</div>
// 							<div class="small-img-col">
// 							  <img src="Pictures/product-sofa2.jpg" onclick="changeImage(this)" alt="Sofa" width="100%" class="small-img">
// 						  </div>
// 						  <div class="small-img-col">
// 							  <img src="Pictures/product-sofa3.jpg" onclick="changeImage(this)" alt="Sofa" width="100%" class="small-img">
// 						  </div>
// 						  <div class="small-img-col">
// 							  <img src="Pictures/product-sofa4.jpg" onclick="changeImage(this)" alt="Sofa" width="100%" class="small-img">
// 						  </div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div class="col-md-2" style="min-width: 400px;">
// 				<div id="card-two" class="card">
// 					<h5 class="price">${sofa.price}</h5>
// 					<div class="card-body">
// 						<button class="btn-buy"><i class="fa fa-shopping-basket fa-lg" style="padding-right: 3%;"></i> Add to Basket</button>
// 						<button class="btn-phone"><i class="fa fa-phone fa-lg" style="padding-right: 4%; padding-left: 1%;"></i> Order by Phone</button>
// 						<img src="Pictures/sale.png" alt="">
// 						<img src="Pictures/chair.png" alt="">
// 					</div>
// 				</div>
// 			</div>
// 		</div>
//     `
// }).join('')}`

var checks = document.querySelectorAll('.product-photo');  

checks.forEach(function(check){
    check.addEventListener('click', checkIndex);
    })


function checkIndex(event){
  console.log( Array.from(checks).indexOf(event.target) );
  var indexOfProduct = Array.from(checks).indexOf(event.target);
}



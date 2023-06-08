
class product {
    constructor (id, name, description, price, quantity, group_id, dimensions){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.group_id = group_id;
        this.dimensions = dimensions;
    }

}
let productGroupings = [];
let groupImageCounter = [];

getProducts();


function getProducts(){

    products = [];
    
    $.ajax({
        type: "POST",
        url: 'getShopProducts.php',
        success: function(dataRecieved){
            createProducts(JSON.parse(dataRecieved));
            console.log('products received.')
        },
        error: function (e){
            console.log(e.responseText);
        }
    });
    
}

function createProducts(data){

    for(i = 0; i < data.length; i++){
        const p = new product;
        p.id = data[i][0];
        p.name = data[i][1];
        p.description = data[i][2];
        p.price = data[i][3];
        p.quantity = data[i][4];
        p.group_id = data[i][5];
        p.dimensions = data[i][6];
        products.push(p);
    }

    let groups = new Set();
    let productGroups = [];

    for(i = 0; i < products.length; i++){
        if(products[i].group_id != null){
            groups.add(products[i].group_id);
        }
    }
    groups = [...groups.values()];

    for(i = 0; i < groups.length; i++){
        let grouping = [];
        for(j = 0; j < products.length; j++){
            if(products[j].group_id == groups[i]){
                grouping.push(products[j]);
            }
        }
        productGroups.push(grouping);
    }

    for(i = 0; i < productGroups.length; i++){
        for(j = 0; j < productGroups[i].length; j++){
            for(k = 0; k < products.length; k++){
                if(products[k].id == productGroups[i][j].id){
                    products.splice(k,1);
                    k = 0;
                }
            }
        }
    }
    productGroupings = [...productGroups];
    for(i = 0; i < productGroupings.length; i++){
        groupImageCounter.push(0);
    }
    
    displayGroupedProducts(productGroups);
    displayProducts(products);

}


function displayProducts(products){

    
    for(i = 0; i < products.length; i++){
        let p = products[i];
       
        document.getElementById('shop').innerHTML += `<div class="product">
                                                            <img src="images/`+p.name+`">
                                                            <div class="product-wrapper">
                                                                <div class="product-info">
                                                                    <h2> Art Piece </h2>
                                                                    <p>`+p.description+`</p>
                                                                </div>
                                                                <div class="product-price">
                                                                    <p id="price">$`+ p.price/100+`.00</p>
                                                                    <form action="checkout.php" method="POST">
                                                                    <input name = "id" value="`+p.id+`" hidden></input>
                                                                        <button type="submit" id="checkout-button">Buy Now</button>
                                                                    </form>
                                                                </div>
                                                            </div>  
                                                    </div>`
    }

}

function displayGroupedProducts(productGroups){

    document.getElementById('shop').innerHTML = ``;

   
    for(i = 0; i < productGroups.length; i++){
       
        document.getElementById('shop').innerHTML += `<div class="product"><div id="`+(i+1)+`" class="img-wrapper"></div></div>`
        
        let p = productGroups[i][0];
        document.getElementsByClassName('img-wrapper')[document.getElementsByClassName('img-wrapper').length-1].innerHTML += `<img src="images/`+p.name+`">`;

        document.getElementsByClassName('product')[document.getElementsByClassName('product').length-1].innerHTML += `<button onclick="changeImg(`+(i+1)+`)"><i class="fa-solid fa-arrows-spin"></i></button>
                                                                                                                        <div class="product-wrapper">
                                                                                                                            <div class="product-info">
                                                                                                                                <h2>Art Piece </h2>
                                                                                                                                <p>`+p.description+`</p>
                                                                                                                            </div>
                                                                                                                            <div class="product-price">
                                                                                                                                <p id="price">$`+ p.price/100+`.00</p>
                                                                                                                                <form action="checkout.php" method="POST">
                                                                                                                                <input name = "id" value="`+p.id+`" hidden></input>
                                                                                                                                    <button type="submit" id="checkout-button">Buy Now</button>
                                                                                                                                </form>
                                                                                                                            </div>
                                                                                                                        </div>`                                                       
    }

}

function changeImg(id){

    let indexOfGroup = parseInt(id)-1;
    groupImageCounter[indexOfGroup]++;

    if(groupImageCounter[indexOfGroup] == productGroupings[indexOfGroup].length){
        groupImageCounter[indexOfGroup] = 0;
    }
    
    document.getElementById(id).innerHTML = `<img src="images/`+productGroupings[indexOfGroup][groupImageCounter[indexOfGroup]].name +`">`;
    
    
}


function checkoutProduct(pid){

   
    $.ajax({
        type: "POST",
        url: 'getProductForCheckout.php',
        data: {id: pid},
        success: function(data){
            confirmCheckout(JSON.parse(data));
        },
        error: function (e){
            console.log(e.responseText);
        }
    });

    

}

function confirmCheckout(dataToSend){

    
    console.log(JSON.stringify(dataToSend));

    $.ajax({
        type: "POST",
        url: 'checkout.php',
        data: JSON.stringify(dataToSend),
        success: function(data){
            console.log(data);
        },
        error: function (e){
            console.log(e.responseText);
        }
    });
}
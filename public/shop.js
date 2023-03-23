
class product {
    constructor (id, name, description, price, quantity){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this. quantity = quantity;
    }

}

getProducts();


function getProducts(){

    products = [];
    
    $.ajax({
        type: "POST",
        url: 'getProducts.php',
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
        products.push(p);
    }

   displayProducts(products);

}


function displayProducts(products){

    document.getElementById('shop').innerHTML = ``;
    for(i = 0; i < products.length; i++){
        let p = products[i];
        document.getElementById('shop').innerHTML += `<div class="product">
                                                            <img src="images/`+p.name+`" alt="">
                                                            <div class="product-wrapper">
                                                                <div class="product-info">
                                                                    <h2>`+p.name+`</h2>
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
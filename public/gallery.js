
$.ajax({
    url: 'getProducts.php',
    type: 'POST',
    success: function (data) {
          console.log('recieved data');
          createProductElements(JSON.parse(data));
    },
    error: function (e){
          console.log(e.responseText);
    } 

})

function createProductElements(products){

    document.getElementById('gallery').innerHTML = `<div id="row"></div>`;
    let tileCount = 1;

    for(i = 0; i < products.length; i++){
        document.getElementById('gallery').lastElementChild.innerHTML += `<div class="tile-`+tileCount+` load-hidden">
                                                                                <img src="images/`+products[i][1]+`" alt="">
                                                                            </div>`;
        tileCount++;

        if(tileCount == 4){
            tileCount = 1;
            document.getElementById('gallery').innerHTML += `<div id="row"></div>`;
        }
    }
    
    ScrollReveal().reveal('.tile-1', {delay: 500, easing: 'ease-in'});
    ScrollReveal().reveal('.tile-2', {delay: 1000, easing: 'ease-in'});
    ScrollReveal().reveal('.tile-3', {delay: 1500, easing: 'ease-in'});

}


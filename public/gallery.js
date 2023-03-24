
$.ajax({
    url: 'getProducts.php',
    type: 'POST',
    success: function (data) {
          console.log('recieved data');
          createGroupings(JSON.parse(data));
    },
    error: function (e){
          console.log(e.responseText);
    } 

})

function createGroupings(products){

    let groupIds = new Set;
    let group = [];
    let groupings = [];

    for(i = 0; i < products.length; i++){
       if(products[i][5] != null){
            groupIds.add(products[i][5]);
       }
    }
    groupIds = [...groupIds.values()];

    

    for(i = 0; i < groupIds.length; i++){
        for(j = 0; j < products.length; j++){
            if(groupIds[i] == products[j][5]){
                group.push(products[j]);
                products.splice(j,1);
                j = 0;
            }
        }
        groupings.push(group);
        group = [];
    }

    for(i = 0; i < groupings.length; i++){
        for(j = 0; j < groupings[i].length; j++){
            products.push(groupings[i][j]);
        }
        
    }
    
    createProductElements(products);
}

function createProductElements(products){

    document.getElementById('gallery').innerHTML = `<div id="row"></div>`;
    let tileCount = 1
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
    
    ScrollReveal().reveal('.tile-1', {delay: 200, easing: 'ease-in'});
    ScrollReveal().reveal('.tile-2', {delay: 500, easing: 'ease-in'});
    ScrollReveal().reveal('.tile-3', {delay: 800, easing: 'ease-in'});
    

        
}




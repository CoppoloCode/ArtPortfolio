const gallery = document.getElementById("gallery");

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

function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
      
      while (currentIndex != 0) {
    
        
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
    
      return array;
}


function createProductElements(products){

      let shuffledProducts = shuffle(products); 

      if(window.screen.width >= 1500){
            
            document.getElementById('gallery').innerHTML = `<div id="col"></div>`;
            for(i = 0; i < 5; i++){
                  
                  document.getElementById('col').innerHTML += `<div class="tile">
                                                                  <img src="images/`+shuffledProducts[i][1]+`" alt="">
                                                            </div>`;

            }

            document.getElementById('gallery').innerHTML += `<div id="col-2"></div>`;
            for(i = 5; i < 10; i++){
                  document.getElementById('col-2').innerHTML += `<div class="tile">
                                                                  <img src="images/`+shuffledProducts[i][1]+`" alt="">
                                                            </div>`;

            }
      }else{
            document.getElementById('gallery').innerHTML = ``;
            for(i = 0; i < 10; i++){
                  document.getElementById('gallery').innerHTML += `<div class="tile">
                                                                  <img src="images/`+shuffledProducts[i][1]+`" alt="">
                                                            </div>`;
            }
            
                                                      

      }
      
}







      window.onmousemove = e => {
            const mouseX = e.clientX,
                  mouseY = e.clientY;
            
            const xDecimal = mouseX / window.innerWidth,
                  yDecimal = mouseY / window.innerHeight;
            
            const maxX = gallery.offsetWidth - window.innerWidth,
                  maxY = gallery.offsetHeight - window.innerHeight;
            
            const panX = maxX * xDecimal * -1,
                  panY = maxY * yDecimal * -1;
            
            gallery.animate({
                  transform: `translate(${panX}px, ${panY}px)`
                  }, {
                  duration: 4000,
                  fill: "forwards",
                  easing: "ease"
                  }
            )
      }


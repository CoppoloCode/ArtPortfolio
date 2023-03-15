const gallery = document.getElementById("gallery");


if(window.screen.width < 1500){
      document.getElementById('gallery').innerHTML = `<div class="col">
                                                            <div class="tile">
                                                            <img src="images/1.jpg" alt="">
                                                            </div>
                                                            <div class="tile">
                                                            <img src="images/2.jpg" alt="">
                                                            </div>
                                                            <div class="tile">
                                                            <img src="images/3.jpg" alt="">
                                                            </div>
                                                            <div class="tile">
                                                            <img src="images/4.jpg" alt="">
                                                            </div>
                                                            <div class="tile">
                                                            <img src="images/10.jpg" alt="">
                                                            </div>
                                                      </div>
                                                      <div class="col">
                                                            <div class="tile">
                                                            <img src="images/5.jpg" alt="">
                                                            </div>
                                                            <div class="tile">
                                                            <img src="images/6.jpg" alt="">
                                                            </div>
                                                            <div class="tile">
                                                            <img src="images/7.jpg" alt="">
                                                            </div>
                                                            <div class="tile">
                                                            <img src="images/8.jpg" alt="">
                                                            </div>
                                                            <div class="tile">
                                                            <img src="images/9.jpg" alt="">
                                                            </div>
                                                      </div>`;
}else{
      document.getElementById('gallery').innerHTML = `<div class="tile">
                                                            <img src="images/1.jpg" alt="">
                                                      </div>
                                                      <div class="tile">
                                                            <img src="images/2.jpg" alt="">
                                                      </div>
                                                      <div class="tile">
                                                            <img src="images/3.jpg" alt="">
                                                      </div>
                                                      <div class="tile">
                                                            <img src="images/4.jpg" alt="">
                                                      </div>
                                                      <div class="tile">
                                                            <img src="images/5.jpg" alt="">
                                                      </div>
                                                      <div class="tile">
                                                            <img src="images/6.jpg" alt="">
                                                      </div>
                                                      <div class="tile">
                                                            <img src="images/7.jpg" alt="">
                                                      </div>
                                                      <div class="tile">
                                                            <img src="images/8.jpg" alt="">
                                                      </div>
                                                      <div class="tile">
                                                            <img src="images/9.jpg" alt="">
                                                      </div>
                                                      <div class="tile">
                                                            <img src="images/10.jpg" alt="">
                                                      </div>`;



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
}
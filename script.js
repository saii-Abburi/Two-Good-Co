const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});



function videoconAnimation() {
  var videocon = document.querySelector("#video-container");
  var playBtn = document.querySelector("#play");

  videocon.addEventListener("mouseenter", () => {
    gsap.to(playBtn, {
      scale: 1,
      opacity: 1,
    });
  });

  videocon.addEventListener("mouseleave", () => {
    gsap.to(playBtn, {
      scale: 0,
      opacity: 0,
    });
  });

  videocon.addEventListener("mousemove", (dets) => {
    gsap.to(playBtn, {
      left: dets.x - 50,
      top: dets.y - 60,
    });
  });
}
videoconAnimation()

function loadingAnimation(){
    gsap.from("#page1 h1", {
        y:70,
        opacity : 0,
        delay : 0.5,
        duration: 0.6,
        stagger : 0.2
    
    })
    gsap.from("#page1 #video-container", {
        scale: 0.9,
        opacity : 0,
        delay : 1.2,
        duration: 0.3,
    
    })
}
loadingAnimation();
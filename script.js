function locomotiveAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locomotiveAnimations();

function navbarAnimation() {
  gsap.to("#nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -50%",
      scrub: 2,
    },
  });
  gsap.to("#nav-part2 #links", {
    transform: "translateY(-100%)",
    opacity: "0",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -50%",
      scrub: 2,
    },
  });
}
navbarAnimation();

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
videoconAnimation();

function loadingAnimation() {
  gsap.from("#page1 h1", {
    y: 70,
    opacity: 0,
    delay: 0.5,
    duration: 0.6,
    stagger: 0.2,
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.2,
    duration: 0.3,
  });
}
loadingAnimation();

function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
    });
  });

  // document.querySelector("#child1").addEventListener("mouseenter", function(){
  //   gsap.to("#cursor",{
  //     transform : 'translate(-50% , -50%) scale(1)'
  //   })
  // })
  // document.querySelector("#child1").addEventListener("mouseleave", function(){
  //   gsap.to("#cursor",{
  //     transform : 'translate(-50% , -50%) scale(0)'
  //   })
  // })

  var mouseAnimate = document.querySelectorAll(".child");
  mouseAnimate.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50% , -50%) scale(1)",
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50% , -50%) scale(0)",
      });
    });
  });
}
cursorAnimation();

function white() {
  const navBar = document.getElementById("nav-part1");
  const navLinks = document.querySelectorAll(".nav-links");
  navBar.style.color = "white";
  navLinks.forEach((link) => {
    link.style.color = "white";
  });
}
function black() {
  const navBar = document.getElementById("nav-part1");
  const navLinks = document.querySelectorAll(".nav-links");
  navBar.style.color = "black";
  navLinks.forEach((link) => {
    link.style.color = "black";
  });
}

const menuBtn = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const cart = document.getElementsByClassName("cart")[0];
  cart.style.display = "none";
  const menu = document.getElementsByClassName("menu")[0];
  if (menu.style.display === "block") {
    menu.style.display = "none";
    black();
  } else {
    menu.style.display = "block";
    white();
  }
});

const cartBtn = document.getElementById("cart");
cartBtn.addEventListener("click", () => {
  const menu = document.getElementsByClassName("menu")[0];
  menu.style.display = "none";
  const cart = document.getElementsByClassName("cart")[0];
  if (cart.style.display === "flex") {
    cart.style.display = "none";
    black();
  } else {
    cart.style.display = "flex";
    white();
  }
});

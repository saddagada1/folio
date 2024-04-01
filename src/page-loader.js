function transition(href) {
  gsap.to(".loader-bg", {
    height: "100%",
    ease: "power4.inOut",
    duration: 1.5,
  });

  gsap.to(".loader", {
    height: "100%",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 0.25,
  });

  gsap.to(".loader-picture", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 0.5,
  });

  gsap.to(".loader-content", {
    scale: 1,
    ease: "power4.inOut",
    duration: 2,
    delay: 1,
    onComplete: () => (window.location.href = href),
  });
}

document.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    const href = event.target.href;
    if (href.includes("5500")) {
      event.preventDefault();
      transition(href);
    }
  }
});

document.addEventListener("touchstart", function (event) {
  const touchedElement = event.targetTouches[0].target;
  if (touchedElement.tagName === "A") {
    const href = touchedElement.href;
    if (href.includes("5500")) {
      event.preventDefault();
      transition(href);
    }
  }
});

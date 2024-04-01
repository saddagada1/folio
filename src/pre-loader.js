window.onload = function () {
  gsap.fromTo(
    ".pre-loader p",
    { y: -100 },
    { y: 0, ease: "power4.inOut", duration: 1.5, stagger: 0.03 }
  );

  gsap.to(".pre-loader p", {
    y: 100,
    ease: "power4.inOut",
    duration: 1.5,
    delay: 2,
    stagger: { each: 0.03, from: "end" },
  });

  gsap.to(".loader-content", {
    scale: 0.5,
    ease: "power4.inOut",
    duration: 2,
    delay: 3,
  });

  gsap.to(".loader-picture", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 3.5,
  });

  gsap.to(".loader", {
    height: 0,
    ease: "power4.inOut",
    duration: 1.5,
    delay: 3.75,
  });

  gsap.to(".loader-bg", {
    height: 0,
    ease: "power4.inOut",
    duration: 1.5,
    delay: 4,
  });
};

const $ba = document.getElementsByClassName('.ba');
gsap.utils.toArray('.ba').forEach($ba => {
console.log($ba);
let tl = gsap.timeline({
	scrollTrigger: {
		trigger: ".ba",
		start: "center center",
		end: () => "+=" + $ba.offsetWidth,
		scrub: true,
		pin: true,
		anticipatePin: 1
	}
});
tl.fromTo($ba.querySelector(".after-img"), {
		xPercent: 80,
		x: 0
	}, {
		xPercent: 0
	})
});



gsap.utils.toArray(".comparisonSection").forEach(section => {
	let tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "center center",
        // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
				end: () => "+=" + section.offsetWidth, 
				scrub: true,
				pin: true,
        anticipatePin: 1
			},
			defaults: {ease: "none"}
		});
	// animate the container one way...
	tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: 0})
	  // ...and the image the opposite way (at the same time)
	  .fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
});
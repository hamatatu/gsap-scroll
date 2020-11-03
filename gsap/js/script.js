/*********************************
mouse stalker
**********************************/

class Pointer {
	constructor() {
		const pointer = document.querySelector('.pointer');
		const pointerHalfWidth = pointer.clientWidth / 2;
		const pointerHalfHeight = pointer.clientHeight / 2;
		const mouse = {
			x: 0,
			y: 0,
		};
		const tween = {
			x: 0,
			y: 0,
		};
		const diff = {
			x: 0,
			y: 0,
		};
		const force = 2.0;
		const slowColor = [255, 255, 255];
		const fastColor = [255, 231, 96];

		window.addEventListener('mousemove', (e) => {
			mouse.x = e.clientX - pointerHalfWidth;
			mouse.y = e.clientY - pointerHalfHeight;

			gsap.to(pointer, {
				duration: 0.4,
				ease: "power2.out",
				x: mouse.x,
				y: mouse.y,
			});

			gsap.to(tween, {
				duration: 0.6,
				x: mouse.x,
				y: mouse.y,
			});
		});

		const raf = () => {
			window.requestAnimationFrame(() => {
				diff.x = Math.abs((mouse.x - tween.x) / window.innerWidth);
				diff.y = Math.abs((mouse.y - tween.y) / window.innerHeight);
				this.diffXY = diff.x * force + diff.y * force;
				if (this.diffXY >= 1.0) {
					this.diffXY = 1.0;
				}
				gsap.to(pointer, {
					duration: 0.4,
					ease: "power2.out",
					scaleX: 1.0 - diff.y * force,
					scaleY: 1.0 - diff.x * force,
					backgroundColor: this.colorMixer(fastColor, slowColor, this.diffXY),
				});
				raf();
			});
		}
		raf();
	}

	colorChannelMixer(colorChannelA, colorChannelB, amountToMix) {
		const channelA = colorChannelA * amountToMix;
		const channelB = colorChannelB * (1 - amountToMix);
		return parseInt(channelA + channelB);
	}

	colorMixer(rgbA, rgbB, amountToMix) {
		const r = this.colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
		const g = this.colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
		const b = this.colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
		return "rgb(" + r + ", " + g + ", " + b + ") ";
	}
}

new Pointer();

/*********************************
contents
**********************************/


gsap.to(".box_a", { // 動かす要素
	scrollTrigger: {
		trigger: ".box_a", // この要素まできたらアニメーション開始
		start: "top center", // ビューポート設定 画面上のどこを開始位置にするか
		markers: true // 検証用のマーカーを表示
	},
	left: "50%",
	rotation: 360,
	duration: 3,
});

gsap.to(".box_b", {
	scrollTrigger: {
		trigger: ".box_b",
		start: "top center",
		toggleActions: "play pause resume reset", // スクロールを戻したらもう一度開始させる
		markers: true
	},
	left: "50%",
	rotation: 360,
	duration: 3,
});

gsap.to(".box_c", {
	scrollTrigger: {
		trigger: ".box_c",
		start: "top center",
		end: "600px",
		scrub: true, // 要素を追従させる
		markers: true
	},
	rotation: 360,
	duration: 3,
	y: 600,
});

// timelineを作成
const tl = gsap.timeline();
tl.from(".orange", {
		xPercent: -100
	})
	.from(".purple", {
		xPercent: 100
	})
	.from(".green", {
		yPercent: -100
	});

ScrollTrigger.create({
	animation: tl,
	trigger: ".wrapper",
	start: "top",
	scrub: 1, // 1秒遅れて追従させる
	pin: true, // 要素を固定表示させる
	anticipatePin: 1, // ピン留めをどのくらい早く行うかを制御
});
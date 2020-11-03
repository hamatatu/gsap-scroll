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
const app = {};
let mic;
let canvas;
let sound;
let soundGroup;
//setup function
function setup(){
	//setting up the canvas
	canvas = createCanvas(1600, 600);
	canvas.position(0, 0);
	//setting up the mic
	mic = new p5.AudioIn();
	mic.start();
	//no stroke
	noStroke();
	//colormode -- HSB, HSL, or RGB
	colorMode(RGB);
};
//draw function
function draw(){
	fill(random(255), random(255), random(255));
	const diameter = map(mic.getLevel(), 0, 0.9, 1, 1600);
	ellipse(width/2, height/2, diameter, diameter);
};
app.init = function() {
	$('div#sound').on('click',function() {
		// grab the sound
		const sound = $(this).data('sound');
		// use jQuery to grab the audio element with that class
		const audio = $('.' + sound)[0];
		// restart it to zero
		audio.currentTime = 0;
		// stop it
		audio.pause();
		// play it
		audio.play();
		// add the animation  - a separate functions
		addAnimation($(this));
	});
	const addAnimation = function(element) {
		element.addClass('animated wobble').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				// this runs once the animation is finished
				element.removeClass('animated wobble');
		});
	}
}
$(function(){
	app.init();
});

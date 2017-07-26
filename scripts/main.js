const app = {};
let mic;
let canvas;
let sound;
let soundGroup;
app.sound = null;
let value = 0;
let pos = 25;
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
	const x = map(mic.getLevel(), 0, 0.9, 1, 1600);
	const y = map(mic.getLevel(), 0, 0.9, 1, 1600);
	ellipse(width / (Math.random() * 5) , height / (Math.random() * 5 ), x, y);
	triangle(width / (Math.random() * 5) , height / (Math.random() * 5 ), x, y);
	setShakeThreshold(30);
};
function deviceShaken() {
	value = value + 5;
	if (value > 255) {
		value = 0;
	}
};
var saveBtn = $('button#saveBtn');
saveBtn.on('click', function(){
	saveCanvas(canvas, 'myCanvas', 'jpg')
});
app.makeSound = function() {
	$('div#sound').on('click',function() {
		//if the sound is equal to a piece of audio
		if (app.sound !== null) {
			app.sound.pause();
		}
		// grab the sound
		const sound = $(this).data('sound');
		// use jQuery to grab the audio element with that class
		const audio = $('.' + sound)[0];
		app.sound = audio;
		// restart it to zero
		audio.currentTime = 0;
		// stop it
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
	};
	// $('select#colors').change(function () {
	// 	clrmode = $(this).val();
	// 	// $('select#colors option:selected').each(function() {
	// 	// 	clrmode = $(this).text();
	// 	// });
	// }).change();
};
app.init = function() {
	app.makeSound();
}
$(function(){
	app.init();
});

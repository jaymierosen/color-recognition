//app object
const app = {};
//app object variables
app.mic;
app.canvas;
app.sound;
app.audio;
app.value = 0;
app.song = null;
app.saveBtn;
//setup function
//does not loop -- runs once
function setup(){
	//setting up the canvas
	app.canvas = createCanvas(1600, 600);
	app.canvas.position(0, 0);
	//setting up the mic
	app.mic = new p5.AudioIn();
	app.mic.start();
	//no stroke
	noStroke();
	//colormode -- HSB, HSL, or RGB
	colorMode(RGB);
};
//draw function
//loops -- runs forever
function draw(){
	fill(random(255), random(255), random(255));
	// fill(random(255), random(255), random(255), random());
	const x = map(app.mic.getLevel(), 0, 0.1, 0.5, 200);
	const y = map(app.mic.getLevel(), 0, 0.1, 0.5, 200);
	ellipse(width / (Math.random() * 10) , height / (Math.random() * 10), x, y);
	setShakeThreshold(30);
};
function deviceShaken() {
	app.value = app.value + 5;
	if (app.value > 255) {
		app.value = 0;
	}
};
app.makeSound = function() {
	$('div#sound').on('click',function() {
		//if the sound is equal to a piece of audio
		if (app.song !== null) {
			app.song.pause();
		}
		// grab the sound
		const sound = $(this).data('sound');
		// use jQuery to grab the audio element with that class
		app.audio = $('audio.' + sound)[0];
		app.sound = app.audio;
		// restart it to zero
		app.audio.currentTime = 0;
		// stop it
		// play it
		app.audio.play();
		// add the animation  - a separate functions
		addAnimation($(this));
	});
	const addAnimation = function(el) {
		//.one works only once when the element is clicked
		el.addClass('animated tada').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				//this runs once the animation is finished
				el.removeClass('animated tada');
		});
	};
};
//save button
app.saveBtn = $('#btn__save');
app.saveBtn.on('click', function(){
	saveCanvas(app.canvas, 'myCanvas', 'jpg')
});
//init function
app.init = function() {
	app.makeSound();
}
//document ready
$(function(){
	app.init();
});

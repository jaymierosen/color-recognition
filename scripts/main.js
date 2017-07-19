//app
const app = {};
//important info
app.appInfo = {
	client_id: 'O-a-HYqJOWapnOf58H-SLT22JMx8FnEsDbUzquCt',
	client_secret: 'Hfelwk7UUxr1SCWUnJePHnnVCn7jspKQzmBncom5',
	api_key: 'cffd7ff0579747dfb2980d4437f91d6a',
	model: 'eeed0b6733a644cea07cf4c60f87ebb7'
};
//colors array
app.colors = [];
// app.newColors;
//shapes
app.shapes = [
	circle = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
		// r: r,
		// g: g,
		// b: b,
		r: 0,
		g: 0,
		b: 0,
		a: 0
	},
	rectangle = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
		r: 0,
		g: 0,
		b: 0,
		a: 0
	}
]
//making a clarifai app
app.clarifaiApp = new Clarifai.App(app.appInfo.client_id, app.appInfo.client_secret);
//setup function
function setup(){
	createCanvas(600, 600);
	background(235, 235, 235);
};
//draw function
function draw(){
	app.getColors = function(info){
		let colorData = info.data.outputs[0].data.colors;

		app.colors = colorData.map(function(color) {
			return app.hexToRGB(color.raw_hex);
		});


		for(var i in colorData){
			console.log(i);
			// app.colors.push(app.hexToRGB(colorData[i].raw_hex));
			stroke(255, 255, 255);
			fill(app.colors[i].r, app.colors[i].g, app.colors[i].b);
			app.shapes[0].x = app.shapes[0].x + 50;
			app.shapes[0].y = app.shapes[0].y + 50;
			app.shapes[0].w = app.shapes[0].w + 50;
			app.shapes[0].h = app.shapes[0].h + 50;
			ellipse(app.shapes[0].x, app.shapes[0].y, app.shapes[0].w, app.shapes[0].h);
			// stroke(0, 0, 0);
			// fill(app.shapes[1].r, app.shapes[1].g, app.shapes[1].b);
			// app.shapes[1].x = app.shapes[1].x + 50;
			// app.shapes[1].y = app.shapes[1].y + 50;
			// app.shapes[1].w = app.shapes[1].w + 50;
			// app.shapes[1].h = app.shapes[1].h + 50;
			// rect(app.shapes[1].x, app.shapes[1].y, app.shapes[1].w, app.shapes[1].h);
			// app.colors.forEach(function(color){
			// 	app.newColors = [];
			// 	app.newColors.push(color);
			// });
			console.log(app.colors[i]);
		};

	};
}
//running the api call
app.clarifaiCheck = function(imageUrl){
	app.clarifaiApp.models.predict(app.appInfo.model, imageUrl)
		.then(function(res){
			app.getColors(res);
		});
	};
//converting hex to RGB or RGBA
//thank you --> https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
app.hexToRGB = function(hex, alpha){
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
	if(alpha) {
        return { r: r, g: g, b: b,  a: alpha };
    } else {
        return { r: r, g: g, b: b };
    }
}
//getting value from url input
app.getVal = function(){
	$('form#main__form').on('submit', function(e){
		e.preventDefault();
		let inputVal = $('input#url').val();
		app.clarifaiCheck(inputVal);
	});
};
//init function
app.init = function(){
	app.clarifaiCheck();
	app.getVal();
};
// document ready
$(function(){
  app.init();
});

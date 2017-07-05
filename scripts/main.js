//app
let app = {};
//important info
app.importantInfo = {
	client_id: 'O-a-HYqJOWapnOf58H-SLT22JMx8FnEsDbUzquCt',
	client_secret: 'Hfelwk7UUxr1SCWUnJePHnnVCn7jspKQzmBncom5',
	api_key: 'cffd7ff0579747dfb2980d4437f91d6a',
	model: 'eeed0b6733a644cea07cf4c60f87ebb7'
};
//hex code(s) var
let hex;
//hex code(s) array
app.hexArray = [];
//new hex code(s) array with comma separation
app.newHexArray;
//making a clarifai app
app.clarifaiApp = new Clarifai.App(app.importantInfo.client_id, app.importantInfo.client_secret);
//user image url selection
app.userImage = 'https://avatars0.githubusercontent.com/u/13894677?v=3&u=3f70c212a0f228b9e5e67f787435ae0ce4555cad&s=400';
function setup(){
	createCanvas(500, 500);
};
function draw(){
	background(133, 3, 233);
	translate(width/2, height/2);
	ellipse(0, 0, 300);
};
app.clarifaiCheck = function(){
	app.clarifaiApp.models.predict(app.importantInfo.model, app.userImage)
		.then(function(res){
			app.getColors(res);
			app.sendVal();
		});
	};
app.getColors = function(info){
	let colorData = info.data.outputs[0].data.colors;
	for(var i in colorData){
		hex = colorData[i].raw_hex;
		app.hexArray.push(hex);
	};
	app.displayColors();
};
app.displayColors = function(){
	newHexArray = app.hexArray.join(', ');
	$('div#colors').append(newHexArray);
};
app.getVal = function(){
	$('input#text').change(function(e){
		e.preventDefault();
		var inputVal = $('input#text').val();
	});
};
app.sendVal = function(){
	$('form').on('submit', function(e){
		e.preventDefault();
	});
};
app.init = function(){
	app.clarifaiCheck();
	app.getVal();
};
// document ready
$(function(){
  app.init();
});

//app
let app = {};
//important info
app.importantInfo = {
	client_id: 'O-a-HYqJOWapnOf58H-SLT22JMx8FnEsDbUzquCt',
	client_secret: 'Hfelwk7UUxr1SCWUnJePHnnVCn7jspKQzmBncom5',
	api_key: 'cffd7ff0579747dfb2980d4437f91d6a',
	model: 'eeed0b6733a644cea07cf4c60f87ebb7'
};
//colors array
app.colors = [];
//making a clarifai app
app.clarifaiApp = new Clarifai.App(app.importantInfo.client_id, app.importantInfo.client_secret);
//user image url selection
app.userImage = 'https://pbs.twimg.com/media/DEA9kLSUQAA_KDL.jpg';
function setup(){
	createCanvas(500, 500);
};
function draw(){
	background(0, 0 ,0);
	translate(width/2, height/2);
	for(var i = 0; i < app.colors.length; i++){
		//map(value,start1,stop1,start2,stop2)
		let size = map(app.colors[i].value, 2, app.colors[0].value, 2, width);
		fill(app.colors[i].raw_hex);
		noStroke();
		ellipse(0, 0, size);
	}
};
console.log(app.colors);
app.clarifaiCheck = function(imageUrl){
	app.clarifaiApp.models.predict(app.importantInfo.model, imageUrl)
		.then(function(res){
			app.getColors(res);
			// console.log(res);
		});
	};
app.getColors = function(info){
	let colorData = info.data.outputs[0].data.colors;
	for(var i in colorData){
		app.colors.push(colorData[i]);
		console.log(colorData[i].raw_hex);
	};
};
app.sendVal = function(){
	$('form#main__form').on('submit', function(e){
		e.preventDefault();
		var inputVal = $('input#text').val();
		app.clarifaiCheck(inputVal);
	});
};
app.init = function(){
	app.clarifaiCheck();
	// app.getVal();
	app.sendVal();
};
// document ready
$(function(){
  app.init();
});

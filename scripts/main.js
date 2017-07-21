const app = {};
app.importantInfo = {
	client_id: '55c06bc6b9bd4e68a348ea62efaab485',
	client_secret: 'e8d12fcc701c447492ccbe15b2c80d75'
}
app.getArists = (artist) => $.ajax({
	url: `https://api.spotify.com/v1/search?=${app.client_id}`,
	method: 'GET',
	dataType: 'json',

});
// app.getAristsAlbums = (id) => $.ajax({
// 	url: `https://api.spotify.com/v1/artists/${id}/albums`,
// 	method: 'GET',
// 	dataType: 'json',
// 	data: {
// 		album_type: 'album',
// 	}
// });
// app.getAlbumTracks = (id) => $.ajax({
// 	url: `https://api.spotify.com/v1/albums/${id}/tracks`,
// 	method: 'GET',
// 	dataType: 'json'
// });
var mic;
//setup function
function setup(){
	var canvas = createCanvas(640, 480);
	canvas.position(0, 0);
	noStroke();
	colorMode(HSB);
	mic = new p5.AudioIn();
	mic.start();
};
//draw function
function draw(){
	fill(random(255), 255, 255);
	var d = map(mic.getLevel(), 0, 0.5, 1, 50);
	var y = map(mic.getLevel(), 0, 0.5, height, 0);
	ellipse(50, y, d, d);
};
app.init = function(){
	app.getArists();
	console.log('hello, world?');
}
$(function(){
	app.init();
});

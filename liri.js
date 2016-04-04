var Twitter = require('twitter');
var keys = require('./keys.js')
var spotify = require('spotify')

var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});



var showTweets = function() {

	var params = {screen_name: 'kjg310'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  	if (!error) {
		  	for (var i = 0; i < 20; i++) {
		  		console.log("===== Tweet " + (i + 1) + " =====")
		  		console.log(tweets[i].text);
		    	console.log(tweets[i].created_at);
			}
	  	}
	});


}

var spotifyInfo = function(song) {
	
	spotify.search({type: 'track', query: song}, function(err, data) {

		console.log(" ")
		console.log("===== Spotify Search Results =====")
		console.log(" ")
		console.log("Song: " + data.tracks.items[0].name)
		console.log("Album: " + data.tracks.items[0].album.name)

		var numOfArtists = data.tracks.items[0].artists.length
		var artistArray = []

		for (var i = 0; i < numOfArtists; i++) {
			artistArray.push(data.tracks.items[0].artists[i].name)
		}

		console.log("Artist(s): " + artistArray)

		// console.log("Artist(s): " + data.tracks.items[0].artists[0].name)


		console.log("Preview URL: " + data.tracks.items[0].preview_url)
		// console.log(data)
		
	})

}

var movieInfo = function() {
	console.log('Coming soon!')
}

switch(process.argv[2]) {
	case 'my-tweets': 
		showTweets();
		break;
	case 'spotify-this-song':
		spotifyInfo(process.argv[3]);
		break;
	case 'movie-this':
		movieInfo();
		break;
	default:
		console.log("I'm sorry Dave, I'm afraid I can't do that..");
}

// var params = {screen_name: 'kjg310'};
// client.get('statuses/user_timeline', params, function(error, tweets, response){
//   	if (!error) {
// 	  	for (var i = 0; i < 20; i++) {
// 	  		console.log("===== Tweet " + (i + 1) + " =====")
// 	  		console.log(tweets[i].text);
// 	    	console.log(tweets[i].created_at);
// 		}
//   	}
// });

// console.log(keys)
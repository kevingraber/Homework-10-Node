var Twitter = require('twitter');
var keys = require('./keys.js')
var spotify = require('spotify')
var request = require('request')
var fs = require('fs')

fs.appendFile('log.txt', '===== New Command =====' + '\n', function(err) {
	if (err) throw err;
})

for (var i = 2; i < process.argv.length; i++) {
	fs.appendFile('log.txt', process.argv[i] + ' ', function(err) {
		if (err) throw err;
  		console.log('The "data to append" was appended to file!');
	})
}

fs.appendFile('log.txt', '\n', function(err) {
	if (err) throw err;
})

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
	  		console.log(" ")
		  	for (var i = 0; i < 20; i++) {
		  		console.log(" ")
		  		console.log("===== Tweet " + (i + 1) + " =====")
		  		console.log(tweets[i].text);
		    	console.log(tweets[i].created_at);
			}
	  	}
	});

}

var spotifyInfo = function(userSong) {

	var song = "What's My Age Again"

	if (userSong != null) {
		song = userSong
	};
	
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

var movieInfo = function(userMovie) {

	var movie = "Mr. Nobody";

	if (userMovie != null) {
		movie = userMovie;
	};

	request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var json = JSON.parse(body);
			console.log(" ")
			console.log("===== OMDB Search Results =====")
			console.log(" ")
			console.log("Title: " + json.Title)
			console.log("Year: " + json.Year)
			console.log("IMDB Rating: " + json.imdbRating)
			console.log("Country: " + json.Country)
			console.log("Language: " + json.Language)
			console.log("Plot: " + json.Plot)
			console.log("Actors: " + json.Actors)
			console.log("Rotten Tomatoes Rating: " + json.tomatoRating)
			console.log("Rotten Tomatoes URL: " + json.tomatoURL)
		}
	})

}

var doWhatItSays = function() {
	fs.readFile('./random.txt', 'utf8', function(err, data) {

		if (err) throw err;

		var split = data.split(",")

		switch(split[0]) {
			case 'my-tweets': 
				showTweets();
				break;
			case 'spotify-this-song':
				spotifyInfo(split[1]);
				break;
			case 'movie-this':
				movieInfo(split[1]);
				break;
			case 'do-what-it-says':
				doWhatItSays();
				break;
			default:
				console.log("I'm sorry Dave, I'm afraid I can't do that..");
		}		

	})
}

switch(process.argv[2]) {
	case 'my-tweets': 
		showTweets();
		break;
	case 'spotify-this-song':
		spotifyInfo(process.argv[3]);
		break;
	case 'movie-this':
		movieInfo(process.argv[3]);
		break;
	case 'do-what-it-says':
		doWhatItSays();
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

// console.log( "spotify-this-song,'I Want it That Way'".split(",") )
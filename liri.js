// Requiring the external files and node packages liri needs
var Twitter = require('twitter');
var keys = require('./keys.js')
var spotify = require('spotify')
var request = require('request')
var fs = require('fs')

// Saving the date which will be displayed in the log
var time = Date()

// Creates a heading for the log data
fs.appendFileSync('log.txt', '===== New Command ' + time + ' =====' + '\n' + 'User Input: ', 'utf8', function(err) {
	if (err) throw err;
})

// Logs the user inputs
for (var i = 2; i < process.argv.length; i++) {
	fs.appendFileSync('log.txt', process.argv[i] + ' ', 'utf8', function(err) {
		if (err) throw err;
  		console.log('The "data to append" was appended to file!');
	})
}

// Grabbing the twitter keys from keys.js and saving them
var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});


// This function will log my last 20 tweets to the console and write it to log.txt
var showTweets = function() {

	var params = {screen_name: 'kjg310'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  	if (!error) {
	  		console.log(" ")
		  	for (var i = 0; i < 20; i++) {
		  		console.log(" ");
		  		console.log("===== Tweet " + (i + 1) + " =====");
		  		console.log(tweets[i].text);
		    	console.log(tweets[i].created_at);

		    	var twitterData = "Tweet " + (i + 1) + " " + tweets[i].text + " " + tweets[i].created_at;

		    	fs.appendFileSync('log.txt', '\n' + twitterData + '\n', 'utf8', function(err) {
					if (err) throw err;
			  		console.log('The "data to append" was appended to file!');
				})
			}
			fs.appendFileSync('log.txt', '\n' , 'utf8', function(err) {
				if (err) throw err;
			})
	  	}
	});

}

// This function will search Spotify for the song, and then log the results to the console and log.txt
var spotifyInfo = function(userSong) {

	// This is the default song search term
	var song = "What's My Age Again"

	// If the user enters a song it will become the search term
	if (userSong != null) {
		song = userSong
	};
	
	// Using the node sporitfy package to search for the song
	spotify.search({type: 'track', query: song}, function(err, data) {

		// Logging the results to the console
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
		console.log("Preview URL: " + data.tracks.items[0].preview_url)

		// Writing the spotify data to log.txt
		var spotifyData = "Song: " + data.tracks.items[0].name + '\n' + "Album: " + data.tracks.items[0].album.name + '\n' + "Artist(s): " + artistArray + '\n' + "Preview URL: " + data.tracks.items[0].preview_url + '\n';
		fs.appendFileSync('log.txt', '\n' + spotifyData + '\n', 'utf8', function(err) {
			if (err) throw err;
	  		console.log('The "data to append" was appended to file!');
		})
		
	})

}

// This function will use the node request package to make a call to the OMDB API and then log the results
var movieInfo = function(userMovie) {

	// This is the default movie search term
	var movie = "Mr. Nobody";

	// If the user enters a movie, that movie will become the search term
	if (userMovie != null) {
		movie = userMovie;
	};

	// Using the node request pakcage to make an OMDB API call
	request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
		if (!error && response.statusCode == 200) {

			// Turning the results of the API call into JSON so we can better access it
			var json = JSON.parse(body);

			// Logging the results to the console
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

			// Writing the data to log.txt
			var movieData = "Title: " + json.Title + '\n' + "Year: " + json.Year + '\n' + "IMDB Rating: " + json.imdbRating + '\n' + "Country: " + json.Country + '\n' + "Language: " + json.Language + '\n' + "Plot: " + json.Plot + '\n' + "Actors: " + json.Actors + '\n' + "Rotten Tomatoes Rating: " + json.tomatoRating + '\n' + "Rotten Tomatoes URL: " + json.tomatoURL + '\n';
			fs.appendFileSync('log.txt', '\n' + movieData + '\n', 'utf8', function(err) {
				if (err) throw err;
		  		console.log('The "data to append" was appended to file!');
			});

		}

	})

}

// This function uses the fs node package to read random.txt and execute whichever command it finds
var doWhatItSays = function() {

	fs.readFile('./random.txt', 'utf8', function(err, data) {

		if (err) throw err;

		// Turns the string into an array with 2 items
		var split = data.split(",")

		// Passes the command into a switch statement which will run the appropriate function
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
				invalidCommand();
		}		

	})

}

// This function runs when the user inputs something that isn't one of the 4 accepted commands
var invalidCommand = function() {
	console.log("I'm sorry Dave, I'm afraid I can't do that...");
	fs.appendFileSync('log.txt', '\n' + 'Unrecognized Command...' + '\n' + '\n', 'utf8', function(err) {
		if (err) throw err;
  		console.log('The "data to append" was appended to file!');
	});
}

// This switch statement takes in the command the user inputs and runs the appropriate function
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
		invalidCommand();
}

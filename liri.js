var Twitter = require('twitter');
var keys = require('./keys.js')

var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});
 
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

// console.log(keys)
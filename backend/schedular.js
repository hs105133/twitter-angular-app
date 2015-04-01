var sails = require("sails");
var Twit = require('twit');

function checkPosts(){
	Post.find().where({
		datetime: {"<": new Date()}
	}).populate("owner").exec(function(err, posts){
		posts.forEach(function(post){
			if(post.owner && post.owner.twitterToken){
				sendTweet(post.owner.twitterToken, post.owner.twitterSecret, post);
			}
			
		});
	});
}

function sendTweet(token , secret, msg){
	console.log(msg);
	var T = new Twit({
	    consumer_key: config.TWITTER_KEY,
	    consumer_secret: config.TWITTER_SECRET,
	    access_token: token,
	    access_token_secret: secret
	});

	T.post('statuses/update', {
	    status: msg
	}, function(err, data, response) {
	   console.log(data, err);
	   console.log("send successfull");
	});

}
sails.load(function(){
	checkPosts();
});



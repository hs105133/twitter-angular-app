var sails = require("sails");
var Twit = require('twit');


function updateSentPost(post){
	post.isPosted = true;
	post.save(function(){
		console.log("post updated!");
	})
}

function checkPosts(){
	Post.find().where({
		datetime: {"<": new Date()},
		isPosted: false
	}).populate("owner").exec(function(err, posts){
		posts.forEach(function(post){
			if(post.owner && post.owner.twitterToken){
				sendTweet(post.owner.twitterToken, post.owner.twitterSecret, post, function(){
					updateSentPost(post);
				});
			}
			
		});
	});
}

function sendTweet(token , secret, msg, cb){
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
	   cb();
	});

}
sails.load(function(){
	setInterval(function(){
		checkPosts();
	}, config.schedularInterval);

	
});



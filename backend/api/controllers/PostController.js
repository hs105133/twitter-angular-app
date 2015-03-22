/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Twit = require('twit');

module.exports = {
    tweet: function(req, res) {
        Users.findOne(req.userId, function(err, user){
            var message = req.body.message,
                datetime = req.body.datetime;

            Post.create({
                message: message,
                datetime: datetime,
                owner: req.userId
            }).exec(function(err, post){
                res.json(post);
            });

            // var T = new Twit({
            //     consumer_key: config.TWITTER_KEY,
            //     consumer_secret: config.TWITTER_SECRET,
            //     access_token: "328994441-IFGawBxLpU2AsndKog8Bq0kFU2gfODNMsSb8RGI0",
            //     access_token_secret: "2Jc0XTVswyV5gPWbEGZmj3xdJNVxk5UiEg2QSGDCJfjWO"
            // });

            // T.post('statuses/update', {
            //     status: req.body.message
            // }, function(err, data, response) {
            //     res.status(200).end();
            // });
        });
    },
    myPosts: function(req, res){
        Post.find({owner: req.userId}, function(err, posts){
            res.json(posts);
        });
    }
};

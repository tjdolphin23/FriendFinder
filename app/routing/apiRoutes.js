var friends = require('../data/friends.js');

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {

		var bestMatch = {
			name: "",
			photo: "",
			difference: 1000
		};

		console.log(req.body);

		//parse results of post survey
		var userData = req.body;
		var userScore = userData.scores;

		console.log(userScore);

		//variable to figure out the difference in scores for each user in db
		var totalDifference = 0;

		//loop thru all the friends in database
		for (var i = 0; i < friends.length; i++) {
			console.log(friends[i]);
			totalDifference = 0;

			//loop through the scores of each user in db
			for (var j = 0; j < friends[i].scores[j]; j++) {

				//determine scores difference between each user
				totalDifference += Math.abs(parseInt(userScore[j]) - parseInt(friends[i].scores[j]));

				//if total difference is less than current user then that user is best match
				if(totalDifference <= bestMatch.difference) {

					//set user with closest score as best friend 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.difference = totalDifference;
				}
			}
		}
		//push users data/score to the database 
		friends.push(userData);

		//return the best match in json format
		res.json(bestMatch);
	})
}
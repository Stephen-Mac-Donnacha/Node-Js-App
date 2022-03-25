var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

// Pass in the mongoose connection string for database access
mongoose.connect('mongodb+srv://smacdonnacha:passwd@cluster0.lqgiz.mongodb.net/languages?retryWrites=true&w=majority');

// Create schema, includes Name & Votes
var languageSchema = new mongoose.Schema({
  Name: String, 
  Votes: Number
});

var language = mongoose.model('languages', languageSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/languagePage', function(req,res){
        // Render the data from mongoDB
          language.find({}, function(err, data){
            if (err) throw err;
            res.render('languages', {languages: data});
        });
    });

    // Method to update the votes per language
    app.put('/languagePage', urlencodedParser, function(req,res){
        //get the name from the passed in data from req.body
        var obj = JSON.parse(JSON.stringify(req.body));
        //log on the console to see whats passed in - test
        console.log(obj)
        //if the object is null then log "empty" and send an error
        if(Object.keys(obj).length === 0){
            console.log("empty")
            return res
                .status(500)
                .send({error: "unsuccessful"})
        }

        // Find language in the database and increment the number of votes
            language.findOneAndUpdate(obj, {$inc : {'Votes': 1}}, (err, user) => {
                if (err) {
                    return res
                        .status(500)
                        .send({error: "unsuccessful"})
                };
                // Display the updated languages and their votes
                language.find({}, function(err, data){
                    if (err) throw err;
                    res.render('languages', {languages: data});
                });
            });
    });
};

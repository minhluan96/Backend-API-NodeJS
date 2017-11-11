'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');

var db = mongoose.connection;

db.on('error', function(err) {
    console.log("Connection error: ", err);
});

db.once('open', function() {
    console.log('db connection successful');

    // var Schema = mongoose.Schema;
    // var AnimalSchema = new Schema({
    //     type: {type: String, default: "goldfish"},
    //     size: {type: String, default: "small" },
    //     color: {type: String, default: "golden"},
    //     mass: {type: Number, default: 0.007 },
    //     name: {type: String, default: "Angela"}  
    // });

    // var Animal = mongoose.model("Animal", AnimalSchema);

    // var elephant = new Animal({
    //     type: "elephant",
    //     size: "big",
    //     color: "gray",
    //     mass: 6000,
    //     name: "Lawrence"
    // });

    // Animal.remove({}, function(){

    // });

    // Animal.find({size: "big"}, function(err, animals) {
    //     animals.forEach(function(animal) {
    //         console.log(animal.name)
    //     })
    // })
    
    // var animal = new Animal({});

    // elephant.save(function(err) {
    //     if (err) console.log("Save failed: ", err);
    //     else console.log("Saved");
    //      db.close(function() {
    //          console.log("db connection closed");
    //      });
    // });
})
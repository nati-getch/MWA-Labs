var express = require('express');
var MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');

var router = express.Router();

const url = "mongodb://localhost:27017/mydb";
//const encrypted = "ba12e76147f0f251b3a2975f7acaf446a86be1b4e2a67a5d51d62f7bfbed5c03";

function decrypt(encrypted){
    var decipher = crypto.createDecipher('aes256', 'asaadsaad');
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

router.get('/', function(req, res, next) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("homework7").findOne({}, function(err, result) {
      if (err) throw err;

      let msg = decrypt(result.message)
      res.render('secret', { title: 'Decrypted Message', message: msg } );
        
      db.close();
      
    });
  });

});

module.exports = router;

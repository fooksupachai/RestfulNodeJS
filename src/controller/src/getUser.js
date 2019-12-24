const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const {dbName, url} = require('../../config');

const getUser = async ( req, res ) => {

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
      
        const db = client.db(dbName);
      
        const findDocuments = function(db, callback) {
            // Get the documents collection
            const collection = db.collection('documents');
            // Find some documents
            collection.find({}).toArray(function(err, docs) {
              assert.equal(err, null);
              console.log("Found the following records");
              console.log(docs)
              callback(docs);
            });
        }
        
        findDocuments(db, function(result) {
            res.json(result);
            client.close();
        });
      });

}

module.exports = getUser;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const {dbName, url} = require('../../config');

const createUser = async ( req, res ) => {

    MongoClient.connect(url, function(err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
        
        const insertDocuments = async (db, callback) => {
            // Get the documents collection
            const collection = db.collection('documents');
            // Insert some documents
            collection.insertMany([
              {a : 1}, {a : 2}, {a : 3}
            ], function(err, result) {
              assert.equal(err, null);
              assert.equal(3, result.result.n);
              assert.equal(3, result.ops.length);
              console.log("Inserted 3 documents into the collection");
              callback(result);
            });
        }
        insertDocuments(db, function(result) {
            res.json(result);
            client.close();
        });
    });
}

module.exports = createUser;

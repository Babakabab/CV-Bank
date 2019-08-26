const mongodb =require('mongodb');
const MongoClient =mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName  = 'cvbank';
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect to the DB');
    }
    console.log("We did it babyy");
    const db = client.db(databaseName);
    db.collection('Candidates').insert

});
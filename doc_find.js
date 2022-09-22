var MongoClient = require("mongodb").MongoClient;

var findProduct = function (pnm) {
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://localhost", function (err, db) {
      var myDB = db.db("legalcliq");
      var coll = myDB.collection("products");

      console.log("calling with pnm value: " + pnm);

      var item = coll.findOne({ _id: parseInt(pnm) });
      resolve(item);
    });
  });
};

var findProductAll = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://localhost", function (err, db) {
      console.log("connected to mongoDB");
      var myDB = db.db("legalcliq");
      console.log(myDB.databaseName);
      var coll = myDB.collection("products");

      var items = coll.find().toArray();
      // console.log(items);
      resolve(items);
    });
  });
};

var findSuppliers = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://localhost", function (err, db) {
      console.log("connected to mongoDB");
      var myDB = db.db("legalcliq");
      console.log(myDB.databaseName);
      var coll = myDB.collection("suppliers");

      var items = coll.find().toArray();
      // console.log(items);
      resolve(items);
    });
  });
};
var findSupplier = function (pnm) {
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://localhost", function (err, db) {
      var myDB = db.db("legalcliq");
      var coll = myDB.collection("suppliers");

      console.log("calling with pnm value: " + pnm);

      var item = coll.findOne({ _id: parseInt(pnm) });
      resolve(item);
    });
  });
};

var findUsers = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://localhost", function (err, db) {
      console.log("connected to mongoDB");
      var myDB = db.db("legalcliq");
      console.log(myDB.databaseName);
      var coll = myDB.collection("users");

      var items = coll.find().toArray();
      // console.log(items);
      resolve(items);
    });
  });
};
var findUser = function (pnm) {
  return new Promise((resolve, reject) => {
    MongoClient.connect("mongodb://localhost", function (err, db) {
      var myDB = db.db("legalcliq");
      var coll = myDB.collection("users");

      console.log("calling with pnm value: " + pnm);

      var item = coll.findOne({ _id: parseInt(pnm) });
      resolve(item);
    });
  });
};

const getCart=async(userId)=>{
  return new Promise((resolve,reject)=>{
    MongoClient.connect("mongodb://localhost", async(err, db)=> {
    console.log("connected to mongoDB");
    var myDB = db.db("legalcliq");
    console.log(myDB.databaseName);
    var coll = myDB.collection("cartItems");

    var items = coll.findOne({userId:userId});
    // console.log(items);
    resolve(items);
  });
});

}

module.exports = {
  findProduct,
  findProductAll,
  findSuppliers,
  findSupplier,
  findUsers,
  findUser,
  getCart
};

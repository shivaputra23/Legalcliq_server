var MongoClient = require("mongodb").MongoClient;

module.exports.deleteDocument = (id) => {
  MongoClient.connect("mongodb://localhost/", async (err, db) => {
    var myDB = db.db("legalcliq");
    var products = myDB.collection("products");
    const item = await products.deleteOne({ _id: parseInt(id) });
    console.log("deleted" + item);
  });
};

module.exports.deleteSupplier = (id) => {
  MongoClient.connect("mongodb://localhost/", async (err, db) => {
    var myDB = db.db("legalcliq");
    var suppliers = myDB.collection("suppliers");
    const item = await suppliers.deleteOne({ _id: parseInt(id) });
    console.log("deleted" + item);
  });
};

module.exports.deleteUser = (id) => {
  MongoClient.connect("mongodb://localhost/", async (err, db) => {
    var myDB = db.db("legalcliq");
    var users = myDB.collection("users");
    const item = await users.deleteOne({ _id: parseInt(id) });
    console.log("deleted" + item);
  });
};

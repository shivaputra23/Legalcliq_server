var MongoClient = require("mongodb").MongoClient;

function addObject(collection, object) {
  collection.insertOne(object, function (err, result) {
    if (!err) {
      console.log("Inserted : ");
      console.log(result);
    }
  });
}
function addDocument(id, pName, price, supplier_id, img_path) {
  MongoClient.connect("mongodb://localhost/", function (err, db) {
    var myDB = db.db("legalcliq");
    var products = myDB.collection("products");
    addObject(products, {
      _id: id,
      pName: pName,
      price: price,
      supplier_id: supplier_id,
      img_path: img_path,
    });
  });
}

function addSupplier(id, supplier_id, sName, sLocation, logo) {
  MongoClient.connect("mongodb://localhost/", function (err, db) {
    var myDB = db.db("legalcliq");
    var suppliers = myDB.collection("suppliers");
    addObject(suppliers, {
      _id: id,
      supplier_id: supplier_id,
      sName: sName,
      sLocation: sLocation,
      logo: logo,
    });
  });
}

function addUser(
  id,
  title,
  userName,
  email,
  role,
  password,
  confirmPassword,
  AcceptTerms
) {
  MongoClient.connect("mongodb://localhost/", function (err, db) {
    var myDB = db.db("legalcliq");
    var users = myDB.collection("users");
    addObject(users, {
      _id: id,
      title: title,
      userName: userName,
      email: email,
      role: role,
      password: password,
      confirmPassword: confirmPassword,
      AcceptTerms: AcceptTerms,
    });
  });
}
const createCart = async (id, userId, products) => {
  MongoClient.connect("mongodb://localhost/", async (err, db) => {
    var myDB = db.db("legalcliq");
    var items = myDB.collection("cartItems");
    let item=await items.insertOne({userId:userId,product:products});
    console.log(item);
  });
};

module.exports = { addDocument, addObject, addUser, addSupplier, createCart };

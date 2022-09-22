var MongoClient = require("mongodb").MongoClient;

async function updateObject(collection, object) {
  await collection.updateOne(
    { _id: +object.id },
    {
      $set: {
        pName: object.pName,
        price: object.price,
        supplier_id: object.supplier_id,
        img_path: object.img_path,
      },
    },
    function (err, result) {
      if (!err) {
        console.log("Updated : ");
        console.log(result);
      }
    }
  );
}
module.exports.updateDocument = (id, pName, price, supplier_id, img_path) => {
  MongoClient.connect("mongodb://localhost/", async (err, db) => {
    var myDB = db.db("legalcliq");
    var products = myDB.collection("products");
    await updateObject(products, {
      pName: pName,
      price: price,
      supplier_id: supplier_id,
      img_path: img_path,
      id: id,
    });
  });
};

async function updateSupplierObject(collection, object) {
  await collection.updateOne(
    { _id: +object.id },
    {
      $set: {
        supplier_id: object.supplier_id,
        sName: object.sName,
        sLocation: object.sLocation,
        logo: object.logo,
      },
    },
    function (err, result) {
      if (!err) {
        console.log("Updated : ");
        console.log(result);
      }
    }
  );
}
module.exports.updateSupplier = (id, supplier_id, sName, sLocation, logo) => {
  MongoClient.connect("mongodb://localhost/", async (err, db) => {
    var myDB = db.db("legalcliq");
    var suppliers = myDB.collection("suppliers");
    await updateSupplierObject(
      suppliers,

      {
        id: id,
        supplier_id: supplier_id,
        sName: sName,
        sLocation: sLocation,
        logo: logo,
      }
    );
  });
};

async function updateUserObject(collection, object) {
  await collection.updateOne(
    { _id: +object.id },
    {
      $set: {
        title: object.title,
        userName: object.userName,
        email: object.email,
        role: object.role,
        password: object.password,
        confirmPassword: object.confirmPassword,
        AcceptTerms: object.AcceptTerms,
      },
    },
    function (err, result) {
      if (!err) {
        console.log("Updated : ");
        console.log(result);
      }
    }
  );
}
module.exports.updateUser = (
  id,
  title,
  userName,
  email,
  role,
  password,
  confirmPassword,
  AcceptTerms
) => {
  MongoClient.connect("mongodb://localhost/", async (err, db) => {
    var myDB = db.db("legalcliq");
    var users = myDB.collection("users");
    await updateUserObject(
      users,

      {
        id: id,
        title: title,
        userName: userName,
        email: email,
        role: role,
        password: password,
        confirmPassword: confirmPassword,
        AcceptTerms: AcceptTerms,
      }
    );
  });
};

module.exports.updateCart = async (products, userId) => {
  MongoClient.connect("mongodb://localhost/", async (err, db) => {
    var myDB = db.db("legalcliq");
    var users = myDB.collection("cartItems");
    const items = await users.updateOne(
      { userId: userId },
      {
        $set: {
          product: products,
        },
      }
    );
    console.log(items);
  });
};

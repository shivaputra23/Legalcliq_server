const express = require("express");
const app = express();
const mongoutiladd = require("./doc_add.js");
const {
  updateDocument,
  updateSupplier,
  updateUser,
  updateCart,
} = require("./doc_update");
const { deleteDocument, deleteSupplier, deleteUser } = require("./doc_delete");
const { getCart } = require("./doc_find");

const mongoutil = require("./doc_find.js");
const util = require("./utility/util.js");
const utilencrypt = require("./utility/encypt_password");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-control-Allow-headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  // res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
  next();
});
// Parse URL-encoded bodies (as sent by HTML forms)

// Parse JSON bodies (as sent by API clients)

const port = 3000;

app.get("/products", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var allProducts = mongoutil.findProductAll().then(
    function (items) {
      const objArr = items;
      objArr.forEach((obj) => {
        util.renamekey(obj, "_id", "id");
      });
      const updateItems = JSON.stringify(objArr);
      // console.log(updateItems);
      res.send(updateItems);
    },
    function (err) {
      console.log(err);
    }
  );
});

app.get("/products/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  productid = req.params.id;
  if (productid !== "favicon.ico") {
    mongoutil.findProduct(productid).then(
      function (item) {
        const obj1 = item;
        util.renamekey(obj1, "_id", "id");
        const updateItem = JSON.stringify(obj1);
        // console.log("resolved:", updateItem);
        res.send(updateItem);
      },
      function (err) {
        console.log("error at promise");
      }
    );
  }
});

app.get("/users", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var allUsers = mongoutil.findUsers().then(
    function (items) {
      const objArr = items;
      objArr.forEach((obj) => {
        obj.password = utilencrypt.decryptPassword(obj.password);
        obj.confirmPassword = utilencrypt.decryptPassword(obj.confirmPassword);
        util.renamekey(obj, "_id", "id");
      });
      const updateItems = JSON.stringify(objArr);
      // console.log(updateItems);
      res.send(updateItems);
    },
    function (err) {
      console.log(err);
    }
  );
});

app.get("/users/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  userid = req.params.id;
  if (userid !== "favicon.ico") {
    mongoutil.findUser(userid).then(
      function (item) {
        const obj1 = item;
        util.renamekey(obj1, "_id", "id");
        const updateItem = JSON.stringify(obj1);
        // console.log("resolved:", updateItem);
        res.send(updateItem);
      },
      function (err) {
        console.log("error at promise");
      }
    );
  }
});

app.get("/suppliers", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var allSuppliers = mongoutil.findSuppliers().then(
    function (items) {
      const objArr1 = items;
      objArr1.forEach((obj2) => {
        util.renamekey(obj2, "_id", "id");
      });
      const updateItems = JSON.stringify(objArr1);
      // console.log(updateItems);
      res.send(updateItems);
    },
    function (err) {
      console.log(err);
    }
  );
});

app.get("/suppliers/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  supid = req.params.id;
  if (supid !== "favicon.ico") {
    mongoutil.findSupplier(supid).then(
      function (item) {
        // console.log(item);
        const obj1 = item;
        util.renamekey(obj1, "_id", "id");
        const updateItem = JSON.stringify(obj1);
        // console.log("resolved:", updateItem);
        res.send(updateItem);
      },
      function (err) {
        console.log("error at promise");
      }
    );
  }
});

//Angular Form use JSON.stringify(myform.value)
app.post("/products", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("method called");
  var id = req.body.id;
  var pName = req.body.pName;
  var price = req.body.price;
  var supplier_id = req.body.supplier_id;
  var img_path = req.body.img_path;
  mongoutiladd.addDocument(id, pName, price, supplier_id, img_path);
  res.send(
    "Data submitted: " +
      id +
      "," +
      pName +
      "," +
      price +
      "," +
      supplier_id +
      "," +
      img_path
  );
});

app.post("/suppliers", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("method called");
  var id = req.body.id;
  var supplier_id = req.body.supplier_id;
  var sName = req.body.sName;
  var sLocation = req.body.sLocation;
  var logo = req.body.logo;
  mongoutiladd.addSupplier(id, supplier_id, sName, sLocation, logo);
  res.send(
    "Data submitted: " +
      id +
      "," +
      sName +
      "," +
      sLocation +
      "," +
      supplier_id +
      "," +
      logo
  );
});

app.post("/users", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("method called");

  var id = req.body.id;
  var title = req.body.title;
  var userName = req.body.userName;
  var email = req.body.email;
  var role = req.body.role;
  var password = req.body.password;
  password = utilencrypt.encryptPassword(password);
  // var decryptedpassword=utilencrypt.decryptPassword(password)
  // console.log(decryptedpassword)
  var confirmPassword = req.body.confirmPassword;
  confirmPassword = utilencrypt.encryptPassword(confirmPassword);
  var AcceptTerms = req.body.AcceptTerms;

  mongoutiladd.addUser(
    id,
    title,
    userName,
    email,
    role,
    password,
    confirmPassword,
    AcceptTerms
  );

  res.json({ id: id, userName: userName });
});
app.post("/cartItems", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("method called");
  var id = req.body.id;
  var userId = req.body.userId;
  var products = req.body.product;

  await mongoutiladd.createCart(id, userId, products);
  res.json({ status: "Cart is created" });
});

app.put("/products/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("method called");
  var id = req.params.id;

  var pName = req.body.pName;
  var price = req.body.price;
  var supplier_id = req.body.supplier_id;
  var img_path = req.body.img_path;

  await updateDocument(id, pName, price, supplier_id, img_path);
  res.send("Updated successfully");
});

app.put("/suppliers/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("method called");
  var id = req.params.id;

  var supplier_id = req.body.supplier_id;
  var sName = req.body.sName;
  var sLocation = req.body.sLocation;
  var logo = req.body.logo;
  await updateSupplier(id, supplier_id, sName, sLocation, logo);
  res.send("Updated successfully");
});

app.put("/users/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("method called");
  var id = req.params.id;

  var title = req.body.title;
  var userName = req.body.userName;
  var email = req.body.email;
  var role = req.body.role;
  var password = req.body.password;
  console.log(password);
  var pwd = utilencrypt.encryptPassword(password);

  var confirmPassword = pwd;
  var AcceptTerms = req.body.AcceptTerms;
  await updateUser(
    id,
    title,
    userName,
    email,
    role,
    pwd,
    confirmPassword,
    AcceptTerms
  );
  res.send("Updated successfully");
});

app.delete("/products/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("method called");
  var id = req.params.id;

  await deleteDocument(id);
  res.send("Deleted Successfully");
});

app.delete("/suppliers/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("method called");
  var id = req.params.id;

  await deleteSupplier(id);
  res.send("Deleted Successfully");
});

app.delete("/users/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("method called");
  var id = req.params.id;

  await deleteUser(id);
  res.send("Deleted Successfully");
});

app.get("/getUserCart/:userId", async (req, res) => {
  var id = +req.params.userId;
  const result = await getCart(id);
  res.send(result);
});

app.post("/updateCart", async (req, res) => {
  let userId = req.body.userId;
  let products = req.body.products;
  await updateCart(products, userId);
  return res.json({ status: "updated successfully" });
});

app.listen(port, () => console.log(`Server is running at ${port}`));

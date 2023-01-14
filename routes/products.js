var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
router.use(
    bodyParser.urlencoded({
        extended: true
    })
)
router.use(bodyParser.json());


var mongoose = require('mongoose');
/*
CONNECT TO MONOGODB
*/
mongoose.connect('mongodb://localhost:27017/Store', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Connected to mongoDB");
  
    //Scheme for a product to be saved
    var productSchema = mongoose.Schema({
        articleNumber: Number,
        productName: String,
        productDescription: String,
        productPrice: Number,
        productsInStock: Number
    });
    // Create scheme model
    var Product = mongoose.model('Product', productSchema)

  /**
   GET ALL PRODUCTS
   */
    router.get('/', function (req, res, next) {
        Product.find(function (err, products) {
            if (err) return console.error(err);
            //save in varible
            var jsonObj = JSON.stringify(products);
            res.contentType('application/json');
            res.send(jsonObj);
        });
    });

    /*
    GET PRODUCT WITH ID
    */
    router.get('/:id', function (req, res, next) {
        //id saved from url
        var id = req.params.id;
        //find the product in database
        Product.findById({ "_id": id }, function (err, storeInventory) {
            if (err) return handleError(err);
            var jsonObj = JSON.stringify(storeInventory);
            res.contentType('application/json');
            res.send(jsonObj);
        });
    });

  /*
  DELETE PRODUCT
  */
    router.delete('/:id', function (req, res, next) {
        //saved id from url
        var id = req.params.id;
        // Delete product from db
        Product.deleteOne({ "_id": id }, function (err) {
            if (err) return handleError(err);
        });
        // Find the product
        Product.find(function (err, storeInventory) {
            if (err) return console.error(err);

            var jsonObj = JSON.stringify(storeInventory);
            res.contentType('application/json');
            res.send(jsonObj);
        });
    });

    /*
    ADD PRODUCT
    */
    router.post('/', function (req, res, next) {
        //  create the product and save the users input in it
        var product1 = new Product({
            articleNumber: req.body.articleNumber,
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productsInStock: req.body.productsInStock
        });
        //save it in database
        product1.save(function (err) {
            if (err) return console.error(err);
        });
        var jsonObj = JSON.stringify(product1);
        res.contentType('application/json');
        res.send(jsonObj);
    });


    /*
    UPDATE PRODUCT
    */
    router.put('/:id', function (req, res, next) {
        //saved id from url
        var id = req.params.id;
        //  create the product and save the users input in it
        var product1 = {
            articleNumber: req.body.articleNumber,
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productsInStock: req.body.productsInStock
        };
        Product.findByIdAndUpdate( id, product1,
            function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({ message: "Product updated" });
                }
            });
    });

}); // DB connection

module.exports = router;

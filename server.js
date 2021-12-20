/**
 * Initial imports
 */
const express = require('express')
const cors = require('cors')
const app = express()


/**
 * Middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


/**
 * Routes
 */
app.get('/', function (req, res) {
  res.send("Navigate to /products")
});

/**
 * Importing the productRoutes module to use the specified routes.
 */
const productRoutes = require('./routes/products');
/**
 * this is middleware
 */
app.use('/products', productRoutes);

/**
 * Starts the server and listens actively via specified port
 */
app.listen(3000, ()=>{
  console.log("The Server is on port 3000");
})



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

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);


app.listen(3000, ()=>{
  console.log("The Server is on port 3000");
})



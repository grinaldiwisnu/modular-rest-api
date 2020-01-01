const express = require('express');
require('dotenv').config();
const app = express();
const userRouter = require('./api/users/user.router');
const productRouter = require('./api/products/products.router');

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);


app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on `, process.env.APP_PORT);
});
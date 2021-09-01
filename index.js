const express = require('express');
const cors = require('cors')
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');
const productsRouter = require('./routers/products');
const paymethodsRouter = require('./routers/paymethods');
const app = express();
app.use(express.json());
app.use(cors());


app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/paymethods', paymethodsRouter);

app.listen(3000, () => {
  console.log(`Listening on PORT 3000`)
});
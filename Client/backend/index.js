const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");
const categoryRouter = require('./routes/categories');
const SlideRouter = require('./routes/slide');
const contactRouter = require('./routes/contacts');
const storeRouter = require('./routes/store');


dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use('/api/contacts', contactRouter);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use('/api/categories', categoryRouter);
app.use('/api/slides',SlideRouter)
app.use('/api/stores', storeRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
// FIRST SETTINGS and CONNECTS ///////////////////////////////////////////

//CORS
const cors = require("cors");

//dotenv
const dotenv = require("dotenv");
dotenv.config();

//express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});

//mongoose
const mongoose = require("mongoose");
const URL = process.env.MONGO_URL;
mongoose
  .connect(URL)
  .then(() => console.log("Conntect to DataBase is SUCCESSFUL"))
  .catch((err) => {
    if (err.code === 8000) {
      console.log("Connect to DataBase is ERROR: Wrond pass or login");
    } else if (err.code === "ENOTFOUND") {
      console.log("Connect to DataBase is ERROR: Problem with Link");
    } else {
      console.log("Connect to DataBase is ERROR", err);
    }
  });

//////////////////////////////////////////////////////////////////////////

// ROUTES ////////////////////////////////////////////////////////////////
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const payRoute = require("./routes/pay");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
app.use("/api/checkout", payRoute);


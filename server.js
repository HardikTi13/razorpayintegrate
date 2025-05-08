const express = require("express");
const Razorpay = require("razorpay");
const app = express();
const cors = require("cors");
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const instance = new Razorpay({
  key_id: "YOUR_KEY_ID",          // Replace with your Razorpay Key ID
  key_secret: "YOUR_KEY_SECRET"   // Replace with your Razorpay Secret
});

app.post("/order", async (req, res) => {
  const options = {
    amount: 100, // amount in smallest currency unit (paise)
    currency: "INR",
    receipt: "receipt#1",
  };
  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

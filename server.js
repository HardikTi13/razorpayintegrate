const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_L1sqG4NKJOJaSb',
  key_secret: 'UXzMnSy51CVYCTaYIQ9lqMhS',
});

app.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating order');
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

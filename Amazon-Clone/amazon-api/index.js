const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
// require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY)


const app = express()
app.use(cors({ origin: true }))

app.use(express.json())


app.get("/", (req, res) => res.status(200).json({
    message:"Success"
}))

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      console.log(paymentIntent);
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).json({ message: "Payment creation failed", error });
    }
  } else {
    res.status(403).json({
      message: "Total must be greater than 0",
    });
  }
});

console.log("Stripe Key:", process.env.STRIPE_KEY);


app.listen(5000, (err) => {
    if (err) throw err
    console.log("Amazon Server Running on Port: 5000, http://localhost:5000")
})

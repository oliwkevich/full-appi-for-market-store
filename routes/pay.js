const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
// const Stripe = require("stripe");

// const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json("Sorry, was error, pleaser try later...");
        console.log(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;

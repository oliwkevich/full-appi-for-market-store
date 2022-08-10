const router = require("express").Router();
const User = require("../models/User");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptojs.AES.encrypt(
      req.body.password,
      process.env.PASS_HASH
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) return res.status(401).json("Неверный логин или пароль!");

    const passHass = cryptojs.AES.decrypt(user.password, process.env.PASS_HASH);
    const pass = passHass.toString(cryptojs.enc.Utf8);

    if (pass !== req.body.password)
      return res.status(401).json("Неверный логин или пароль!");

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_HASH,
      { expiresIn: "3d" }
    );

    const { password, ...otherinfo } = user._doc;
    res.status(200).json({ ...otherinfo, token });
  } catch (error) {
    res.status(501).json(error);
  }
});

module.exports = router;

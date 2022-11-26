const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

// register
router.post("/register", async (req, res) => {
  const user = await User.find();

  if (!user.find((u) => u.email === req.body.email)) {
    let salt = await bcrypt.genSalt();
    // generate new hash password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    try {
      // save user
      const result = new User(req.body);
      await result.save();
      res.status(200).json("You have successfully registered");
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json("Email is already used");
  }
});

// login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (compare) {
      // generate jwt token
      await User.updateOne({ $set: { lastAccessData: new Date() } });

      const { password, isAdmin, ...others } = user._doc;
      const token = jwt.sign(others, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      res.status(200).json(token);
    } else {
      res.status(400).json({ error: "Incorrect email or password" });
    }
  } else {
    res.status(400).json({ error: "Incorrect email or password" });
  }
});

module.exports = router;

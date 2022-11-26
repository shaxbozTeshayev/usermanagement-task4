const router = require("express").Router();
const Auths = require("../middleware/auths");
const { User } = require("../models/user");
const mongoose = require("mongoose");
router.get("/get_all_users", Auths, async (req, res) => {
  try {
    const users = await User.find();
    let result = [];
    users.forEach((user) => {
      const { password, isAdmin, updatedAt, __v, ...others } = user._doc;
      result.push(others);
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

// delete users
router.post("/:currentUserId", Auths, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.currentUserId)) {
    let users = await User.find();
    const currentUser = users.find((user) =>
      user._id.equals(req.params.currentUserId)
    );
    if (currentUser) {
      if (!currentUser.isBlock) {
        req.body.usersId.forEach(async (userId) => {
          let user = users.find((user) => user._id.equals(userId));
          await user.deleteOne();
        });
        let resultUsers = [];
        req.body.usersId.forEach((userId) => {
          let user = users.find((user) => user._id.equals(userId));
          if (user) {
            const { password, isAdmin, __v, ...others } = user._doc;
            resultUsers.push(others);
          }
        });
        res.status(200).json(resultUsers);
      } else {
        res.status(200).json(false);
      }
    } else {
      res.status(200).json("noData");
    }
  } else {
    res.status(500).json("Server error.");
  }
});

// update users
router.patch("/:currentUserId", async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.currentUserId)) {
    let users = await User.find();
    const currentUser = users.find((user) =>
      user._id.equals(req.params.currentUserId)
    );
    if (!currentUser.isBlock) {
      req.body.usersId.forEach(async (userId) => {
        let user = users.find((user) => user._id.equals(userId));
        user.isBlock = req.body.isBlock;
        // console.log(user);
        await user.updateOne({ $set: { isBlock: req.body.isBlock } });
      });
      let resultUsers = [];
      req.body.usersId.forEach((userId) => {
        let user = users.find((user) => user._id.equals(userId));
        const { password, isAdmin, __v, ...others } = user._doc;
        resultUsers.push(others);
      });
      res.status(200).json(resultUsers);
    } else {
      res.status(200).json(false);
    }
  } else {
    res.status(500).json("Server error.");
  }
});

module.exports = router;

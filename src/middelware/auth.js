const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userauth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("No token provided");
    }

    const decoded = jwt.verify(token, "Develper!23");

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    next();

  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = { userauth };

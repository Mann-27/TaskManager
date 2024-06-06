const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure this path is correct

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ error: "Authentication required." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Error in userMiddleware:", err);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = userMiddleware;

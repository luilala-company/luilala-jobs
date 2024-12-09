import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Employer from "../models/EmployersModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read the jwt from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findById(decoded.id).select("-password");
      if (!user) {
        user = await Employer.findById(decoded.id).select("-password");
      }
      if (!user) {
        res.status(401);
        throw new Error("Not authorized, user not found!");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed!");
    }
  } else {
    res.status(401);

    throw new Error("Not authorized, no token!");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized user as an admin!" });
  }
};

export { authenticate, authorizeAdmin };

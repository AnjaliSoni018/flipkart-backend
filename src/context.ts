import { Request } from "express";
import jwt from "jsonwebtoken";

export const context = ({ req }: { req: Request }) => {
  const token = req.headers.authorization || "";
  let user = null;

  if (token && token.startsWith("Bearer ")) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }
      const decoded = jwt.verify(token.replace("Bearer ", ""), secret);
      user = decoded;
    } catch (err) {
      console.error("JWT Error:", err);
    }
  } else {
    console.error("Authorization header missing or invalid");
  }

  console.log("Decoded User:", user);
  return { user };
};

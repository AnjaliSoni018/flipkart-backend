import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { GraphQLContext } from "./types/context";

export const context = ({ req }: { req: Request }): GraphQLContext => {
  let user = undefined;

  const token = req.headers.authorization;
  if (token?.startsWith("Bearer ")) {
    try {
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET!
      );

      if (
        typeof decoded === "object" &&
        decoded !== null &&
        "id" in decoded &&
        "phone" in decoded &&
        "role" in decoded
      ) {
        user = decoded as JwtPayload & {
          id: string;
          phone: string;
          role: string;
        };
      } else {
        console.error("Decoded token does not match expected structure");
      }
    } catch (err) {
      console.error("JWT verification failed:", err);
    }
  }

  return { req, user };
};

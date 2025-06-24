import jwt, { JwtPayload } from "jsonwebtoken";
import { GraphQLContext } from "../types/context";

interface DecodedUser extends JwtPayload {
  id: string;
  phone: string;
  role: string;
}

export const authGuard = (context: GraphQLContext): DecodedUser => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header missing or invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
    context.user = decoded;
    return decoded;
  } catch {
    throw new Error("Invalid or expired token");
  }
};

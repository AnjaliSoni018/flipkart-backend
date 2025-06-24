import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface GraphQLContext {
  req: Request;
  user?: JwtPayload & { id: string; phone: string; role: string };
}

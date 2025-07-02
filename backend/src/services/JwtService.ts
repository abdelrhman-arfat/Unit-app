import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/ENV.js";
import { Tokens } from "../constants/Tokens.js";

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT secrets are not defined in .env");
}

class JwtService {
  private secret: string;
  private type: string;
  private static instances: { [key in Tokens]?: JwtService } = {};

  constructor(type: Tokens = Tokens.token) {
    this.type = type;
    if (type === Tokens.token) {
      this.secret = JWT_SECRET as string;
    } else if (type === Tokens.refreshToken) {
      this.secret = JWT_REFRESH_SECRET as string;
    } else {
      throw new Error("Invalid token type");
    }
  }

  static getInstance(type: Tokens): JwtService {
    if (!this.instances[type]) {
      this.instances[type] = new JwtService(type);
    }
    return this.instances[type]!;
  }

  generateToken(payload: object): string {
    if (typeof payload !== "object") {
      throw new Error("Payload must be an object");
    }
    return jwt.sign(payload, this.secret, {
      expiresIn: this.type === "token" ? "30m" : "7d",
    });
  }

  /**
   * @name verifyToken
   * @param token
   * @returns the payload of the token if the token is valid
   */
  verifyToken(token: string): string | JwtPayload {
    return jwt.verify(token, this.secret);
  }

  /**
   * @name decodeToken
   * @param token
   * @returns the payload of the token
   */
  decodeToken(token: string): null | string | JwtPayload {
    return jwt.decode(token);
  }
}
export const jwtService = JwtService.getInstance(Tokens.token);
export const jwtRefreshService = JwtService.getInstance(Tokens.token);

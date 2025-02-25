import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      role: string;
      id: string;
      name: string;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    id: string;
    email: string;
    role: string;
  }
}
declare module "next-auth" {
  interface JWT extends DefaultJWT {
    email: string;
    id: string;
    name: string;
  }
}

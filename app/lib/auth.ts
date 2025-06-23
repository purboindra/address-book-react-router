import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  database: new Database("./sqlite.db"),
});

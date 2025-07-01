import passport from "passport";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
// import { userService } from "../services/UserService.js";
import {
  MICROSOFT_AUTH_ID,
  MICROSOFT_AUTH_SECRET,
  MICROSOFT_AUTH_SERVER_CALLBACK,
} from "../constants/ENV.js";

passport.use(
  new MicrosoftStrategy(
    {
      clientID: MICROSOFT_AUTH_ID,
      clientSecret: MICROSOFT_AUTH_SECRET,
      callbackURL: MICROSOFT_AUTH_SERVER_CALLBACK,
      scope: ["profile", "User.Read.All", "User.email", "email", "User.Read"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // const email = profile.emails[0].value;
        // const name = profile.displayName;
        // const image = profile.photos[0].value;
        // const userCreateData = {
        //   email,
        //   name,
        //   image,
        //   grade: "first",
        //   specialization: "general",
        //   role: "student",
        // } as any;

        // let userExist = await userService.getUserByEmail(email);
        // userExist = userExist
        //   ? userExist
        //   : await userService.createUser(userCreateData);

        return done(null, profile);
      } catch (error) {
        return done(error);
      }
    }
  )
);

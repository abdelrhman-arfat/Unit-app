import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  GOOGLE_AUTH_ID,
  GOOGLE_AUTH_SECRET,
  GOOGLE_AUTH_SERVER_CALLBACK,
} from "../constants/ENV.js";
import { userService } from "../services/UserService.js";
import { grades, roles, specializations, user } from "@prisma/client";

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_AUTH_ID,
      clientSecret: GOOGLE_AUTH_SECRET,
      callbackURL: GOOGLE_AUTH_SERVER_CALLBACK,
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const image = profile.photos[0].value;

        const userCreateData = {
          email,
          name,
          image,
          grade: grades.first,
          specialization: specializations.general,
          role: roles.student,
        } as user;

        let userExist = await userService.getUserByEmail(email);
        userExist = userExist
          ? userExist
          : await userService.createUser(userCreateData);

        // if (!userExist) {
        //   await sendEmail(
        //     user,
        //     returnMessageDesign(
        //       `Hello in our Hotel ${user.full_name}`,
        //       `Welcome in our service and we will happy to have you in our hotel`,
        //       "we wish you have nice time"
        //     ),
        //     "Hello in hotel project"
        //   );
        // }

        const userData = {
          email,
          name,
          image,
          role: userExist.role,
          grade: userExist.grade,
          specialization: userExist.specialization,
        };

        done(null, userData);
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);

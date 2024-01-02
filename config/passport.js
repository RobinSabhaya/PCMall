const passport = require("passport");
const registerModel = require("../db/models/registerSchema");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URI,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(async (user, done) => {
  try {
    done(null, user);
    const userExist = await registerModel.exists({ email: user.email });
    if (!userExist) {
      const userData = new registerModel({
        role: "customer",
        email: user.email,
        name: user.displayName,
      });
      await userData.save();
    }
  } catch (err) {
    console.log(err);
  }
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

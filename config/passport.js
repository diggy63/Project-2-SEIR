const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");
//Require your User Model here!

// configuring Passport!
passport.use(
     new GoogleStrategy(
          {
               clientID: process.env.GOOGLE_CLIENT_ID,
               clientSecret: process.env.GOOGLE_SECRET,
               callbackURL: process.env.GOOGLE_CALLBACK,
          },
          function (accessToken, refreshToken, profile, cb) {
               User.findOne({ googleId: profile.id }).then(async function (user) {
                    if (user) return cb(null, user);
                    try {
                         user = await User.create({
                              name: profile.displayName,
                              googleId: profile.id,
                              email: profile.emails[0].value,
                              avatar: profile.photos[0].value,
                         });
                         return cb(null, user);
                    } catch (err) {
                         return cb(err);
                    }
               });
          }
     )
);

passport.serializeUser(function (user, done) {
     done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
     User.findById(userId).then(function (user) {
          done(null, user);
     });

     // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
     // When you call this done function passport assigns the user document to req.user, which will
     // be availible in every Single controller function, so you always know the logged in user
});

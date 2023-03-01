// const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserModel from './models/user.js';

dotenv.config();

const passport__ = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google
        console.log('Profile', profile);

        const newUser = {
          // googleId: profile.id,
          // displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          // email: profile.emails[0].value,
          googleId: profile.id,
          // displayName: profile.displayName,
          name: profile.displayName,
          // firstName: profile.name.givenName,
          // lastName: profile.name.familyName,
          // image: profile.photos[0].value,
          email: profile.emails[0].value,
        };

        try {
          //find the user in our database
          let user = await UserModel.findOne({ googleId: profile.id });

          if (user) {
            //If user present in our database.
            done(null, user);
          } else {
            // if user is not preset in our database save user data to database.
            user = await UserModel.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    console.log('user', user);
    // console.log('user.id', user.googlId);
    console.log('user._id', user._id);
    done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => done(err, user));
  });
};

export default passport__;

// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// // import GoogleStrategy from 'passport-google-oauth20';
// import passport from 'passport';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import UserModel from './models/user.js';

// dotenv.config();

// // console.log(process.env.GOOGLE_CLIENT_ID);

// module.exports = function (passport) {
//   passport.use(
//    new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: 'http://localhost:5000/auth/google/callback',
//       // callbackURL: '/auth/google/callback',
//       //   callbackURL:
//       //     'https://kartzone-ecommerce.netlify.app/auth/google/callback',
//       // scope: ['profile', 'email'],
//       // userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
//       passReqToCallback: true,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       //get the user data from google

//       console.log('profile', profile);
//       // console.log('accessToken', accessToken);
//       // console.log('done', done);

//       const newUser = {
//         googleId: profile.id,
//         // displayName: profile.displayName,
//         name: profile.displayName,
//         // firstName: profile.name.givenName,
//         // lastName: profile.name.familyName,
//         // image: profile.photos[0].value,
//         email: profile.emails[0].value,
//       };

//       // return done(null, user);

//       try {
//         //find the user in our database
//         let user = await UserModel.findOne({ googleId: profile.id });

//         if (user) {
//           //If user present in our database.
//           done(null, user);
//         } else {
//           // if user is not preset in our database save user data to database.
//           user = await User.create(newUser);
//           done(null, user);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   )
// );

// // used to serialize the user for the session
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // export default passport;

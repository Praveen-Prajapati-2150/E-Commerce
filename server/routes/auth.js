import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Auth Callback

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    // session: false,
  }),
  (req, res) => {
    res.redirect('/log');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;

// router.get(
//   '/google/callback',
//   // '/callback',
//   passport.authenticate('google', {
//     successRedirect: '/callback/success',
//     // successRedirect: process.env.CLIENT_URL,
//     failureRedirect: '/callback/failure',
//   })
// );

// // Success
// router.get('/callback/success', (req, res) => {
//   if (!req.user) res.redirect('/callback/failure');
//   res.send('Welcome ' + req.user.email);
// });

// // failure
// router.get('/callback/failure', (req, res) => {
//   res.send('Error');
// });

// router.get('/login/success', (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       error: false,
//       message: 'Successfully Logged In',
//       user: req.user,
//     });
//   } else {
//     res.status(403).json({ error: true, message: 'Not Authorized' });
//   }
// });

// router.get('/login/failed', (req, res) => {
//   res.status(401).json({
//     error: true,
//     message: 'log in failure',
//   });
// });

// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: '/login/failed',
//   })
// );

// router.get('/google', passport.authenticate('google', ['profile', 'email']));

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect(process.env.CLIENT_URL);
// });

// export default router;

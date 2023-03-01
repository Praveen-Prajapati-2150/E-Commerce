import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import orderRouter from './routes/orderRoute.js';
import cartRouter from './routes/cartRoute.js';
import adminRouter from './routes/adminRoute.js';
// import puppeteer from 'puppeteer';
// import cheerio from 'cheerio';
import cookieSession from 'cookie-session';
import authRouter from './routes/auth.js';
import dbConnect from './DbConnect.js';

import session from 'express-session';

import MongoStore from 'connect-mongo';

import passport from 'passport';
import passport__ from './passport.js';
passport__(passport);

// MongoStore(session);
// const MongoStore = connectMongo(session);
// const mongoStore = MongoStore(session);

const CONNECTION_URL = `mongodb+srv://prsmart2150:${process.env.MONGO_CRED}@cluster0.8jgdobe.mongodb.net/?retryWrites=true&w=majority`;
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

// app.use(
//   cookieSession({
//     name: 'google-auth-session',
//     // keys: ['alonevera'],
//     keys: ['key1', 'key2'],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: CONNECTION_URL }),
    // store: new MongoStore({ mongooseConnection: dbConnect() }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,POST,PUT,DELETE,PATCH',
//     credentials: true,
//   })
// );
app.use(bodyParser.json());

// app.use('/', (req, res) => {
//   res.send(`<div>
//   <h1>Welcome to E-Commerce Site</h1>
//   <button><a href="/auth/google">Login with Google</a></button>
//   </div>`);
// });
app.use('/public', express.static('public'));
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/auth', authRouter);

dbConnect();
app.listen(port);

// your task code started from here
// I'm using Cheerio and Puppeteer for scraping data

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//   });

//   const page = await browser.newPage();
//   await page.goto(
//     'https://www.amazon.in/gp/buy/thankyou/handlers/display.html?purchaseId=404-2848910-8988313&ref_=chk_typ_browserRefresh&isRefresh=1'
//   );

//   await page.type('#ap_email', '8178428798');
//   await page.click('#continue');
//   await page.waitForNavigation();
//   await page.type('#ap_password', 'praveen@321');
//   await page.click('#signInSubmit');
//   await page.waitForNavigation();

//   await page.click('#nav-orders');

//   await page.screenshot({ path: 'image.png' });

//   // here we storing all html data in pageData

//   const PageData = await page.evaluate(() => {
//     return {
//       html: document.documentElement.innerHTML,
//       width: document.documentElement.clientWidth,
//       height: document.documentElement.clientHeight,
//     };
//   });

//   // we can see data from by consoling

//   // console.log('PageData', PageData);

//   // here we using cheerio to extract data from pageData.html

//   const $ = cheerio.load(PageData.html);

//   const a = $('.a-link-normal');
//   const price = $('.currencyINRFallback');

//   console.log(a.text());
//   console.log(price.text());

//   await browser.close();
// })();

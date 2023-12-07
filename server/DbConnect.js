import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const CONNECTION_URL = `mongodb+srv://prsmart2150:${process.env.MONGO_CRED}@cluster0.8jgdobe.mongodb.net/?retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;

function dbConnect() {
  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then(() => {
      console.log(`server running on PORT: ${port}`);
      //   app.listen(port, () => console.log(`server running on PORT: ${port}`));
    })
    .catch((error) => {
      console.log('Unable to connect to MongoDB');
      console.log(error.message);
    });
}

export default dbConnect;

// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = "mongodb+srv://prsmart2150:<password>@cluster0.8jgdobe.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

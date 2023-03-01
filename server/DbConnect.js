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

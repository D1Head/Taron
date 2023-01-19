import mongoose from 'mongoose';
const mongo = mongoose
  .connect(
    `mongodb+srv://taron:${process.env.DB_PASSWORD}@cluster0.wuycowd.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((con) => console.log('DB connection successful !'));

export default { mongo };

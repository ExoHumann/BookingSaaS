import { connect } from 'mongoose';

const connectDB = async () => {
    const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourDefaultDatabase'; // Default to a development URI

    try {
        await connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

export default connectDB;

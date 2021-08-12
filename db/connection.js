import mongoose from 'mongoose';

const URI_MONGO = process.env.URI_MONGO;

const conectarDB = async () => {
    try {
        await mongoose.connect(URI_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('Conectado a mongo')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default conectarDB
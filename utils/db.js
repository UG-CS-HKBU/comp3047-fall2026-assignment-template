const { MongoClient, ObjectId } = require('mongodb');

process.env.MONGODB_URI = '<your_mongodb_uri>';

if (!process.env.MONGODB_URI) {
    // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    process.env.MONGODB_URI = 'mongodb://localhost:27017';
}

const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect();

async function connectToDB() {
    const connectedClient = await clientPromise;
    return connectedClient.db('bookingsDB');
}

async function shutdown() {
    try {
        await clientPromise;
        await client.close();
    } finally {
        process.exit(0);
    }
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);

module.exports = { connectToDB, ObjectId };
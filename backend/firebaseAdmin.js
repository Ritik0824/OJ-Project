const admin = require('firebase-admin');
const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config();

const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

// Initialize MongoDB Client
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function syncGoogleUsersToMongoDB(users) {
  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('googleusers');

    const bulkOps = users.map(user => {
      return {
        updateOne: {
          filter: { uid: user.uid },
          update: { $set: user },
          upsert: true,
        },
      };
    });

    await collection.bulkWrite(bulkOps);
  } finally {
    await client.close();
  }
}

async function listUsers(nextPageToken) {
  try {
    const listUsersResult = await auth.listUsers(1000, nextPageToken);
    const googleUsers = listUsersResult.users.filter(user => {
      return user.providerData.some(provider => provider.providerId === 'google.com');
    });

    if (googleUsers.length > 0) {
      await syncGoogleUsersToMongoDB(googleUsers.map(user => user.toJSON()));
    }

    if (listUsersResult.pageToken) {
      await listUsers(listUsersResult.pageToken);
    }
  } catch (error) {
    console.error('Error listing users:', error);
  }
}

module.exports = { listUsers };

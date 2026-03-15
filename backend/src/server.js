require('dotenv').config();
const app = require('./app');
const { connectDb } = require('./config/db');

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDb(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/meal-assistant');
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', error);
  process.exit(1);
});

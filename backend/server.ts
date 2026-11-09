import { app } from './app.js';
import { connectMongo } from './src/config/mongo.js';

const PORT = 5174;

async function startServer() {
  try {
    await connectMongo();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Problem with server:", error);
    process.exit(1);
  }
}

startServer();
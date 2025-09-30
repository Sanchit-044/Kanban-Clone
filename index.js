// index.js
import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = 5000;

const start = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`\nReceived ${signal}. Closing server...`);
      server.close(() => {
        console.log('HTTP server closed.');
        import('mongoose').then(({ default: mongoose }) => {
          mongoose.connection.close(false, () => {
            console.log('Mongo connection closed.');
            process.exit(0);
          });
        });
      });
      setTimeout(() => {
        console.error('Forcing shutdown...');
        process.exit(1);
      }, 10000).unref();
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (err) {
    console.error('Failed to start app:', err);
    process.exit(1);
  }
};

start();

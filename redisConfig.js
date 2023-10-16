const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const client = redis.createClient({
  host: 'localhost', // Ganti dengan host Redis Anda
  port: 8080, // Port default Redis
});

client.on('error', (err) => {
  console.error('Error in Redis client: ' + err);
});

const sessionConfig = {
  store: new RedisStore({ client }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Sesuaikan dengan konfigurasi SSL Anda
  },
};

module.exports = { sessionConfig };

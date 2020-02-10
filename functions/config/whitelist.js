module.exports = process.env.NODE_ENV === 'DEVELOPMENT'
  ? ['http://localhost:8080']
  : [];

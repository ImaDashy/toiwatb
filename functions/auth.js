exports.handler = async function(event, context) {
  console.log('Auth function called with method:', event.httpMethod);
  console.log('Request body:', event.body);

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }
  
  try {
    const { password } = JSON.parse(event.body);
    
    // Validate password
    if (password !== ADMIN_PASSWORD) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }
    
    // Generate JWT token (valid for 24 hours)
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '24h' });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ token })
    };
  } catch (error) {
    console.error('Error in auth function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};

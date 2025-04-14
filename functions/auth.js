const jwt = require('jsonwebtoken');

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
    console.log('Parsing request body');
    const { password } = JSON.parse(event.body);
    console.log('Password received (first char):', password ? password[0] + '***' : 'none');
    
    const expectedPassword = process.env.ADMIN_PASSWORD;
    console.log('Expected password exists:', !!expectedPassword);
    
    // Validate password
    if (!password || password !== expectedPassword) {
      console.log('Password mismatch');
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }
    
    console.log('Password matched, generating token');
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    } }
    
    // Generate JWT token
    try {
      console.log('Signing JWT token');
      const token = jwt.sign({ admin: true }, jwtSecret, { expiresIn: '24h' });
      console.log('Token generated successfully');
      
      return {
        statusCode: 200,
        body: JSON.stringify({ token })
      };
    } catch (jwtError) {
      console.error('JWT signing error:', jwtError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to generate token' })
      };
    }
  } catch (error) {
    console.error('General error in auth function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};

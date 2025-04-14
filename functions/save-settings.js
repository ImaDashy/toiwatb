const jwt = require('jsonwebtoken');
const { getFileContent, saveFile } = require('./utils/github');

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
  
  // Verify JWT token
  const token = event.headers.authorization?.split(' ')[1];
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Authentication required' })
    };
  }
  
  try {
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid or expired token' })
    };
  }
  
  try {
    const settings = JSON.parse(event.body);
    
    // Validate required fields
    if (!settings.title || !settings.author) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Title and author are required' })
      };
    }
    
    // Get current book metadata
    const { content: metaContent, sha: metaSha } = await getFileContent('data/book-meta.json');
    const currentMeta = JSON.parse(metaContent);
    
    // Update metadata
    const newMeta = {
      ...currentMeta,
      title: settings.title,
      author: settings.author,
      coverImage: settings.coverImage || currentMeta.coverImage || '',
      lastUpdated: new Date().toISOString()
    };
    
    // Save updated metadata
    await saveFile(
      'data/book-meta.json',
      JSON.stringify(newMeta, null, 2),
      'Update book metadata',
      metaSha
    );
    
    // Update admin password if provided
    if (settings.password) {
      // In a real implementation, you would update the environment variable
      // This requires additional setup with Netlify API
      console.log('Password change requested - would update ADMIN_PASSWORD env var');
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Settings saved successfully' })
    };
  } catch (error) {
    console.error('Error saving settings:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save settings' })
    };
  }
};

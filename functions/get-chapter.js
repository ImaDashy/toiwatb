const { getFileContent } = require('./utils/github');

exports.handler = async function(event, context) {
  try {
    const { file } = event.queryStringParameters || {};
    
    if (!file) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Chapter file parameter is required' })
      };
    }
    
    // Get chapter content
    const { content } = await getFileContent(`data/chapters/${file}`);
    const chapter = JSON.parse(content);
    
    return {
      statusCode: 200,
      body: JSON.stringify(chapter)
    };
  } catch (error) {
    console.error('Error getting chapter:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to get chapter' })
    };
  }
};

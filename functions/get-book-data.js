const { getFileContent } = require('./utils/github');

exports.handler = async function(event, context) {
  try {
    // Get book metadata
    const { content: metaContent } = await getFileContent('data/book-meta.json');
    const metadata = JSON.parse(metaContent);
    
    // Get chapters list
    const { content: chaptersContent } = await getFileContent('data/chapters.json');
    const chapters = JSON.parse(chaptersContent);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        metadata,
        chapters
      })
    };
  } catch (error) {
    console.error('Error getting book data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to get book data' })
    };
  }
};

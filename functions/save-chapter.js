const jwt = require('jsonwebtoken');
const { getFileContent, saveFile } = require('./utils/github');

const JWT_SECRET = process.env.JWT_SECRET;

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
    const chapter = JSON.parse(event.body);
    
    // Validate required fields
    if (!chapter.number || !chapter.title || !chapter.content) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }
    
    // Create chapter filename
    const chapterFilename = `chapter-${chapter.number.toString().padStart(2, '0')}.json`;
    const chapterPath = `data/chapters/${chapterFilename}`;
    
    // Format chapter for saving
    const chapterToSave = {
      ...chapter,
      publishDate: chapter.publishDate || new Date().toISOString()
    };
    
    // Get chapters list
    const { content: chaptersContent, sha: chaptersSha } = await getFileContent('data/chapters.json');
    let chapters = JSON.parse(chaptersContent);
    
    // Check if chapter already exists
    const existingChapterIndex = chapters.findIndex(ch => ch.number === chapter.number);
    
    if (existingChapterIndex >= 0) {
      // Update existing chapter
      chapters[existingChapterIndex] = {
        number: chapter.number,
        title: chapter.title,
        file: chapterFilename,
        publishDate: chapterToSave.publishDate
      };
    } else {
      // Add new chapter
      chapters.push({
        number: chapter.number,
        title: chapter.title,
        file: chapterFilename,
        publishDate: chapterToSave.publishDate
      });
      
      // Sort chapters by number
      chapters.sort((a, b) => a.number - b.number);
    }
    
    // Try to get existing chapter file (might not exist if new)
    let chapterSha = null;
    try {
      const existingChapter = await getFileContent(chapterPath);
      chapterSha = existingChapter.sha;
    } catch (error) {
      // File doesn't exist, which is fine for new chapters
    }
    
    // Save chapter file
    await saveFile(
      chapterPath,
      JSON.stringify(chapterToSave, null, 2),
      `Update chapter ${chapter.number}: ${chapter.title}`,
      chapterSha
    );
    
    // Save updated chapters list
    await saveFile(
      'data/chapters.json',
      JSON.stringify(chapters, null, 2),
      `Update chapters list for chapter ${chapter.number}`,
      chaptersSha
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Chapter saved successfully' })
    };
  } catch (error) {
    console.error('Error saving chapter:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save chapter' })
    };
  }
};

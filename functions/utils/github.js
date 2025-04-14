const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const API_BASE = 'https://api.github.com';

// Get file content from GitHub
async function getFileContent(path) {
  try {
    const response = await axios.get(`${API_BASE}/repos/${GITHUB_REPO}/contents/${path}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    // Decode base64 content
    const content = Buffer.from(response.data.content, 'base64').toString();
    return {
      content,
      sha: response.data.sha // We need this for updating the file
    };
  } catch (error) {
    console.error(`Error getting file ${path}:`, error.message);
    throw new Error(`Failed to get file: ${error.message}`);
  }
}

// Update or create a file on GitHub
async function saveFile(path, content, message, sha = null) {
  try {
    const payload = {
      message,
      content: Buffer.from(content).toString('base64'),
      branch: 'main' // or your default branch name
    };
    
    // If sha is provided, we're updating an existing file
    if (sha) {
      payload.sha = sha;
    }
    
    const response = await axios.put(`${API_BASE}/repos/${GITHUB_REPO}/contents/${path}`, payload, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error saving file ${path}:`, error.message);
    throw new Error(`Failed to save file: ${error.message}`);
  }
}

module.exports = {
  getFileContent,
  saveFile
};

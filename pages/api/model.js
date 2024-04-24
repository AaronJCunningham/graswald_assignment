// /pages/api/model.js
import axios from 'axios';

//I built his API but it had some issues and for times sake I decided to skip and mock it

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const formData = new FormData();
      req.files.forEach(file => formData.append('files', file));
      
      const response = await axios.post('https://api.meshy.ai', formData, {
        headers: {
          'Authorization': `Bearer ${process.env.TOKEN || 'your_default_token_here'}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

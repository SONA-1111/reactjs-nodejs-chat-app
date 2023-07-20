const grid = require('gridfs-stream');
const mongoose = require('mongoose');

const url = 'http://localhost:5000';
let gfs, gridfsBucket;

const conn = mongoose.connection;
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
});

// Function to handle image upload
exports.uploadFile = (request, response) => {
  if (!request.file) {
    return response.status(400).json({ error: 'No file received' });
  }

  const imageUrl = `${url}/file/${request.file.filename}`;
  response.status(200).json({ imageUrl });
};

// Function to handle image retrieval
exports.getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });

    if (!file) {
      return response.status(404).json({ error: 'File not found' });
    }

    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
};
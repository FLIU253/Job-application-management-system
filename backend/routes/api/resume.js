const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const config = require('config');
const mongoURI = config.get('mongoURI');
const crypto = require('crypto');
const path = require('path');

// Create mongo connection
const conn = mongoose.connection;

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('resumes');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {

        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'resumes',
            metadata: req.user.id
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
  const upload = multer({ storage });

//@route    POST api/resume
//@desc     Create/update user profile's resume
//@access   Private
router.post('/resume', auth, upload.single('resume'), async (req , res) => {
    try{
        res.json({file: req.file});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route GET /resume/json
// @desc  Display resume file in JSON
router.get('/resume/json', auth, (req, res) => {
  gfs.files.findOne({ metadata: req.user.id }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route GET /resume
// @desc  Download the file
router.get('/resume', auth, (req, res) => {
  gfs.files.findOne({ metadata: req.user.id }, (err, file) => {
    if(!file || file.length === 0){
      return res.status(404).json({
          responseCode: 1,
          responseMessage: "error"
      });
    }
  // create read stream
  var readstream = gfs.createReadStream({
      filename: file.filename,
      root: "resumes"
  });
  // set the proper content type 
  res.set('Content-Type', file.contentType)
  // Return response
  return readstream.pipe(res);
});
});


module.exports = router;
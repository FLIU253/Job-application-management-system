const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const config = require('config');
const mongoURI = config.get('mongoURI');
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

          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: 'resume',
            metadata: {
                user: req.user.id
            }
          };
          resolve(fileInfo);
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


//@route    DELETE api/profile/delete
//@desc     delete user profile's resume
//@access   Private



module.exports = router;
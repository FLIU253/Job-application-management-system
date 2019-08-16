const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require("express-validator");
const auth = require('../../middleware/auth');
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
          user: {
              id: user.id
          }
      }

      jwt.sign(
          payload, 
          config.get("jwtToken"),
          {expiresIn:3600000},
          (err, token) => {
              if(err) throw err;
              res.json({token});
          });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/users/toApply
// @desc    populate toApply array
// @access  Private
router.put('/toApply', [auth, [
  check('companyName', 'company name is required').not().isEmpty(),
  check('jobTitle', 'job title is required').not().isEmpty(),
]],  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array() });
    }

    const {
      companyName,
      jobTitle, 
      location,
      applicationUrl,
      deadlineDate
    } = req.body;

    const newToApply = {
      companyName,
      jobTitle, 
      location,
      applicationUrl,
      deadlineDate
    }

    try{
      const user = await User.findById(req.user.id).select('-password');
      user.toApply.unshift(newToApply);
      
      await user.save();
      res.json(user);
    }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})


// @route   POST api/users/appliedTo
// @desc    populate appliedTo array
// @access  Private
router.put('/appliedTo', [auth, [
  check('companyName', 'company name is required').not().isEmpty(),
  check('jobTitle', 'job title is required').not().isEmpty(),
]],  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array() });
    }

    const {
      companyName,
      jobTitle, 
      location,
      applicationUrl,
      appliedDate
    } = req.body;

    const newAppliedTo = {
      companyName,
      jobTitle, 
      location,
      applicationUrl,
      appliedDate
    }

    try{
      const user = await User.findById(req.user.id).select('-password');
      user.appliedTo.unshift(newAppliedTo);
      
      await user.save();
      res.json(user);
    }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})


// @route   POST api/users/interview
// @desc    populate interview array
// @access  Private
router.put('/interview', [auth, [
  check('companyName', 'company name is required').not().isEmpty(),
  check('jobTitle', 'job title is required').not().isEmpty(),
]],  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array() });
    }

    const {
      companyName,
      jobTitle, 
      location,
      applicationUrl,
      interviewDate
    } = req.body;

    const newInterview = {
      companyName,
      jobTitle, 
      location,
      applicationUrl,
      interviewDate
    }

    try{
      const user = await User.findById(req.user.id).select('-password');
      user.interview.unshift(newInterview);
      
      await user.save();
      res.json(user);
    }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})


// @route   POST api/users/offered
// @desc    populate offered array
// @access  Private
router.put('/offered', [auth, [
  check('companyName', 'company name is required').not().isEmpty(),
  check('jobTitle', 'job title is required').not().isEmpty(),
]],  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array() });
    }

    const {
      companyName,
      jobTitle, 
      location,
      applicationUrl,
      offerDeadlineDate
    } = req.body;

    const newOffered = {
      companyName,
      jobTitle, 
      location,
      applicationUrl,
      offerDeadlineDate
    }

    try{
      const user = await User.findById(req.user.id).select('-password');
      user.offered.unshift(newOffered);
      
      await user.save();
      res.json(user);
    }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})


// @route   POST api/users/rejected
// @desc    populate rejected array
// @access  Private
router.put('/rejected', [auth, [
  check('companyName', 'company name is required').not().isEmpty(),
  check('jobTitle', 'job title is required').not().isEmpty(),
]],  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array() });
    }

    const {
      companyName,
      jobTitle, 
      location,
      applicationUrl
    } = req.body;

    const newRejected = {
      companyName,
      jobTitle, 
      location,
      applicationUrl
    }

    try{
      const user = await User.findById(req.user.id).select('-password');
      user.rejected.unshift(newRejected);
      
      await user.save();
      res.json(user);
    }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})


// @route   DELETE api/toApply/:toApply_id
// @desc    Delete an item from toApply array
// @access  Private
router.delete("/toApply/:toApply_id", auth, async (req, res) => {
    try{
      const user = await User.findById(req.user.id).select('-password');

      //get remove index
      const removeIndex = user.toApply.map(item => item.id).indexOf(req.params.toApply_id);

      user.toApply.splice(removeIndex, 1);

      await user.save();

      res.json(user);
    }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route   DELETE api/appliedTo/:appliedTo_id
// @desc    Delete an item from appliedTo array
// @access  Private
router.delete("/appliedTo/:appliedTo_id", auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');

    //get remove index
    const removeIndex = user.appliedTo.map(item => item.id).indexOf(req.params.appliedTo_id);

    user.appliedTo.splice(removeIndex, 1);

    await user.save();

    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/interview/:interview_id
// @desc    Delete an item from interview array
// @access  Private
router.delete("/interview/:interview_id", auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');

    //get remove index
    const removeIndex = user.interview.map(item => item.id).indexOf(req.params.interview_id);

    user.interview.splice(removeIndex, 1);

    await user.save();

    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/offered/:offered_id
// @desc    Delete an item from offered array
// @access  Private
router.delete("/offered/:offered_id", auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');

    //get remove index
    const removeIndex = user.offered.map(item => item.id).indexOf(req.params.offered_id);

    user.offered.splice(removeIndex, 1);

    await user.save();

    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/rejected/:rejected_id
// @desc    Delete an item from rejected array
// @access  Private
router.delete("/rejected/:rejected_id", auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');

    //get remove index
    const removeIndex = user.rejected.map(item => item.id).indexOf(req.params.rejected_id);

    user.rejected.splice(removeIndex, 1);

    await user.save();

    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   get api/toApply
// @desc    get toApply array
// @access  Private
router.get('/toApply', auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('toApply');
    res.json(user);
  }catch{
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route   get api/appliedTo
// @desc    get appliedTo array
// @access  Private
router.get('/appliedTo', auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('appliedTo');
    res.json(user);
  }catch{
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route   get api/interview
// @desc    get interview array
// @access  Private
router.get('/interview', auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('interview');
    res.json(user);
  }catch{
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route   get api/offered
// @desc    get offered array
// @access  Private
router.get('/offered', auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('offered');
    res.json(user);
  }catch{
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


// @route   get api/rejected
// @desc    get rejected array
// @access  Private
router.get('/rejected', auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('rejected');
    res.json(user);
  }catch{
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})
module.exports = router;
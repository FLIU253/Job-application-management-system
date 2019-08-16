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

module.exports = router;
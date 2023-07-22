const express = require('express');
const router = express.Router();
const rb_model = require('../models/rbmodel');

// Getting all Data
router.get('/', async (req, res) => {
  try{
    const RBs = await rb_model.find();
    res.json(RBs);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) =>{
  const RB = new rb_model({
    name: req.body.name,
    PPR: req.body.PPR,
    team: req.body.team,
    position: req.body.position,
    rank: req.body.rank
  });
  try {
    const newRB = await RB.save();
    res.status(201).json(newRB);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
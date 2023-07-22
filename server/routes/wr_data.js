const express = require('express');
const router = express.Router();
const wr_model = require('../models/wrmodel');

// Getting all Data
router.get('/', async (req, res) => {
  try{
    const WRs = await wr_model.find();
    res.json(WRs);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) =>{
  const WR = new wr_model({
    name: req.body.name,
    PPR: req.body.PPR,
    team: req.body.team,
    position: req.body.position,
    rank: req.body.rank
  });
  try {
    const newWR = await WR.save();
    res.status(201).json(newWR);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
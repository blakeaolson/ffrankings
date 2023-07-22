const express = require('express');
const router = express.Router();
const te_model = require('../models/temodel');

// Getting all Data
router.get('/', async (req, res) => {
  try{
    const TEs = await te_model.find();
    res.json(TEs);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) =>{
  const TE = new te_model({
    name: req.body.name,
    PPR: req.body.PPR,
    team: req.body.team,
    position: req.body.position,
    rank: req.body.rank
  });
  try {
    const newTE = await TE.save();
    res.status(201).json(newTE);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
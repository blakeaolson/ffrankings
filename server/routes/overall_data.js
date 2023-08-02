const express = require('express');
const router = express.Router();
const overall_model = require('../models/overallmodel');

router.get('/', async (req, res) => {
  try{
    const data = await overall_model.find();
    res.json(data);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) =>{
  const overall_data = new overall_model({
    name: req.body.name,
    PPR: req.body.PPR,
    team: req.body.team,
    position: req.body.position,
    rank: req.body.rank
  });
  try {
    const newData = await overall_data.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
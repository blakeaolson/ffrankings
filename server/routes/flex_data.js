const express = require('express');
const router = express.Router();
const flex_model = require('../models/flexmodel');

router.get('/', async (req, res) => {
  try{
    const data = await flex_model.find();
    res.json(data);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) =>{
  const flex_data = new flex_model({
    name: req.body.name,
    PPR: req.body.PPR,
    team: req.body.team,
    position: req.body.position,
    rank: req.body.rank
  });
  try {
    const newData = await flex_data.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const qb_model = require('../models/qbmodel');

// Getting all Data
router.get('/', async (req, res) => {
  try{
    const QBs = await qb_model.find();
    res.json(QBs);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) =>{
  const QB = new qb_model({
    name: req.body.name,
    PPR: req.body.PPR,
    team: req.body.team,
    position: req.body.position,
    rank: req.body.rank
  });
  try {
    const newQB = await QB.save();
    res.status(201).json(newQB);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
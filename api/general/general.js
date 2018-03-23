'use strict';

const router = require('express').Router();
const Sequelize = require('sequelize');

// db
const db = require('../../db/connect');

/**
 * Fetch current gameweek
 */
router.get('/gameweek', (req, res) => {

  const {current, start, stop} = req.query; 
  
  const currentGameweek = 
    `SELECT * FROM gameweeks` +
    `  WHERE is_current = true`;

  const rangeGameweek = 
    `SELECT * FROM gameweeks` +
    `  WHERE `;

  let query;

  if (current) {

  }

  db.query(currentgw,{
      type: Sequelize.QueryTypes.SELECT
    })
    .then((results) => {
      res.json({
        status: true,
        data: results, 
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });

});

module.exports = router;
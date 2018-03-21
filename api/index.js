'use strict';

// Third party modules
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

// db
const db = require('../db/connect');
const Op = Sequelize.Op;

// Models
const { LeagueTables } = require('../db/Models');

router.get('/tables', (req, res) => {
  /**
   * filtered tells me whether the data should be filtered
   * 
   * If it should be filtered it can be filtered by either home ('h')
   * away ('a') or total ('t')
   * 
   * gameweek will be a number between 1 and 38
   */
  const { filtered, focus, gameweek } = req.query;
  const where = {};
  const defaultSort = [
    ['gameweek_id', 'ASC'],
    ['focus', 'DESC'],
    ['points', 'DESC'],
    ['goal_difference', 'DESC'],
    ['for', 'DESC'],
    ['team_name', 'ASC']
  ];

  if (filtered === 'true') {
    if (focus) {
      where['focus'] = focus;
    }
    if (gameweek) {
      where['gameweek'] = gameweek;
    }
  }

  // specific gameweeks
  LeagueTables.findAll({
    where,
    order: defaultSort
  })
    .then(items => {
      const tableEntries = items.map(v => v.dataValues);
      res.json({
        status: 'okay',
        filters: where,
        data: tableEntries
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });

});

module.exports = router;
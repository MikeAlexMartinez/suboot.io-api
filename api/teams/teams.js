'use strict';

const router = require('express').Router();
const Sequelize = require('sequelize');

// db
const db = require('../../db/connect');

// Models
const { Teams } = require('../../db/Models');

/**
 * Main Teams route
 */
router.get('/shortnames', (req, res) => {

  Teams.findAll({
      attributes: ['short_name', 'name']
    })
    .then((results) => {
      res.json({
        status: true,
        data: results
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });

});

module.exports = router;

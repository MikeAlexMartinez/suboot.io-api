'use strict';

// Third party modules
const express = require('express');
const router = express.Router();

// db
const db = require('../db/connect');

// Models
const { LeagueTables } = require('../db/Models');

router.get('/tables', (req, res) => {

  // create filtering for home, away and t.
  

  // specific gameweeks
  LeagueTables.findAll()
    .then(items => {
      const tableEntries = items.map(v => v.dataValues);
      res.json({
        status: 'okay',
        filters: {},
        data: tableEntries
      });
    });

});

module.exports = router;
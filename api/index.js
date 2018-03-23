'use strict';

// Third party modules
const express = require('express');
const router = express.Router();

// routes
const tables = require('./tables/tables');
const fixtures = require('./fixtures/fixtures');
const general = require('./general/general');
const teams = require('./teams/teams');

router.use('/teams', teams);
router.use('/tables', tables);
router.use('/general', general);
router.use('/fixtures', fixtures);

module.exports = router;

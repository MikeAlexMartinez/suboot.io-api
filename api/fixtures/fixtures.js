'use strict';

const router = require('express').Router();
const Sequelize = require('sequelize');

// db
const db = require('../../db/connect');

// Models
const { Fixtures } = require('../../db/Models');

/**
 * Main fixtures route
 * /v1/api/fixtures
 */
router.get('/', (req, res) => {

  // query for fixtures and team names
  const fixturesWithTeamNames = 
    `SELECT fix.id AS "fixture_id"
      , fix.gameweek_id
      , fix.finished
      , fix.kickoff_time
      , fix.team_a AS "away_team_id"
      , away.name AS "away_team"
      , away.short_name AS "away_team_short"
      , away.strength AS "away_team_strength"
      , fix.team_a_points AS "away_fix_points"
      , fix.team_a_score AS "away_fix_goals"
      , fix.team_h AS "home_team_id"
      , home.name AS "home_team"
      , home.short_name AS "home_team_short"
      , home.strength AS "home_team_strength"
      , fix.team_h_points AS "home_fix_points"
      , fix.team_h_score AS "home_fix_goals"
      , fix.result
    FROM fixtures fix
    INNER JOIN teams home
      ON fix.team_h = home.id
    INNER JOIN teams away
      ON fix.team_a = away.id
    ORDER BY 
      kickoff_time DESC;`;

  // specific gameweeks
  db.query(fixturesWithTeamNames, {
      type: Sequelize.QueryTypes.SELECT
    })
    .then((results) => {
      res.json({
        status: true,
        data: {
          finished: results.filter(fix => fix.finished),
          upcoming: results.filter(fix => !fix.finished),
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });

});

module.exports = router;

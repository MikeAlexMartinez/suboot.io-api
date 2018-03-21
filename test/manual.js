const rp = require('request-promise');

var options = {
  uri: 'http://localhost:3030/v1/api/tables',
  headers: {
      'User-Agent': 'Request-Promise'
  },
  json: true // Automatically parses the JSON string in the response
};

rp(options)
  .then(({ status, filters, data }) => {
    console.log(data.length);

    const homeTable = data.filter((e) => {
      return e.focus = 'H' &&
        e.gameweek_id
    });
  })
  .catch((err) => {
    console.error(err);
  });
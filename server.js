require('dotenv').config();
require('./lib/utils/connect')();

const request = require('superagent');

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

request
  .post('http://temp.alchemycodelab.io/subscribe')
  .send({ url: 'https://app-temp-monitor.herokuapp.com' })
  .then(res => {
    console.log(res.body);
  });

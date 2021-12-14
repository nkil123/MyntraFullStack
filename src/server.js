const app = require ('./index');

const connect = require ('./configs/dbs');

app.listen (2233, async (req, res) => {
  await connect ();
  console.log ('listening to port 2233');
});

require ('dotenv').config ();
const app = require ('./index');
const port = process.env.PORT || 2233;
const connect = require ('./configs/dbs');

app.listen (port, async (req, res) => {
  await connect ();
  console.log ('listening to port 2233');
});

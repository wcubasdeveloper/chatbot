require('dotenv').config();
//const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

//app.use(bodyParser.json());
//app.use(express.static('./public/web'));

const port = 3000 || process.env.PORT;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/prueba/', (req, res) => {
  res.send("HOLA");
});

app.listen(port, () => console.log(`Running on port ${port}`));

/*
app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id: "a71af3e9-08cb-4c33-be9a-b524813ec9ac",
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) res.status(500).json(err);
	console.log('res->',response);
    res.json(response);
  });
});
*/


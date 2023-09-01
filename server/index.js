const express = require("express");
const app = express();
const port = process.env.PORT || 5002;
const connectDB = require('./db/connect/connect');
require('dotenv').config();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
app.use(cors());
app.use(jsonParser);
app.use(express.json());
const dataModel = require('./db/models/data');


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  
  const start = async () => {
    try {
      const uri = process.env.MONGO_URI;
      await connectDB(uri);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();

app.get('/', async (req,res) => {
    res.json('this is time-series api')
})

app.get('/alldatapoints', async (req, res) => {
try {
    const allData = await dataModel.find({});
    console.log(allData)
    res.json(allData);
} catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
}
});

app.get('/datapoint/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const data = await dataModel.aggregate([
            { $project: { 
                timestamp: `$dataPoint${id}.formattedTimestamp`,
                value: `$dataPoint${id}.value`
            }}
          ]);
          const modifiedData = data.map(({ _id, ...rest }) => rest);
          res.json(modifiedData);
    } catch (error) {
        res.status(500).json({error: 'Error  aggregating data'});
    }   
})

app.post('/adddatapoint', async (req,res) => {

    try {
        const newData = req.body; 
        // const validationError = dataModel.validate(newData);

        // if (validationError) {
        // return res.status(400).json({ error: 'Validation Error: '+validationError.message });
        // }
        const insertedData = await dataModel.create(newData);
        res.status(201).json(insertedData);
    } catch (error) {
        res.status(400).json({ error: 'Error inserting data' });
    }
})

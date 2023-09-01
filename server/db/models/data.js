const mongoose = require('mongoose');

const dataPointSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  formattedTimestamp: {
    type: String, // Store the formatted date as a string
  },
  value: {
    type: Number,
    required: true,
  },
});

dataPointSchema.pre('save', function (next) {
  this.formattedTimestamp = this.timestamp.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  next();
});

const timeSeriesSchema = new mongoose.Schema({
  dataPoint1: dataPointSchema,
  dataPoint2: dataPointSchema,
  dataPoint3: dataPointSchema,
  dataPoint4: dataPointSchema,
  dataPoint5: dataPointSchema,
  dataPoint6: dataPointSchema,
  dataPoint7: dataPointSchema,
  dataPoint8: dataPointSchema,
  dataPoint9: dataPointSchema,
  dataPoint10: dataPointSchema
}, {
  collection: 'timeSeriesData'
});

const TimeSeriesData = mongoose.model('TimeSeriesData', timeSeriesSchema);

module.exports = TimeSeriesData;

db.createCollection('weatherMeasurements');
db.weatherMeasurements.insert([
  {
    "location": {
      "type": "Point",
      "coordinates": [-73.935242, 40.730610]
    },
    "temperature": 22,
    "humidity": 45,
    "timestamp": 1682574867000,
  }
]);
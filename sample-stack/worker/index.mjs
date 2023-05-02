import { MongoClient } from "mongodb";

const { MONGO_URI, MONGO_DB_NAME } = process.env

console.log("Starting worker process", MONGO_URI, MONGO_DB_NAME)

const client = await MongoClient.connect(MONGO_URI)

const writeDataPoint = async (client, data) => {
    try {
        const db = client.db(MONGO_DB_NAME)
        await db.collection('weatherMeasurements').insertOne(data);
        console.log("Wrote measurements data to collection")

    } catch (err) {
        console.error("Unable to write measurements to collection", err)
    }
}

await writeDataPoint(client, {
    "location": {
      "type": "Point",
      "coordinates": [-73.935242, 40.730610]
    },
    "temperature": 19,
    "humidity": 37,
    "timestamp": 1682574867000,
})

console.log("Exiting")
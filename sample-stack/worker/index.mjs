import { MongoClient } from "mongodb";

const readConfig = (env) => {
    const { MONGO_URI, MONGO_DB_NAME, MEASUREMENT_INTERVAL_SECONDS } = process.env

    if (!MONGO_URI || !MONGO_DB_NAME) {
        throw new Error("Missing database configuration credentials, set 'MONGO_URI' and 'MONGO_DB_NAME")
    }

    return {
        mongo: {
            uri: MONGO_URI,
            db: MONGO_DB_NAME
        },
        measurementIntervalSeconds: MEASUREMENT_INTERVAL_SECONDS || 5
    }
}

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const getRandomMeasurement = () => {
    return {
        "location": {
          "type": "Point",
          "coordinates": [-73.935242, 40.730610]
        },
        "temperature": getRandomNumber(10,20),
        "humidity": getRandomNumber(0, 100),
        "timestamp": new Date().getTime(),
    }
}

const delay = async (seconds) => new Promise(resolve => setTimeout(resolve, seconds*1000))

const insertDocument = async (db, measurement) => {
    try {
        await db.collection('weatherMeasurements').insertOne(measurement);
        console.log("Added measurement to collection", measurement)
    } catch (err) {
        console.error("Unable to write measurements to collection", err)
    }
}

const config = readConfig(process.env)
const mongoClient = await MongoClient.connect(config.mongo.uri)
const mongoDatabase = mongoClient.db(config.mongo.db)

process.once('SIGTERM', async () => {
    console.log("closing database connection")
    await mongoClient.close()
})

console.log(`Producing measurements using ${config.measurementIntervalSeconds} wait`, config.measurementIntervalSeconds)

// noinspection InfiniteLoopJS
while (true) {
    await insertDocument(mongoDatabase, getRandomMeasurement())
    await delay(config.measurementIntervalSeconds)
}


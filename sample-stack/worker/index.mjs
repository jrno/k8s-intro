import { MongoClient } from "mongodb";

const readConfig = (env) => {
    const { MONGO_URI, MONGO_DB_NAME, MONGO_DB_COLLECTION, MEASUREMENT_INTERVAL_SECONDS } = env

    if (!MONGO_URI || !MONGO_DB_NAME) {
        throw new Error("Missing database configuration credentials, set 'MONGO_URI' and 'MONGO_DB_NAME")
    }

    return {
        mongo: {
            uri: MONGO_URI,
            db: MONGO_DB_NAME,
            collection: MONGO_DB_COLLECTION || 'weatherMeasurements'
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

const addMeasurement = async (db, measurement) => {
    try {
        await db.collection('weatherMeasurements').insertOne(measurement);
        console.log("Wrote measurement to database", measurement)
    } catch (error) {
        console.error("Unable to write measurements to collection...", error)
    }
}

const config = readConfig(process.env)
const client = await MongoClient.connect(config.mongo.uri)
const db = client.db(config.mongo.db)

process.once('SIGTERM', async () => {
    console.log("Closing database connection...")
    await client.close()
})

console.log(`Producer running using ${config.measurementIntervalSeconds} wait`, config.measurementIntervalSeconds)

// noinspection InfiniteLoopJS
while (true) {
    await addMeasurement(db, getRandomMeasurement())
    await delay(config.measurementIntervalSeconds)
}


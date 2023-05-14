import * as http from 'node:http'
import { MongoClient } from "mongodb";

const readConfig = (env) => {
    const { MONGO_URI, MONGO_DB_NAME, MONGO_DB_COLLECTION, MAX_MEASUREMENTS, PORT } = env

    if (!MONGO_URI || !MONGO_DB_NAME) {
        throw new Error("Missing database configuration credentials, set 'MONGO_URI' and 'MONGO_DB_NAME")
    }

    return {
        mongo: {
            uri: MONGO_URI,
            db: MONGO_DB_NAME,
            collection: MONGO_DB_COLLECTION || 'weatherMeasurements'
        },
        port: PORT ? parseInt(PORT) : 3000,
        maxMeasurements: MAX_MEASUREMENTS ? parseInt(MAX_MEASUREMENTS) : 50
    }
}

const getMeasurements = async (db, collectionName, limit) => {
    try {
        return await db.collection(collectionName)
            .find({})
            .sort({timestamp: -1})
            .limit(limit)
            .toArray()
    } catch (error) {
        console.error("Unable to read measurements data", error)
        return []
    }
}

const config = readConfig(process.env)
const client = await MongoClient.connect(config.mongo.uri)
const db = client.db(config.mongo.db)

console.log("MongoDB connection initialized...")

const server = http.createServer(async (req, res) => {
    console.log("Received request", req.method, req.url)

    if (req.url !== '/') {
        res.statusCode = 404
        res.end()
        return
    }

    const data = await getMeasurements(db, config.mongo.collection, config.maxMeasurements)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
})

process.once('SIGTERM', async () => {
    console.log("Closing database connection...")
    await client.close()
})

server.listen(config.port, () => {
    console.log(`Service running at http://localhost:${config.port}/`)
})

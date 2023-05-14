import * as http from 'node:http'
import {MongoClient} from "mongodb";

const PORT = 3000

const readConfig = (env) => {
    const { MONGO_URI, MONGO_DB_NAME } = process.env

    if (!MONGO_URI || !MONGO_DB_NAME) {
        throw new Error("Missing database configuration credentials, set 'MONGO_URI' and 'MONGO_DB_NAME")
    }

    return {
        mongo: {
            uri: MONGO_URI,
            db: MONGO_DB_NAME
        }
    }
}

const readMeasurements = async (db) => {
    try {
        return await db.collection('weatherMeasurements')
            .find({})
            .sort({ timestamp: -1})
            .limit(50)
            .toArray()
    } catch (error) {
        console.error("Unable to read measurements data", error)
        return []
    }
}

const config = readConfig(process.env)
const mongoClient = await MongoClient.connect(config.mongo.uri)
const mongoDatabase = mongoClient.db(config.mongo.db)

const server = http.createServer(async (req, res) => {
    console.log("Received request", req.method, req.url)

    const measurements = await readMeasurements(mongoDatabase)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(measurements))
})

server.listen(PORT, () => {
    console.log(`Service running at http://localhost:${PORT}/`)
})

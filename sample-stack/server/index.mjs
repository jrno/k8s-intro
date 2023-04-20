import * as http from 'node:http'

const HOSTNAME = '127.0.0.1'
const PORT = 3000

const server = http.createServer((req, res) => {
    console.log("Received request", req.method, req.url)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello from Node.js service')
})

server.listen(PORT, HOSTNAME, () => {
    console.log(`Service running at https://${HOSTNAME}:${PORT}/`)
})
